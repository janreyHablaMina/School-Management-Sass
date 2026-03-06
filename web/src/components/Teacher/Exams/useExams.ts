'use client';

import { useState } from 'react';
import { teacherExamsPageMock } from '@/lib/mock/teacherExams.mock';
import {
  resolveListFiltersFromFocus,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  ExamSort,
  ExamStatus,
  ExamTab,
  ExamType,
  TeacherExamRow,
} from '@/types/teacherExams';
import {
  archiveRowById,
  archiveRowsByIds,
  bindColumnSort,
  deleteRowById,
  deleteRowsByIds,
  matchesAllOrExact,
  matchesSearch,
  sortByCreatedOrTitle,
  sortWithColumnOverride,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Exams' as ExamTab,
  classFilter: 'All Classes',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | ExamStatus,
  type: 'All Types' as 'All Types' | ExamType,
  sort: 'Newest First' as ExamSort,
};

export type ExamsFiltersState = typeof DEFAULT_FILTERS;

export type ExamSortKey =
  | 'title'
  | 'classLabel'
  | 'type'
  | 'dueSortKey'
  | 'duration'
  | 'completedCount'
  | 'status';

function matchesTab(exam: TeacherExamRow, tab: ExamTab) {
  switch (tab) {
    case 'Upcoming':
      return exam.status === 'Upcoming';
    case 'Ongoing':
      return exam.status === 'Ongoing';
    case 'Completed':
      return exam.status === 'Completed';
    case 'Draft':
      return exam.status === 'Draft';
    case 'Archived':
      return exam.status === 'Archived';
    default:
      return true;
  }
}

function matchesExam(exam: TeacherExamRow, filters: ExamsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [exam.title, exam.description, exam.subject]) &&
    matchesTab(exam, filters.tab) &&
    matchesAllOrExact(filters.classFilter, exam.classLabel, 'All Classes') &&
    matchesAllOrExact(filters.subject, exam.subject, 'All Subjects') &&
    matchesAllOrExact(filters.status, exam.status, 'All Status') &&
    matchesAllOrExact(filters.type, exam.type, 'All Types')
  );
}

function getExamSortValue(exam: TeacherExamRow, key: ExamSortKey): unknown {
  return exam[key];
}

export function useExams(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, exams: seed, filterOptions, tabs } = teacherExamsPageMock;
  const { classFilter, subject } = resolveListFiltersFromFocus(
    filterOptions,
    options?.classFocus,
    DEFAULT_FILTERS,
  );

  const [exams, setExams] = useState(seed);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<ExamSortKey>();

  const list = usePagedList({
    items: exams,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesExam,
    sortFn: (items, filters) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        getExamSortValue,
        (rows, f) => sortByCreatedOrTitle(rows, f.sort),
        filters,
        (a, b) => a.title.localeCompare(b.title),
      ),
    sortDeps: sortConfig,
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  const paginatedExams = list.paginatedItems;
  const visibleIds = paginatedExams.map((exam) => exam.id);
  const {
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    setSelectedIds,
  } = useRowSelection({
    visibleIds,
    resetKey: `${list.page}:${JSON.stringify(list.filters)}`,
  });

  const archiveSelected = () => {
    if (selectedIds.length === 0) return;
    setExams((prev) => archiveRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setExams((prev) => deleteRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setExams((prev) => archiveRowById(prev, id));
  };

  const deleteItem = (id: string) => {
    setExams((prev) => deleteRowById(prev, id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedExams,
    sortKey,
    sortDirection,
    handleSort,
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
  };
}
