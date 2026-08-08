'use client';

import { teacherAssignmentsPageMock } from '@/lib/mock/teacherAssignments.mock';
import type {
  AssignmentSort,
  AssignmentStatus,
  AssignmentTab,
  AssignmentType,
  TeacherAssignmentRow,
} from '@/types/teacherAssignments';
import {
  matchesAllOrExact,
  matchesSearch,
  sortByCreatedOrTitle,
  usePagedList,
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

export function useAssignments() {
  const { metrics, assignments, filterOptions, tabs } = teacherAssignmentsPageMock;

  const list = usePagedList({
    items: assignments,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesAssignment,
    sortFn: (items, filters) => sortByCreatedOrTitle(items, filters.sort),
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedAssignments: list.paginatedItems,
  };
}
