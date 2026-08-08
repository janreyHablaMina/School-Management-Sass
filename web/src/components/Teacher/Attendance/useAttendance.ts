'use client';

import { useEffect, useMemo, useState } from 'react';
import { teacherAttendancePageMock } from '@/lib/mock/teacherAttendance.mock';
import { attendanceSchoolConfigMock } from '@/lib/mock/attendanceSession.mock';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import { getCurrentPosition } from '@/lib/geo/attendanceGeo';
import {
  clearAttendanceSessionStorage,
  readAttendanceCheckIns,
  readAttendanceSession,
  writeAttendanceSession,
} from '@/lib/attendance/sessionStorage';
import type { AttendanceSessionRecord } from '@/types/attendanceSession';
import type {
  AttendanceStatus,
  AttendanceStudentRow,
  AttendanceViewMode,
} from '@/types/teacherAttendance';
import {
  clampDay,
  formatAttendanceDate,
  formatMonthYear,
  shiftMonth,
} from './utils';

const PAGE_SIZE = 8;

function nowTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function useAttendance() {
  const {
    metrics,
    classes,
    viewModes,
    calendarYear: initialYear,
    calendarMonth: initialMonth,
    calendarDays,
  } = teacherAttendancePageMock;

  const schoolConfig = attendanceSchoolConfigMock;

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<AttendanceViewMode>(viewModes[0]);
  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState(20);
  const [students, setStudents] = useState<AttendanceStudentRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const [showStartModal, setShowStartModal] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [locationHint, setLocationHint] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<AttendanceSessionRecord | null>(null);
  const [usedFallbackLocation, setUsedFallbackLocation] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId]
  );

  const calendarMonthLabel = formatMonthYear(viewYear, viewMonth);
  const selectedDateLabel = formatAttendanceDate(selectedYear, selectedMonth, selectedDay);

  const visibleCalendarDays = useMemo(() => {
    if (viewYear === initialYear && viewMonth === initialMonth) return calendarDays;
    return [];
  }, [viewYear, viewMonth, initialYear, initialMonth, calendarDays]);

  const totalStudents = students.length;
  const totalPages = Math.max(1, Math.ceil(totalStudents / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return students.slice(start, start + PAGE_SIZE);
  }, [students, currentPage]);

  const rangeStart = totalStudents === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, totalStudents);

  const allVisibleSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((student) => selectedIds.includes(student.id));

  const applyLocationCheckIns = (session: AttendanceSessionRecord) => {
    const checkIns = readAttendanceCheckIns().filter((item) => item.sessionId === session.id);
    if (checkIns.length === 0 && session.checkedInStudentIds.length === 0) return;

    const byId = new Map(checkIns.map((item) => [item.studentId, item]));
    const idSet = new Set(session.checkedInStudentIds);

    setStudents((prev) =>
      prev.map((student) => {
        if (!idSet.has(student.id) && !byId.has(student.id)) return student;
        const checkIn = byId.get(student.id);
        return {
          ...student,
          status: 'Present',
          time: checkIn
            ? new Date(checkIn.checkedInAt).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              })
            : student.time ?? nowTimeLabel(),
          notes: checkIn
            ? `📍 Verified · ${Math.round(checkIn.distanceMeters)}m from center`
            : student.notes ?? '📍 Location verified',
        };
      })
    );
  };

  useEffect(() => {
    const syncSession = () => {
      const stored = readAttendanceSession();
      if (!stored || stored.status !== 'active') {
        if (activeSession && (!stored || stored.status === 'ended')) {
          setRemainingSeconds(0);
        }
        return;
      }
      if (selectedClassId && stored.classId !== selectedClassId) return;

      setActiveSession(stored);
      const ends = new Date(stored.endsAt).getTime();
      setRemainingSeconds(Math.max(0, Math.floor((ends - Date.now()) / 1000)));
      applyLocationCheckIns(stored);
    };

    syncSession();
    window.addEventListener('storage', syncSession);
    window.addEventListener('teachify-attendance-session', syncSession);
    window.addEventListener('teachify-attendance-checkins', syncSession);
    const poll = window.setInterval(syncSession, 2000);
    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('teachify-attendance-session', syncSession);
      window.removeEventListener('teachify-attendance-checkins', syncSession);
      window.clearInterval(poll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassId, activeSession?.id]);

  useEffect(() => {
    if (!activeSession || activeSession.status !== 'active') return;
    const tick = window.setInterval(() => {
      const ends = new Date(activeSession.endsAt).getTime();
      const left = Math.max(0, Math.floor((ends - Date.now()) / 1000));
      setRemainingSeconds(left);
      if (left === 0) {
        writeAttendanceSession({ ...activeSession, status: 'ended' });
        setActiveSession({ ...activeSession, status: 'ended' });
      }
    }, 1000);
    return () => window.clearInterval(tick);
  }, [activeSession]);

  const openClass = (id: string) => {
    const match = classes.find((item) => item.id === id);
    if (!match) return;
    setSelectedClassId(id);
    setStudents(match.students.map((student) => ({ ...student })));
    setSelectedIds([]);
    setPage(1);

    const stored = readAttendanceSession();
    if (stored && stored.classId === id && stored.status === 'active') {
      setActiveSession(stored);
      const ends = new Date(stored.endsAt).getTime();
      setRemainingSeconds(Math.max(0, Math.floor((ends - Date.now()) / 1000)));
      applyLocationCheckIns(stored);
    } else {
      setActiveSession(null);
      setRemainingSeconds(0);
    }
  };

  const backToClasses = () => {
    setSelectedClassId(null);
    setStudents([]);
    setSelectedIds([]);
    setPage(1);
    setShowStartModal(false);
  };

  const goToPrevMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const goToNextMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const selectDay = (day: number) => {
    const safeDay = clampDay(viewYear, viewMonth, day);
    setSelectedYear(viewYear);
    setSelectedMonth(viewMonth);
    setSelectedDay(safeDay);
  };

  const toggleStudent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedStudents.some((student) => student.id === id))
      );
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      paginatedStudents.forEach((student) => next.add(student.id));
      return Array.from(next);
    });
  };

  const markStudents = (ids: string[] | 'all', status: AttendanceStatus) => {
    const idSet = ids === 'all' ? null : new Set(ids);
    setStudents((prev) =>
      prev.map((student) => {
        if (idSet && !idSet.has(student.id)) return student;
        return {
          ...student,
          status,
          time: status === 'Absent' ? null : student.time ?? nowTimeLabel(),
          notes:
            status === 'Absent'
              ? student.notes?.startsWith('📍')
                ? null
                : student.notes
              : student.notes,
        };
      })
    );
  };

  const markAll = (status: AttendanceStatus) => markStudents('all', status);

  const markSelected = (status: AttendanceStatus) => {
    if (selectedIds.length === 0) return;
    markStudents(selectedIds, status);
    setSelectedIds([]);
  };

  const clearSelection = () => setSelectedIds([]);

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
    if (usedFallback) {
      setLocationHint(
        `${error ?? 'GPS unavailable'}. Using demo classroom location so you can still try the flow.`
      );
    } else {
      setLocationHint('Location captured. Opening live session…');
    }

    const startedAt = new Date();
    const endsAt = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);
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
      endsAt: endsAt.toISOString(),
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
    metrics,
    classes,
    viewModes,
    schoolConfig,
    selectedDateLabel,
    calendarMonthLabel,
    calendarYear: viewYear,
    calendarMonth: viewMonth,
    calendarDays: visibleCalendarDays,
    selectedClass,
    openClass,
    backToClasses,
    goToPrevMonth,
    goToNextMonth,
    viewMode,
    setViewMode,
    selectedDay,
    selectedYear,
    selectedMonth,
    selectDay,
    paginatedStudents,
    totalStudents,
    selectedIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    markAll,
    markSelected,
    clearSelection,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
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
  };
}
