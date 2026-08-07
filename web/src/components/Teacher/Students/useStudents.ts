'use client';

import { useMemo, useState } from 'react';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import type { StudentStatus } from '@/types/teacherStudents';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  classFilter: 'All Classes',
  gradeLevel: 'All Grades',
  status: 'All Status' as 'All Status' | StudentStatus,
};

export type StudentsFiltersState = typeof DEFAULT_FILTERS;
export type StudentsFilterKey = keyof StudentsFiltersState;

export function useStudents() {
  const { metrics, students, filterOptions } = teacherStudentsPageMock;
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const filteredStudents = useMemo(() => {
    const q = filters.searchTerm.trim().toLowerCase();

    return students.filter((student) => {
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
    });
  }, [students, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const filteredCount = filteredStudents.length;

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, currentPage]);

  const setFilter = <K extends StudentsFilterKey>(key: K, value: StudentsFiltersState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const rangeStart = filteredCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredCount);

  return {
    metrics,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    filteredCount,
    paginatedStudents,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
