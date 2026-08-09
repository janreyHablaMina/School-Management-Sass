'use client';

import { useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassStatus, MyClassRow } from '@/types/myClasses';
import { usePagedList } from '../shared';

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

function matchesClass(cls: MyClassRow, filters: MyClassesFiltersState) {
  const q = filters.searchTerm.trim().toLowerCase();
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
}

export function useMyClasses() {
  const { metrics, classes, filterOptions } = myClassesPageMock;
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const list = usePagedList({
    items: classes,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesClass,
  });

  const selectedClass = useMemo(
    () => classes.find((cls) => cls.id === selectedClassId) ?? null,
    [classes, selectedClassId],
  );

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedClasses: list.paginatedItems,
    selectedClass,
    openClass: (id: number) => setSelectedClassId(id),
    backToClasses: () => setSelectedClassId(null),
  };
}
