import { useState, useEffect } from 'react';
import { TEACHERS_LIST, Teacher } from '@/lib/mock/teachers.mock';
import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';

export type SortKey = 'name' | 'employeeId' | 'department' | 'subjects' | 'classes' | 'status' | 'lastActiveDate';

interface TeacherFilters extends Record<string, string> {
  searchTerm: string;
  departmentFilter: string;
  statusFilter: string;
}

const INITIAL_FILTERS: TeacherFilters = {
  searchTerm: '',
  departmentFilter: 'All Departments',
  statusFilter: 'All Status',
};

function valueForSort(teacher: Teacher, key: SortKey) {
  if (key === 'subjects') return Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects;
  return teacher[key];
}

function filterTeacher(teacher: Teacher, filters: TeacherFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    teacher.name.toLowerCase().includes(normalizedSearch) ||
    teacher.employeeId.toLowerCase().includes(normalizedSearch) ||
    teacher.email.toLowerCase().includes(normalizedSearch);

  const matchesDepartment =
    filters.departmentFilter === 'All Departments' || teacher.department === filters.departmentFilter;

  const matchesStatus =
    filters.statusFilter === 'All Status' || teacher.status === filters.statusFilter;

  return matchesSearch && matchesDepartment && matchesStatus;
}

export const useTeachers = () => {
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const directory = useSchoolAdminDirectory<Teacher, SortKey, TeacherFilters>({
    items: TEACHERS_LIST,
    initialFilters: INITIAL_FILTERS,
    getId: (teacher) => teacher.id,
    filterItem: filterTeacher,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    departmentFilter: directory.filters.departmentFilter,
    setDepartmentFilter: (value: string) => directory.setFilter('departmentFilter', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedTeachers: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectTeacher: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortedTeachers: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
    toast,
    dismissToast: () => setToast(null),
    showToast: (t: { title: string; message?: string }) => setToast(t),
  };
};
