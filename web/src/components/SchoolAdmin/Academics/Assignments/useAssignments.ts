import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type AssignmentRecord = (typeof schoolAdminMockData.assignments)[number];
export type AssignmentSortKey =
  | 'title'
  | 'classLabel'
  | 'subject'
  | 'teacher'
  | 'dueSortKey'
  | 'submittedCount'
  | 'averageScore'
  | 'status'
  | 'riskLevel';

interface AssignmentFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
}

const INITIAL_FILTERS: AssignmentFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  riskFilter: 'All Risk Levels',
};

function valueForSort(assignment: AssignmentRecord, key: AssignmentSortKey) {
  if (key === 'averageScore') return assignment.averageScore ?? -1;
  return assignment[key];
}

function filterAssignment(assignment: AssignmentRecord, filters: AssignmentFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    assignment.title.toLowerCase().includes(normalizedSearch) ||
    assignment.classLabel.toLowerCase().includes(normalizedSearch) ||
    assignment.subject.toLowerCase().includes(normalizedSearch) ||
    assignment.teacher.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || assignment.status === filters.statusFilter;
  const matchesRisk =
    filters.riskFilter === 'All Risk Levels' || assignment.riskLevel === filters.riskFilter;

  return matchesSearch && matchesStatus && matchesRisk;
}

export function useAssignments() {
  const directory = useSchoolAdminDirectory<
    AssignmentRecord,
    AssignmentSortKey,
    AssignmentFilters
  >({
    items: schoolAdminMockData.assignments,
    initialFilters: INITIAL_FILTERS,
    getId: (assignment) => assignment.id,
    filterItem: filterAssignment,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    riskFilter: directory.filters.riskFilter,
    setRiskFilter: (value: string) => directory.setFilter('riskFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedAssignments: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectAssignment: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    assignments: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
