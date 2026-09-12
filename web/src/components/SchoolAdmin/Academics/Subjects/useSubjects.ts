import { useMemo } from 'react';
import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type SubjectRecord = (typeof schoolAdminMockData.subjects)[number];
export type SubjectSortKey =
  | 'name'
  | 'code'
  | 'department'
  | 'assignedTeachers'
  | 'classSections'
  | 'units'
  | 'status';

interface SubjectFilters extends Record<string, string> {
  searchTerm: string;
  departmentFilter: string;
  statusFilter: string;
}

const INITIAL_FILTERS: SubjectFilters = {
  searchTerm: '',
  departmentFilter: 'All Departments',
  statusFilter: 'All Status',
};

function valueForSort(subject: SubjectRecord, key: SubjectSortKey) {
  return subject[key];
}

function filterSubject(subject: SubjectRecord, filters: SubjectFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    subject.name.toLowerCase().includes(normalizedSearch) ||
    subject.code.toLowerCase().includes(normalizedSearch) ||
    subject.department.toLowerCase().includes(normalizedSearch) ||
    subject.gradeLevels.toLowerCase().includes(normalizedSearch);

  const matchesDepartment =
    filters.departmentFilter === 'All Departments' ||
    subject.department === filters.departmentFilter;
  const matchesStatus =
    filters.statusFilter === 'All Status' || subject.status === filters.statusFilter;

  return matchesSearch && matchesDepartment && matchesStatus;
}

export function useSubjects() {
  const departments = useMemo(
    () => [
      'All Departments',
      ...Array.from(new Set(schoolAdminMockData.subjects.map((subject) => subject.department))),
    ],
    [],
  );

  const directory = useSchoolAdminDirectory<SubjectRecord, SubjectSortKey, SubjectFilters>({
    items: schoolAdminMockData.subjects,
    initialFilters: INITIAL_FILTERS,
    getId: (subject) => subject.id,
    filterItem: filterSubject,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    departmentFilter: directory.filters.departmentFilter,
    setDepartmentFilter: (value: string) =>
      directory.setFilter('departmentFilter', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    departments,
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedSubjects: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectSubject: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    subjects: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
