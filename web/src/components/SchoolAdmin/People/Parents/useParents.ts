import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type ParentRecord = (typeof schoolAdminMockData.parents)[number];
export type ParentSortKey =
  | 'name'
  | 'relationship'
  | 'studentName'
  | 'grade'
  | 'status'
  | 'lastLogin';

interface ParentFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  relationshipFilter: string;
}

const INITIAL_FILTERS: ParentFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  relationshipFilter: 'All Relationships',
};

function valueForSort(parent: ParentRecord, key: ParentSortKey) {
  if (key === 'grade') return parent.gradeSection;
  return parent[key];
}

function filterParent(parent: ParentRecord, filters: ParentFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    parent.name.toLowerCase().includes(normalizedSearch) ||
    parent.email.toLowerCase().includes(normalizedSearch) ||
    parent.contact.toLowerCase().includes(normalizedSearch) ||
    parent.studentName.toLowerCase().includes(normalizedSearch) ||
    parent.studentId.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || parent.status === filters.statusFilter;

  const matchesRelationship =
    filters.relationshipFilter === 'All Relationships' ||
    parent.relationship === filters.relationshipFilter;

  return matchesSearch && matchesStatus && matchesRelationship;
}

export function useParents() {
  const directory = useSchoolAdminDirectory<ParentRecord, ParentSortKey, ParentFilters>({
    items: schoolAdminMockData.parents,
    initialFilters: INITIAL_FILTERS,
    getId: (parent) => parent.id,
    filterItem: filterParent,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    relationshipFilter: directory.filters.relationshipFilter,
    setRelationshipFilter: (value: string) =>
      directory.setFilter('relationshipFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedParents: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectParent: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    parents: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
