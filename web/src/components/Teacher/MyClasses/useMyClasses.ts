'use client';

import { useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassStatus, CreateClassInput, MyClassRow } from '@/types/myClasses';
import { usePagedList } from '../shared';
import { buildClassFromInput, buildMyClassesMetrics } from './utils';

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
  const { filterOptions } = myClassesPageMock;
  const [classes, setClasses] = useState(myClassesPageMock.classes);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const metrics = useMemo(() => buildMyClassesMetrics(classes), [classes]);

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

  const createClass = (input: CreateClassInput) => {
    const next = buildClassFromInput(input, classes);
    // Close the modal first, then open detail on the next frame so React
    // finishes unmounting the modal before mounting the detail view.
    setIsCreateOpen(false);
    setClasses((prev) => [next, ...prev]);
    queueMicrotask(() => {
      setSelectedClassId(next.id);
    });
  };

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedClasses: list.paginatedItems,
    selectedClass,
    openClass: (id: number) => setSelectedClassId(id),
    backToClasses: () => setSelectedClassId(null),
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    createClass,
  };
}
