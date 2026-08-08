'use client';

import { useMemo, useState } from 'react';
import { teacherAssignmentsPageMock } from '@/lib/mock/teacherAssignments.mock';
import type {
  AssignmentSort,
  AssignmentStatus,
  AssignmentTab,
  AssignmentType,
  TeacherAssignmentRow,
} from '@/types/teacherAssignments';

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
export type AssignmentsFilterKey = keyof AssignmentsFiltersState;

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
  const q = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    !q ||
    assignment.title.toLowerCase().includes(q) ||
    assignment.description.toLowerCase().includes(q) ||
    assignment.subject.toLowerCase().includes(q);

  return (
    matchesSearch &&
    matchesTab(assignment, filters.tab) &&
    (filters.classFilter === 'All Classes' || assignment.classLabel === filters.classFilter) &&
    (filters.subject === 'All Subjects' || assignment.subject === filters.subject) &&
    (filters.status === 'All Status' || assignment.status === filters.status) &&
    (filters.type === 'All Types' || assignment.type === filters.type)
  );
}

function sortAssignments(
  assignments: TeacherAssignmentRow[],
  sort: AssignmentSort
) {
  const sorted = [...assignments];

  if (sort === 'Oldest First') {
    sorted.sort((a, b) => a.createdSortKey.localeCompare(b.createdSortKey));
    return sorted;
  }

  if (sort === 'Due Date') {
    sorted.sort((a, b) => a.dueSortKey.localeCompare(b.dueSortKey));
    return sorted;
  }

  if (sort === 'Title A-Z') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }

  sorted.sort((a, b) => b.createdSortKey.localeCompare(a.createdSortKey));
  return sorted;
}

export function useAssignments() {
  const { metrics, assignments, filterOptions, tabs } = teacherAssignmentsPageMock;
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const sortedFiltered = useMemo(() => {
    const filtered = assignments.filter((item) => matchesAssignment(item, filters));
    return sortAssignments(filtered, filters.sort);
  }, [assignments, filters]);

  const filteredCount = sortedFiltered.length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedFiltered.slice(start, start + PAGE_SIZE);
  }, [sortedFiltered, currentPage]);

  const setFilter = <K extends AssignmentsFilterKey>(
    key: K,
    value: AssignmentsFiltersState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const rangeStart = filteredCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredCount);

  return {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedAssignments,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
