'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { teacherAttendancePageMock } from '@/lib/mock/teacherAttendance.mock';
import { attendanceSchoolConfigMock } from '@/lib/mock/attendanceSession.mock';
import {
  distanceMeters,
  formatDistance,
  getCurrentPosition,
  isWithinRadius,
  offsetPoint,
} from '@/lib/geo/attendanceGeo';
import {
  appendAttendanceCheckIn,
  readAttendanceSession,
} from '@/lib/attendance/sessionStorage';
import type { AttendanceSessionRecord } from '@/types/attendanceSession';
import type { AttendanceStudentRow } from '@/types/teacherAttendance';
import styles from './studentAttendance.module.css';

type DemoLocationMode = 'device' | 'inside' | 'outside';

export default function StudentAttendancePage() {
  const [session, setSession] = useState<AttendanceSessionRecord | null>(null);
  const [studentId, setStudentId] = useState('');
  const [locationMode, setLocationMode] = useState<DemoLocationMode>('inside');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<'ok' | 'warn' | 'error'>('ok');
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const classStudents = useMemo(() => {
    if (!session) return [] as AttendanceStudentRow[];
    const match = teacherAttendancePageMock.classes.find((item) => item.id === session.classId);
    return match?.students ?? [];
  }, [session]);

  const selectedStudent = classStudents.find((item) => item.id === studentId) ?? null;
  const alreadyCheckedIn = Boolean(
    session && selectedStudent && session.checkedInStudentIds.includes(selectedStudent.id)
  );

  useEffect(() => {
    const sync = () => {
      const stored = readAttendanceSession();
      setSession(stored && stored.status === 'active' ? stored : stored);
      if (stored) {
        const left = Math.max(0, Math.floor((new Date(stored.endsAt).getTime() - Date.now()) / 1000));
        setRemainingSeconds(left);
        if (!studentId && stored.classId) {
          const cls = teacherAttendancePageMock.classes.find((item) => item.id === stored.classId);
          if (cls?.students[0]) setStudentId(cls.students[0].id);
        }
      } else {
        setRemainingSeconds(0);
      }
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('teachify-attendance-session', sync);
    window.addEventListener('teachify-attendance-checkins', sync);
    const poll = window.setInterval(sync, 1500);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('teachify-attendance-session', sync);
      window.removeEventListener('teachify-attendance-checkins', sync);
      window.clearInterval(poll);
    };
  }, [studentId]);

  useEffect(() => {
    if (!session || session.status !== 'active') return;
    const tick = window.setInterval(() => {
      const left = Math.max(0, Math.floor((new Date(session.endsAt).getTime() - Date.now()) / 1000));
      setRemainingSeconds(left);
    }, 1000);
    return () => window.clearInterval(tick);
  }, [session]);

  const active = Boolean(session && session.status === 'active' && remainingSeconds > 0);

  const markPresent = async () => {
    if (!session || !selectedStudent || !active) return;
    setBusy(true);
    setMessage(null);

    let studentPoint = attendanceSchoolConfigMock.fallbackTeacherLocation;
    if (locationMode === 'device') {
      const result = await getCurrentPosition(session.center);
      studentPoint = result.point;
      if (result.usedFallback) {
        setMessageTone('warn');
        setMessage(`${result.error ?? 'GPS unavailable'}. Using a simulated location for this demo.`);
      }
    } else if (locationMode === 'inside') {
      studentPoint = offsetPoint(session.center, 12, 8);
    } else {
      studentPoint = offsetPoint(session.center, 0, session.radiusMeters + 80);
    }

    const distance = distanceMeters(session.center, studentPoint);
    const within = isWithinRadius(session.center, studentPoint, session.radiusMeters);

    if (!within) {
      setMessageTone('error');
      setMessage(
        `You are outside the attendance area (${formatDistance(distance)} away). Please move closer to your classroom.`
      );
      setBusy(false);
      return;
    }

    appendAttendanceCheckIn({
      sessionId: session.id,
      studentId: selectedStudent.id,
      studentName: selectedStudent.fullName,
      studentCode: selectedStudent.studentCode,
      checkedInAt: new Date().toISOString(),
      studentLocation: studentPoint,
      distanceMeters: distance,
      withinRadius: true,
      status: 'Present',
      source: 'location',
    });

    setMessageTone('ok');
    setMessage(`You're marked Present · verified ${formatDistance(distance)} from teacher.`);
    setBusy(false);
  };

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.brand}>Teachify · Student</p>
        <h1 className={styles.title}>Attendance check-in</h1>
        <p className={styles.subtitle}>
          Mark yourself present when your teacher starts a location session. Manual teacher marking still
          works for Absent / Late.
        </p>

        {!session || session.status !== 'active' ? (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>No active session</h2>
            <p className={styles.cardCopy}>
              Ask your teacher to tap <strong>Start Attendance</strong> in the teacher portal. Then open
              this page again (same browser works best for this frontend demo).
            </p>
          </section>
        ) : (
          <>
            <section className={styles.card}>
              <div className={styles.sessionTop}>
                <span className={`${styles.badge} ${active ? styles.badgeLive : styles.badgeEnded}`}>
                  {active ? 'Available now' : 'Expired'}
                </span>
                <span className={styles.timer}>
                  {mins}:{secs.toString().padStart(2, '0')} left
                </span>
              </div>
              <h2 className={styles.cardTitle}>{session.subject}</h2>
              <p className={styles.cardCopy}>
                {session.gradeSection} · {session.room} · Radius {session.radiusMeters}m
              </p>
              <p className={styles.teacherLine}>Started by {session.teacherName}</p>
            </section>

            <section className={styles.card}>
              <label className={styles.field}>
                <span className={styles.label}>I am</span>
                <select
                  className={styles.select}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                >
                  {classStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.fullName} ({student.studentCode})
                    </option>
                  ))}
                </select>
              </label>

              <div className={styles.field}>
                <span className={styles.label}>Demo location</span>
                <div className={styles.chipRow}>
                  {(
                    [
                      ['inside', 'Inside radius'],
                      ['outside', 'Outside radius'],
                      ['device', 'Use my GPS'],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.chip} ${locationMode === value ? styles.chipActive : ''}`}
                      onClick={() => setLocationMode(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {alreadyCheckedIn ? (
                <p className={`${styles.feedback} ${styles.feedbackOk}`}>
                  You already checked in for this session.
                </p>
              ) : (
                <button
                  type="button"
                  className={styles.presentBtn}
                  disabled={!active || busy || !selectedStudent}
                  onClick={markPresent}
                >
                  {busy ? 'Checking location…' : "I'm Present"}
                </button>
              )}

              {message ? (
                <p
                  className={`${styles.feedback} ${
                    messageTone === 'ok'
                      ? styles.feedbackOk
                      : messageTone === 'warn'
                        ? styles.feedbackWarn
                        : styles.feedbackError
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
