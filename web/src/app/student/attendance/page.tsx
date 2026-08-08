'use client';

import React from 'react';
import { useStudentAttendance, type DemoLocationMode } from './useStudentAttendance';
import styles from './studentAttendance.module.css';

const LOCATION_OPTIONS: Array<[DemoLocationMode, string]> = [
  ['inside', 'Inside radius'],
  ['outside', 'Outside radius'],
  ['device', 'Use my GPS'],
];

export default function StudentAttendancePage() {
  const {
    session,
    studentId,
    setStudentId,
    locationMode,
    setLocationMode,
    busy,
    message,
    messageTone,
    remainingLabel,
    classStudents,
    selectedStudent,
    alreadyCheckedIn,
    active,
    markPresent,
  } = useStudentAttendance();

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.brand}>Teachify · Student</p>
        <h1 className={styles.title}>Attendance check-in</h1>
        <p className={styles.subtitle}>
          Mark yourself present when your teacher starts a location session. Manual teacher marking
          still works for Absent / Late.
        </p>

        {!session || session.status !== 'active' ? (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>No active session</h2>
            <p className={styles.cardCopy}>
              Ask your teacher to tap <strong>Start Attendance</strong> in the teacher portal. Then
              open this page again (same browser works best for this frontend demo).
            </p>
          </section>
        ) : (
          <>
            <section className={styles.card}>
              <div className={styles.sessionTop}>
                <span className={`${styles.badge} ${active ? styles.badgeLive : styles.badgeEnded}`}>
                  {active ? 'Available now' : 'Expired'}
                </span>
                <span className={styles.timer}>{remainingLabel} left</span>
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
                  {LOCATION_OPTIONS.map(([value, label]) => (
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
