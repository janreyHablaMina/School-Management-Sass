'use client';

import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import type { StudentStatus, TeacherStudentRow } from '@/types/teacherStudents';
import { usePagedList } from '../shared';

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
  const q = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    !q ||
    student.fullName.toLowerCase().includes(q) ||
    student.studentCode.toLowerCase().includes(q) ||
    student.idNumber.toLowerCase().includes(q);

  return (
    matchesSearch &&
    (filters.classFilter === 'All Classes' || student.classFilter === filters.classFilter) &&
    (filters.gradeLevel === 'All Grades' || student.gradeLevel === filters.gradeLevel) &&
    (filters.status === 'All Status' || student.status === filters.status)
  );
}

export function useStudents() {
  const { metrics, students, filterOptions } = teacherStudentsPageMock;

  const list = usePagedList({
    items: students,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesStudent,
  });

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedStudents: list.paginatedItems,
  };
}
