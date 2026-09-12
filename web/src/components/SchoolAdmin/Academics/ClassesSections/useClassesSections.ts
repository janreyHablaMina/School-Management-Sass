import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type ClassSectionRecord = (typeof schoolAdminMockData.classesSections)[number];
export type ClassSectionSortKey =
  | 'name'
  | 'gradeLevel'
  | 'adviser'
  | 'studentCount'
  | 'attendanceRate'
  | 'subjects'
  | 'status';

interface ClassSectionFilters extends Record<string, string> {
  searchTerm: string;
  gradeFilter: string;
  statusFilter: string;
}

const INITIAL_FILTERS: ClassSectionFilters = {
  searchTerm: '',
  gradeFilter: 'All Grades',
  statusFilter: 'All Status',
};

function valueForSort(item: ClassSectionRecord, key: ClassSectionSortKey) {
  return item[key];
}

function filterClassSection(item: ClassSectionRecord, filters: ClassSectionFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    item.name.toLowerCase().includes(normalizedSearch) ||
    item.adviser.toLowerCase().includes(normalizedSearch) ||
    item.room.toLowerCase().includes(normalizedSearch) ||
    item.section.toLowerCase().includes(normalizedSearch);

  const matchesGrade =
    filters.gradeFilter === 'All Grades' || item.gradeLevel === filters.gradeFilter;
  const matchesStatus =
    filters.statusFilter === 'All Status' || item.status === filters.statusFilter;

  return matchesSearch && matchesGrade && matchesStatus;
}

export function useClassesSections() {
  const directory = useSchoolAdminDirectory<
    ClassSectionRecord,
    ClassSectionSortKey,
    ClassSectionFilters
  >({
    items: schoolAdminMockData.classesSections,
    initialFilters: INITIAL_FILTERS,
    getId: (item) => item.id,
    filterItem: filterClassSection,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    gradeFilter: directory.filters.gradeFilter,
    setGradeFilter: (value: string) => directory.setFilter('gradeFilter', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedClassSections: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectClassSection: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    classSections: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
