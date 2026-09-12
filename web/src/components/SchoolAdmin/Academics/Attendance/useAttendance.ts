import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type AttendanceRecord = (typeof schoolAdminMockData.attendance)[number];
export type AttendanceSortKey =
  | 'gradeSection'
  | 'adviser'
  | 'present'
  | 'absent'
  | 'late'
  | 'rate'
  | 'status'
  | 'riskLevel';

interface AttendanceFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
}

const INITIAL_FILTERS: AttendanceFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  riskFilter: 'All Risk Levels',
};

function valueForSort(record: AttendanceRecord, key: AttendanceSortKey) {
  return record[key];
}

function filterAttendance(record: AttendanceRecord, filters: AttendanceFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    record.gradeSection.toLowerCase().includes(normalizedSearch) ||
    record.adviser.toLowerCase().includes(normalizedSearch) ||
    record.room.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || record.status === filters.statusFilter;
  const matchesRisk =
    filters.riskFilter === 'All Risk Levels' || record.riskLevel === filters.riskFilter;

  return matchesSearch && matchesStatus && matchesRisk;
}

export function useAttendance() {
  const directory = useSchoolAdminDirectory<
    AttendanceRecord,
    AttendanceSortKey,
    AttendanceFilters
  >({
    items: schoolAdminMockData.attendance,
    initialFilters: INITIAL_FILTERS,
    getId: (record) => record.id,
    filterItem: filterAttendance,
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
    selectedAttendance: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectAttendance: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    attendance: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
