'use client';

import { useState } from 'react';
import { teacherAssignmentsPageMock } from '@/lib/mock/teacherAssignments.mock';
import {
  resolveListFiltersFromFocus,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  AssignmentSort,
  AssignmentStatus,
  AssignmentTab,
  AssignmentType,
  TeacherAssignmentRow,
} from '@/types/teacherAssignments';
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

const PAGE_SIZE = 7;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Assignments' as AssignmentTab,
  classFilter: 'All Classes',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | AssignmentStatus,
  type: 'All Types' as 'All Types' | AssignmentType,
  sort: 'Newest First' as AssignmentSort,
};

export type AssignmentsFiltersState = typeof DEFAULT_FILTERS;

export type AssignmentSortKey =
  | 'title'
  | 'classLabel'
  | 'type'
  | 'dueSortKey'
  | 'submittedCount'
  | 'averageScore'
  | 'status';

function matchesTab(assignment: TeacherAssignmentRow, tab: AssignmentTab) {
  switch (tab) {
    case 'Upcoming':
      return assignment.status === 'Active' || assignment.status === 'Due Soon';
    case 'Pending':
      return assignment.submittedCount < assignment.totalStudents && assignment.status !== 'Draft';
    case 'Graded':
      return assignment.status === 'Completed';
    case 'Draft':
      return assignment.status === 'Draft';
    case 'Archived':
      return assignment.status === 'Archived';
    default:
      return true;
  }
}

function matchesAssignment(
  assignment: TeacherAssignmentRow,
  filters: AssignmentsFiltersState
) {
  return (
    matchesSearch(filters.searchTerm, [
      assignment.title,
      assignment.description,
      assignment.subject,
    ]) &&
    matchesTab(assignment, filters.tab) &&
    matchesAllOrExact(filters.classFilter, assignment.classLabel, 'All Classes') &&
    matchesAllOrExact(filters.subject, assignment.subject, 'All Subjects') &&
    matchesAllOrExact(filters.status, assignment.status, 'All Status') &&
    matchesAllOrExact(filters.type, assignment.type, 'All Types')
  );
}

function getAssignmentSortValue(
  assignment: TeacherAssignmentRow,
  key: AssignmentSortKey,
): unknown {
  if (key === 'averageScore') return assignment.averageScore ?? -1;
  return assignment[key];
}

export function useAssignments(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, assignments: seed, filterOptions, tabs } = teacherAssignmentsPageMock;
  const { classFilter, subject } = resolveListFiltersFromFocus(
    filterOptions,
    options?.classFocus,
    DEFAULT_FILTERS,
  );

  const [assignments, setAssignments] = useState(seed);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<AssignmentSortKey>();

  const list = usePagedList({
    items: assignments,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesAssignment,
    sortFn: (items, filters) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        getAssignmentSortValue,
        (rows, f) => sortByCreatedOrTitle(rows, f.sort),
        filters,
        (a, b) => a.title.localeCompare(b.title),
      ),
    sortDeps: sortConfig,
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  const paginatedAssignments = list.paginatedItems;
  const visibleIds = paginatedAssignments.map((assignment) => assignment.id);
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
    setAssignments((prev) => archiveRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setAssignments((prev) => deleteRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setAssignments((prev) => archiveRowById(prev, id));
  };

  const deleteItem = (id: string) => {
    setAssignments((prev) => deleteRowById(prev, id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedAssignments,
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
