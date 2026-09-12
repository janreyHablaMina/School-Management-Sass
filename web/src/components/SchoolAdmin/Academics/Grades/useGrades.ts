import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type GradeRecord = (typeof schoolAdminMockData.grades)[number];
export type GradeSortKey =
  | 'gradeSection'
  | 'subject'
  | 'teacher'
  | 'term'
  | 'classAverage'
  | 'passingRate'
  | 'gradedStudents'
  | 'needsAttention'
  | 'incomplete'
  | 'status'
  | 'riskLevel';

interface GradeFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
}

const INITIAL_FILTERS: GradeFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  riskFilter: 'All Risk Levels',
};

function valueForSort(grade: GradeRecord, key: GradeSortKey) {
  return grade[key];
}

function filterGrade(grade: GradeRecord, filters: GradeFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    grade.gradeSection.toLowerCase().includes(normalizedSearch) ||
    grade.subject.toLowerCase().includes(normalizedSearch) ||
    grade.teacher.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || grade.status === filters.statusFilter;
  const matchesRisk =
    filters.riskFilter === 'All Risk Levels' || grade.riskLevel === filters.riskFilter;

  return matchesSearch && matchesStatus && matchesRisk;
}

export function useGrades() {
  const directory = useSchoolAdminDirectory<GradeRecord, GradeSortKey, GradeFilters>({
    items: schoolAdminMockData.grades,
    initialFilters: INITIAL_FILTERS,
    getId: (grade) => grade.id,
    filterItem: filterGrade,
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
    selectedGrades: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectGrade: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    grades: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
