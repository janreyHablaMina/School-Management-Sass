'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { attendanceSchoolConfigMock } from '@/lib/mock/attendanceSession.mock';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import { getCurrentPosition } from '@/lib/geo/attendanceGeo';
import {
  clearAttendanceSessionStorage,
  isSessionLive,
  readAttendanceCheckIns,
  readAttendanceSession,
  remainingSecondsUntil,
  subscribeAttendanceUpdates,
  writeAttendanceSession,
} from '@/lib/attendance';
import type { AttendanceSessionRecord } from '@/types/attendanceSession';
import type { AttendanceClassSection, AttendanceStudentRow } from '@/types/teacherAttendance';
import { formatTimeLabel } from './utils';

interface UseAttendanceSessionOptions {
  selectedClass: AttendanceClassSection | null;
  setStudents: Dispatch<SetStateAction<AttendanceStudentRow[]>>;
}

function mergeStudentsWithCheckIns(
  students: AttendanceStudentRow[],
  session: AttendanceSessionRecord
): AttendanceStudentRow[] {
  const checkIns = readAttendanceCheckIns().filter((item) => item.sessionId === session.id);
  if (checkIns.length === 0 && session.checkedInStudentIds.length === 0) return students;

  const byId = new Map(checkIns.map((item) => [item.studentId, item]));
  const idSet = new Set(session.checkedInStudentIds);

  return students.map((student) => {
    if (!idSet.has(student.id) && !byId.has(student.id)) return student;
    const checkIn = byId.get(student.id);
    return {
      ...student,
      status: 'Present' as const,
      time: checkIn ? formatTimeLabel(checkIn.checkedInAt) : student.time ?? formatTimeLabel(),
      notes: checkIn
        ? `📍 Verified · ${Math.round(checkIn.distanceMeters)}m from center`
        : student.notes ?? '📍 Location verified',
    };
  });
}

function applyLocationCheckIns(
  session: AttendanceSessionRecord,
  setStudents: Dispatch<SetStateAction<AttendanceStudentRow[]>>
) {
  setStudents((prev) => mergeStudentsWithCheckIns(prev, session));
}

export function useAttendanceSession({
  selectedClass,
  setStudents,
}: UseAttendanceSessionOptions) {
  const schoolConfig = attendanceSchoolConfigMock;
  const [showStartModal, setShowStartModal] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [locationHint, setLocationHint] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<AttendanceSessionRecord | null>(null);
  const [usedFallbackLocation, setUsedFallbackLocation] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const selectedClassId = selectedClass?.id ?? null;

  useEffect(() => {
    const syncSession = () => {
      const stored = readAttendanceSession();
      if (!stored || stored.status !== 'active') {
        setRemainingSeconds(0);
        return;
      }
      if (selectedClassId && stored.classId !== selectedClassId) return;

      setActiveSession(stored);
      setRemainingSeconds(remainingSecondsUntil(stored.endsAt));
      applyLocationCheckIns(stored, setStudents);
    };

    syncSession();
    return subscribeAttendanceUpdates(syncSession);
  }, [selectedClassId, setStudents]);

  useEffect(() => {
    if (!activeSession || activeSession.status !== 'active') return;

    const tick = window.setInterval(() => {
      const left = remainingSecondsUntil(activeSession.endsAt);
      setRemainingSeconds(left);
      if (left === 0) {
        const ended = { ...activeSession, status: 'ended' as const };
        writeAttendanceSession(ended);
        setActiveSession(ended);
      }
    }, 1000);

    return () => window.clearInterval(tick);
  }, [activeSession]);

  const loadSessionForClass = (classId: string, roster: AttendanceStudentRow[]) => {
    const stored = readAttendanceSession();
    if (stored && stored.classId === classId && stored.status === 'active') {
      setActiveSession(stored);
      setRemainingSeconds(remainingSecondsUntil(stored.endsAt));
      setStudents(mergeStudentsWithCheckIns(roster, stored));
      return;
    }
    setActiveSession(null);
    setRemainingSeconds(0);
    setStudents(roster);
  };

  const clearSessionUi = () => {
    setShowStartModal(false);
    setLocationHint(null);
  };

  const openStartModal = () => {
    setLocationHint(null);
    setShowStartModal(true);
  };

  const startAttendanceSession = async (radiusMeters: number, durationMinutes: number) => {
    if (!selectedClass) return;
    setIsStartingSession(true);
    setLocationHint('Requesting your current location…');

    const { point, usedFallback, error } = await getCurrentPosition(
      schoolConfig.fallbackTeacherLocation
    );

    setUsedFallbackLocation(usedFallback);
    setLocationHint(
      usedFallback
        ? `${error ?? 'GPS unavailable'}. Using demo classroom location so you can still try the flow.`
        : 'Location captured. Opening live session…'
    );

    const startedAt = new Date();
    const session: AttendanceSessionRecord = {
      id: `att-${selectedClass.id}-${startedAt.getTime()}`,
      classId: selectedClass.id,
      classLabel: `${selectedClass.gradeSection} (${selectedClass.subject})`,
      subject: selectedClass.subject,
      gradeSection: selectedClass.gradeSection,
      room: selectedClass.room,
      teacherName: teacherPortalMock.teacher.fullName,
      center: point,
      radiusMeters,
      durationMinutes,
      startedAt: startedAt.toISOString(),
      endsAt: new Date(startedAt.getTime() + durationMinutes * 60 * 1000).toISOString(),
      status: 'active',
      checkedInStudentIds: [],
    };

    writeAttendanceSession(session);
    setActiveSession(session);
    setRemainingSeconds(durationMinutes * 60);
    setIsStartingSession(false);
    setShowStartModal(false);
    setLocationHint(null);
  };

  const endAttendanceSession = () => {
    if (activeSession) {
      writeAttendanceSession({ ...activeSession, status: 'ended' });
    } else {
      clearAttendanceSessionStorage();
    }
    setActiveSession(null);
    setRemainingSeconds(0);
  };

  return {
    schoolConfig,
    showStartModal,
    openStartModal,
    closeStartModal: () => setShowStartModal(false),
    isStartingSession,
    locationHint,
    startAttendanceSession,
    activeSession,
    remainingSeconds,
    usedFallbackLocation,
    endAttendanceSession,
    sessionActive: isSessionLive(activeSession, remainingSeconds),
    loadSessionForClass,
    clearSessionUi,
  };
}
