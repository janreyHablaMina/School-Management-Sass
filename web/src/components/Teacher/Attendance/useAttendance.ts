'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { teacherAttendancePageMock } from '@/lib/mock/teacherAttendance.mock';
import {
  findClassIdByFocus,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  AttendanceStatus,
  AttendanceStudentRow,
  AttendanceViewMode,
} from '@/types/teacherAttendance';
import {
  clampDay,
  formatAttendanceDate,
  formatMonthYear,
  formatTimeLabel,
  shiftMonth,
} from './utils';
import { useAttendanceSession } from './useAttendanceSession';

const PAGE_SIZE = 8;

export function useAttendance(options?: { classFocus?: TeacherClassFocus | null }) {
  const {
    metrics,
    classes,
    viewModes,
    calendarYear: initialYear,
    calendarMonth: initialMonth,
    calendarDays,
  } = teacherAttendancePageMock;

  const focusedClassId = findClassIdByFocus(classes, options?.classFocus);
  const focusedClass = focusedClassId
    ? (classes.find((item) => item.id === focusedClassId) ?? null)
    : null;

  const [selectedClassId, setSelectedClassId] = useState<string | null>(focusedClassId);
  const [viewMode, setViewMode] = useState<AttendanceViewMode>(viewModes[0]);
  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState(20);
  const [students, setStudents] = useState<AttendanceStudentRow[]>(() =>
    focusedClass ? focusedClass.students.map((student) => ({ ...student })) : [],
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const didHydrateFocus = useRef(false);

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId]
  );

  const session = useAttendanceSession({ selectedClass, setStudents });

  const calendarMonthLabel = formatMonthYear(viewYear, viewMonth);
  const selectedDateLabel = formatAttendanceDate(selectedYear, selectedMonth, selectedDay);

  const visibleCalendarDays =
    viewYear === initialYear && viewMonth === initialMonth ? calendarDays : [];

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

  const openClass = (id: string) => {
    const match = classes.find((item) => item.id === id);
    if (!match) return;
    setSelectedClassId(id);
    setSelectedIds([]);
    setPage(1);
    session.loadSessionForClass(
      id,
      match.students.map((student) => ({ ...student }))
    );
  };

  useLayoutEffect(() => {
    if (!focusedClassId || !focusedClass || didHydrateFocus.current) return;
    didHydrateFocus.current = true;
    session.loadSessionForClass(
      focusedClassId,
      focusedClass.students.map((student) => ({ ...student })),
    );
    // Sync live-session state once after landing from My Classes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedClassId]);

  const backToClasses = () => {
    setSelectedClassId(null);
    setStudents([]);
    setSelectedIds([]);
    setPage(1);
    session.clearSessionUi();
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
    setSelectedYear(viewYear);
    setSelectedMonth(viewMonth);
    setSelectedDay(clampDay(viewYear, viewMonth, day));
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
          time: status === 'Absent' ? null : student.time ?? formatTimeLabel(),
          notes:
            status === 'Absent' && student.notes?.startsWith('📍') ? null : student.notes,
        };
      })
    );
  };

  return {
    metrics,
    classes,
    viewModes,
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
    markAll: (status: AttendanceStatus) => markStudents('all', status),
    markSelected: (status: AttendanceStatus) => {
      if (selectedIds.length === 0) return;
      markStudents(selectedIds, status);
      setSelectedIds([]);
    },
    clearSelection: () => setSelectedIds([]),
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    ...session,
  };
}
