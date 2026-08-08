'use client';

import { teacherAssignmentsPageMock } from '@/lib/mock/teacherAssignments.mock';
import type {
  AssignmentSort,
  AssignmentStatus,
  AssignmentTab,
  AssignmentType,
  TeacherAssignmentRow,
} from '@/types/teacherAssignments';
import { usePagedList } from '../shared';

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
  filters: AssignmentsFiltersState
) {
  const sorted = [...assignments];
  const { sort } = filters;

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

  const list = usePagedList({
    items: assignments,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesAssignment,
    sortFn: sortAssignments,
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedAssignments: list.paginatedItems,
  };
}
