import { useState, useMemo, useEffect } from 'react';
import { useSchoolAdminDirectory } from '../../shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import type { StudentProfileFormInput } from '@/types/teacherStudents';
import type { Student } from './types';

export type SortKey = 'name' | 'studentId' | 'grade' | 'section' | 'parentGuardian' | 'status' | 'dateEnrolled' | 'attendanceRate' | 'averageGrade';
export type StudentStatusFilter = 'All Status' | 'Active' | 'Inactive' | 'At Risk' | 'Archived';

const AVATAR_COLORS = [
  '#84a9ff',
  '#ff7e93',
  '#5cc789',
  '#ffab6b',
  '#b68eff',
  '#6bcbff',
  '#f5c842',
];

function formatEnrollmentDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function nextStudentId(students: Student[]) {
  let max = 0;

  for (const student of students) {
    const match = student.studentId.match(/(\d+)$/);
    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  return `S2026-${String(max + 1).padStart(4, '0')}`;
}

function createStudentFromInput(input: StudentProfileFormInput, students: Student[]): Student {
  const primaryClass = input.enrolledClasses?.[0];
  const fullName = input.fullName.trim();
  const studentId = nextStudentId(students);
  const primaryGuardian = input.guardians[0];

  return {
    id: `student-${Date.now()}`,
    name: fullName,
    email: input.email.trim(),
    studentId,
    gradeSection: primaryClass?.classLabel || input.classLabel || 'Grade 7 - Section A',
    parentGuardian: primaryGuardian?.name.trim() || 'No guardian assigned',
    contact: primaryGuardian?.phone.trim() || input.phone.trim(),
    status: input.status,
    dateEnrolled: formatEnrollmentDate(),
    avatarColor: AVATAR_COLORS[students.length % AVATAR_COLORS.length],
    attendanceRate: 100,
    averageGrade: 0,
    letterGrade: 'N/A',
  };
}

function updateStudentFromInput(student: Student, input: StudentProfileFormInput): Student {
  const primaryClass = input.enrolledClasses?.[0];
  const primaryGuardian = input.guardians[0];

  return {
    ...student,
    name: input.fullName.trim(),
    email: input.email.trim(),
    gradeSection: primaryClass?.classLabel || input.classLabel || student.gradeSection,
    parentGuardian: primaryGuardian?.name.trim() || student.parentGuardian,
    contact: primaryGuardian?.phone.trim() || input.phone.trim() || student.contact,
    status: input.status,
  };
}

function isAtRiskStudent(student: Student) {
  return (
    student.status === 'At Risk' ||
    (student.attendanceRate ?? 100) < 90 ||
    (student.averageGrade ?? 100) < 75
  );
}

interface StudentFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
}

const INITIAL_FILTERS: StudentFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
};

function valueForSort(student: Student, key: SortKey) {
  if (key === 'grade') return student.gradeSection.split(' - ')[0] || student.gradeSection;
  if (key === 'section') return student.gradeSection.split(' - ')[1] || '';
  if (key === 'attendanceRate') return student.attendanceRate ?? 0;
  if (key === 'averageGrade') return student.averageGrade ?? 0;
  return student[key];
}

function filterStudent(student: Student, filters: StudentFilters) {
  if (filters.statusFilter === 'All Status') {
    if (student.status === 'Archived') return false;
  } else {
    if (student.status !== filters.statusFilter) return false;
  }
  
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  if (normalizedSearch) {
    if (
      !student.name.toLowerCase().includes(normalizedSearch) &&
      !student.studentId.toLowerCase().includes(normalizedSearch) &&
      !student.email.toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }
  }
  return true;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(schoolAdminMockData.students);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const directory = useSchoolAdminDirectory<Student, SortKey, StudentFilters>({
    items: students,
    initialFilters: INITIAL_FILTERS,
    getId: (student) => student.id,
    filterItem: filterStudent,
    getSortValue: valueForSort,
  });

  const classOptions = useMemo(
    () => Array.from(new Set(students.map((student) => student.gradeSection))).sort(),
    [students],
  );

  const gradeLevelOptions = useMemo(
    () =>
      Array.from(
        new Set(students.map((student) => student.gradeSection.split(' - ')[0] || student.gradeSection)),
      ).sort(),
    [students],
  );

  const createStudent = (input: StudentProfileFormInput) => {
    const next = createStudentFromInput(input, students);
    setStudents((current) => [next, ...current]);
    directory.setPage(1);
    setIsCreateOpen(false);
  };

  const updateStudent = (id: string, input: StudentProfileFormInput) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? updateStudentFromInput(student, input) : student,
      ),
    );
  };

  const atRiskCount = useMemo(
    () => students.filter((student) => student.status !== 'Archived' && isAtRiskStudent(student)).length,
    [students],
  );


  const archiveStudents = (ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setStudents((current) =>
      current.map((student) =>
        idSet.has(student.id) ? { ...student, status: 'Archived' } : student,
      ),
    );
    directory.clearSelection();
    setToast({
      title: 'Students archived',
      message: `${ids.length} student${ids.length > 1 ? 's' : ''} moved to archive.`,
    });
  };

  const restoreStudents = (ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setStudents((current) =>
      current.map((student) =>
        idSet.has(student.id) ? { ...student, status: 'Active' } : student,
      ),
    );
    directory.clearSelection();
    setToast({
      title: 'Students restored',
      message: `${ids.length} student${ids.length > 1 ? 's' : ''} marked as Active.`,
    });
  };

  const markInactive = (ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setStudents((current) =>
      current.map((student) =>
        idSet.has(student.id) ? { ...student, status: 'Inactive' } : student,
      ),
    );
    directory.clearSelection();
    setToast({
      title: 'Students deactivated',
      message: `${ids.length} student${ids.length > 1 ? 's' : ''} marked as Inactive.`,
    });
  };

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter as StudentStatusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedStudents: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectStudent: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    sortedStudents: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
    atRiskCount,
    classOptions,
    gradeLevelOptions,
    subjectOptions: ['Homeroom', 'Mathematics', 'English', 'Science', 'Filipino', 'Araling Panlipunan'],
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    createStudent,
    updateStudent,
    archiveStudent: (id: string) => archiveStudents([id]),
    archiveSelectedStudents: () => archiveStudents(directory.selectedIds),
    restoreStudent: (id: string) => restoreStudents([id]),
    restoreSelectedStudents: () => restoreStudents(directory.selectedIds),
    confirmMarkInactive: (ids: string[]) => markInactive(ids),
    restoreActive: (id: string) => restoreStudents([id]),
    selectedActiveCount: directory.selectedIds.filter(id => students.find(s => s.id === id)?.status !== 'Inactive').length,
    confirmArchive: (ids: string[]) => archiveStudents(ids),
    toast,
    dismissToast: () => setToast(null),
  };
};
