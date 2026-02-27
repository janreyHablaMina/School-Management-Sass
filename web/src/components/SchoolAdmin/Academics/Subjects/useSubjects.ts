import { useMemo, useState, useEffect } from 'react';
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
  gradeFilter: string;
}

const INITIAL_FILTERS: SubjectFilters = {
  searchTerm: '',
  departmentFilter: 'All Departments',
  statusFilter: 'All Status',
  gradeFilter: 'All Grades',
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

  let matchesStatus = false;
  if (filters.statusFilter === 'All Status') {
    matchesStatus = subject.status !== 'Archived';
  } else {
    matchesStatus = subject.status === filters.statusFilter;
  }
    
  let matchesGrade = true;
  if (filters.gradeFilter !== 'All Grades') {
    const selectedGrade = filters.gradeFilter;
    const selectedNum = parseInt(selectedGrade.replace('Grade ', ''));
    
    if (subject.gradeLevels.includes('-')) {
      const parts = subject.gradeLevels.split('-');
      if (parts.length === 2) {
        const minNum = parseInt(parts[0].trim().replace('Grade ', ''));
        const maxNum = parseInt(parts[1].trim().replace('Grade ', ''));
        if (!isNaN(minNum) && !isNaN(maxNum) && !isNaN(selectedNum)) {
          matchesGrade = selectedNum >= minNum && selectedNum <= maxNum;
        }
      }
    } else {
      matchesGrade = subject.gradeLevels === selectedGrade;
    }
  }

  return matchesSearch && matchesDepartment && matchesStatus && matchesGrade;
}

export function useSubjects() {
  const departments = useMemo(
    () => [
      'All Departments',
      ...Array.from(new Set(schoolAdminMockData.subjects.map((subject) => subject.department))),
    ],
    [],
  );

  const grades = useMemo(
    () => [
      'All Grades',
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
    ],
    [],
  );

  const [subjects, setSubjects] = useState<SubjectRecord[]>(schoolAdminMockData.subjects);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const directory = useSchoolAdminDirectory<SubjectRecord, SubjectSortKey, SubjectFilters>({
    items: subjects,
    initialFilters: INITIAL_FILTERS,
    getId: (subject) => subject.id,
    filterItem: filterSubject,
    getSortValue: valueForSort,
  });

  const archiveSubjects = (ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setSubjects((current) =>
      current.map((subject) =>
        idSet.has(subject.id) ? { ...subject, status: 'Archived' as any } : subject
      )
    );
    directory.clearSelection();
    
    let message = '';
    if (ids.length === 1) {
      const subjectName = subjects.find((s) => s.id === ids[0])?.name || 'Subject';
      message = `${subjectName} moved to archive.`;
    } else {
      message = `${ids.length} subjects moved to archive.`;
    }

    setToast({
      title: 'Subjects archived',
      message,
    });
  };

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    departmentFilter: directory.filters.departmentFilter,
    setDepartmentFilter: (value: string) =>
      directory.setFilter('departmentFilter', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    gradeFilter: directory.filters.gradeFilter,
    setGradeFilter: (value: string) => directory.setFilter('gradeFilter', value),
    departments,
    grades,
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
    archiveSubject: (id: string) => archiveSubjects([id]),
    archiveSelectedSubjects: () => archiveSubjects(directory.selectedIds),
    toast,
    dismissToast: () => setToast(null),
  };
}
