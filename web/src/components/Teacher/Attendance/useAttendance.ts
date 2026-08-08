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
    classOptions,
    viewModes,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    daySummary,
    students: initialStudents,
  } = teacherAttendancePageMock;

  const [classId, setClassId] = useState(classOptions[0].id);
  const [viewMode, setViewMode] = useState<AttendanceViewMode>(viewModes[0]);
  const [selectedDay, setSelectedDay] = useState(20);
  const [students, setStudents] = useState<AttendanceStudentRow[]>(initialStudents);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

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

  const selectedClassLabel =
    classOptions.find((option) => option.id === classId)?.label ?? classOptions[0].label;

  const allVisibleSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((student) => selectedIds.includes(student.id));

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

  const markStudent = (id: string, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
              time: status === 'Absent' ? null : student.time ?? '8:00 AM',
            }
          : student
      )
    );
  };

  return {
    metrics,
    classOptions,
    viewModes,
    selectedDateLabel: activeDateLabel,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    daySummary,
    classId,
    setClassId,
    selectedClassLabel,
    viewMode,
    setViewMode,
    selectedDay,
    setSelectedDay,
    students,
    paginatedStudents,
    totalStudents,
    selectedIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    markAll,
    markStudent,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
