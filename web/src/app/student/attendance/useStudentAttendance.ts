'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  appendAttendanceCheckIn,
  formatCountdown,
  isSessionLive,
  readAttendanceSession,
  remainingSecondsUntil,
  subscribeAttendanceUpdates,
} from '@/lib/attendance';
import {
  distanceMeters,
  formatDistance,
  getCurrentPosition,
  isWithinRadius,
  offsetPoint,
} from '@/lib/geo/attendanceGeo';
import { teacherAttendancePageMock } from '@/lib/mock/teacherAttendance.mock';
import type { AttendanceSessionRecord } from '@/types/attendanceSession';

export type DemoLocationMode = 'device' | 'inside' | 'outside';
export type FeedbackTone = 'ok' | 'warn' | 'error';

export function useStudentAttendance() {
  const [session, setSession] = useState<AttendanceSessionRecord | null>(null);
  const [studentId, setStudentId] = useState('');
  const [locationMode, setLocationMode] = useState<DemoLocationMode>('inside');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<FeedbackTone>('ok');
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const classStudents = useMemo(() => {
    if (!session) return [];
    return (
      teacherAttendancePageMock.classes.find((item) => item.id === session.classId)?.students ?? []
    );
  }, [session]);

  const selectedStudent = classStudents.find((item) => item.id === studentId) ?? null;
  const alreadyCheckedIn = Boolean(
    session && selectedStudent && session.checkedInStudentIds.includes(selectedStudent.id)
  );
  const active = isSessionLive(session, remainingSeconds);

  useEffect(() => {
    const sync = () => {
      const stored = readAttendanceSession();
      setSession(stored);
      if (!stored) {
        setRemainingSeconds(0);
        return;
      }
      setRemainingSeconds(remainingSecondsUntil(stored.endsAt));
      if (!studentId) {
        const first = teacherAttendancePageMock.classes.find((item) => item.id === stored.classId)
          ?.students[0];
        if (first) setStudentId(first.id);
      }
    };

    sync();
    return subscribeAttendanceUpdates(sync, 1500);
  }, [studentId]);

  useEffect(() => {
    if (!session || session.status !== 'active') return;
    const tick = window.setInterval(() => {
      setRemainingSeconds(remainingSecondsUntil(session.endsAt));
    }, 1000);
    return () => window.clearInterval(tick);
  }, [session]);

  const markPresent = async () => {
    if (!session || !selectedStudent || !active) return;
    setBusy(true);
    setMessage(null);

    let studentPoint = session.center;
    if (locationMode === 'device') {
      const result = await getCurrentPosition(session.center);
      studentPoint = result.point;
      if (result.usedFallback) {
        setMessageTone('warn');
        setMessage(
          `${result.error ?? 'GPS unavailable'}. Using a simulated location for this demo.`
        );
      }
    } else if (locationMode === 'inside') {
      studentPoint = offsetPoint(session.center, 12, 8);
    } else {
      studentPoint = offsetPoint(session.center, 0, session.radiusMeters + 80);
    }

    const distance = distanceMeters(session.center, studentPoint);
    if (!isWithinRadius(session.center, studentPoint, session.radiusMeters)) {
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

  return {
    session,
    studentId,
    setStudentId,
    locationMode,
    setLocationMode,
    busy,
    message,
    messageTone,
    remainingLabel: formatCountdown(remainingSeconds),
    classStudents,
    selectedStudent,
    alreadyCheckedIn,
    active,
    markPresent,
  };
}
