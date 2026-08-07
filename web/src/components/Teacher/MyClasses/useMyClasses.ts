'use client';

import { useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassStatus } from '@/types/myClasses';

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
  searchTerm: '',
  academicYear: '2026 - 2027',
  gradeLevel: 'All Grades',
  subject: 'All Subjects',
  status: 'Active' as 'All Status' | ClassStatus,
};

export type MyClassesFiltersState = typeof DEFAULT_FILTERS;
export type MyClassesFilterKey = keyof MyClassesFiltersState;

export function useMyClasses() {
  const { metrics, classes, filterOptions } = myClassesPageMock;
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const filteredClasses = useMemo(() => {
    const q = filters.searchTerm.trim().toLowerCase();

    return classes.filter((cls) => {
      const matchesSearch =
        !q ||
        cls.subject.toLowerCase().includes(q) ||
        cls.gradeSection.toLowerCase().includes(q) ||
        cls.room.toLowerCase().includes(q);

      return (
        matchesSearch &&
        (filters.academicYear === 'All Years' || cls.academicYear === filters.academicYear) &&
        (filters.gradeLevel === 'All Grades' || cls.gradeLevel === filters.gradeLevel) &&
        (filters.subject === 'All Subjects' || cls.subject === filters.subject) &&
        (filters.status === 'All Status' || cls.status === filters.status)
      );
    });
  }, [classes, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredClasses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const filteredCount = filteredClasses.length;

  const paginatedClasses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredClasses.slice(start, start + PAGE_SIZE);
  }, [filteredClasses, currentPage]);

  const setFilter = <K extends MyClassesFilterKey>(key: K, value: MyClassesFiltersState[K]) => {
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
    paginatedClasses,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
