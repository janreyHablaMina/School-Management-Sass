'use client';

import { useMemo, useState } from 'react';
import { teacherGradesPageMock } from '@/lib/mock/teacherGrades.mock';
import {
  findClassIdByFocus,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  GradeSort,
  GradeStatus,
  GradeTab,
  TeacherGradeRow,
} from '@/types/teacherGrades';
import { matchesAllOrExact, matchesSearch, usePagedList } from '../shared';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Grades' as GradeTab,
  status: 'All Status' as 'All Status' | GradeStatus,
  type: 'All Terms',
  sort: 'Highest First' as GradeSort,
};

export type GradesFiltersState = typeof DEFAULT_FILTERS;

function matchesTab(row: TeacherGradeRow, tab: GradeTab) {
  switch (tab) {
    case 'Needs Attention':
      return row.status === 'Needs Attention' || row.overallScore < 75;
    case 'Top Performers':
      return row.letterGrade === 'A' || row.letterGrade === 'A-';
    case 'Incomplete':
      return row.status === 'Incomplete';
    default:
      return true;
  }
}

function matchesGrade(row: TeacherGradeRow, filters: GradesFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [row.fullName, row.studentCode, row.subject]) &&
    matchesTab(row, filters.tab) &&
    matchesAllOrExact(filters.status, row.status, 'All Status') &&
    matchesAllOrExact(filters.type, row.term, 'All Terms')
  );
}

function sortGrades(items: TeacherGradeRow[], filters: GradesFiltersState) {
  const next = [...items];
  switch (filters.sort) {
    case 'Lowest First':
      return next.sort((a, b) => a.overallScore - b.overallScore);
    case 'Name A-Z':
      return next.sort((a, b) => a.fullName.localeCompare(b.fullName));
    default:
      return next.sort((a, b) => b.overallScore - a.overallScore);
  }
}

export function useGrades(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, classes, filterOptions, tabs } = teacherGradesPageMock;
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() =>
    findClassIdByFocus(classes, options?.classFocus),
  );

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId]
  );

  const classGrades = selectedClass?.grades ?? [];

  const list = usePagedList({
    items: classGrades,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesGrade,
    sortFn: sortGrades,
  });

  const openClass = (id: string) => {
    setSelectedClassId(id);
    list.clearFilters();
  };

  const backToClasses = () => {
    setSelectedClassId(null);
    list.clearFilters();
  };

  return {
    metrics,
    classes,
    tabs,
    filterOptions,
    selectedClass,
    openClass,
    backToClasses,
    ...list,
    paginatedGrades: list.paginatedItems,
  };
}
