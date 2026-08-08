'use client';

import { useMemo, useState } from 'react';
import { teacherAttendancePageMock } from '@/lib/mock/teacherAttendance.mock';
import type {
  AttendanceStatus,
  AttendanceStudentRow,
  AttendanceViewMode,
} from '@/types/teacherAttendance';

const PAGE_SIZE = 8;

export function useAttendance() {
  const {
    metrics,
    classes,
    viewModes,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
  } = teacherAttendancePageMock;

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<AttendanceViewMode>(viewModes[0]);
  const [selectedDay, setSelectedDay] = useState(20);
  const [students, setStudents] = useState<AttendanceStudentRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId]
  );

  const activeDateLabel = `May ${selectedDay}, ${calendarYear}`;

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
    setStudents(match.students);
    setSelectedIds([]);
    setPage(1);
  };

  const backToClasses = () => {
    setSelectedClassId(null);
    setStudents([]);
    setSelectedIds([]);
    setPage(1);
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

  const markAll = (status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status,
        time: status === 'Absent' ? null : student.time ?? '8:00 AM',
      }))
    );
  };

  return {
    metrics,
    classes,
    viewModes,
    selectedDateLabel: activeDateLabel,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    selectedClass,
    openClass,
    backToClasses,
    viewMode,
    setViewMode,
    selectedDay,
    setSelectedDay,
    paginatedStudents,
    totalStudents,
    selectedIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    markAll,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
