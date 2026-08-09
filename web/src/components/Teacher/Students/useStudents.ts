'use client';

import { useMemo, useState } from 'react';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import {
  resolveClassFilterOption,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type { StudentStatus, TeacherStudentRow } from '@/types/teacherStudents';
import { matchesAllOrExact, matchesSearch, usePagedList } from '../shared';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  classFilter: 'All Classes',
  gradeLevel: 'All Grades',
  status: 'All Status' as 'All Status' | StudentStatus,
};

export type StudentsFiltersState = typeof DEFAULT_FILTERS;
export type StudentsFilterKey = keyof StudentsFiltersState;

function matchesStudent(student: TeacherStudentRow, filters: StudentsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [
      student.fullName,
      student.studentCode,
      student.idNumber,
    ]) &&
    matchesAllOrExact(filters.classFilter, student.classFilter, 'All Classes') &&
    matchesAllOrExact(filters.gradeLevel, student.gradeLevel, 'All Grades') &&
    matchesAllOrExact(filters.status, student.status, 'All Status')
  );
}

export function useStudents(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, students, filterOptions } = teacherStudentsPageMock;
  const classFilter =
    resolveClassFilterOption(filterOptions.classes, options?.classFocus) ??
    DEFAULT_FILTERS.classFilter;

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const list = usePagedList({
    items: students,
    initialFilters: { ...DEFAULT_FILTERS, classFilter },
    pageSize: PAGE_SIZE,
    filterFn: matchesStudent,
  });

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? null,
    [students, selectedStudentId],
  );

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedStudents: list.paginatedItems,
    selectedStudent,
    openStudent: (id: string) => setSelectedStudentId(id),
    backToStudents: () => setSelectedStudentId(null),
  };
}
