import { useState, useMemo } from 'react';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import type { StudentProfileFormInput } from '@/types/teacherStudents';
import type { Student } from './StudentProfile/shared/types';

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

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(schoolAdminMockData.students);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatusFilter>('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);
  const [inactiveTargetId, setInactiveTargetId] = useState<string | null>(null);
  const [isBulkInactiveOpen, setIsBulkInactiveOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const handleSort = (key: SortKey) => {
    setSortConfig(current => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const sortedStudents = useMemo(() => {
    let sortableItems = [...students];

    if (statusFilter === 'All Status') {
      sortableItems = sortableItems.filter((student) => student.status !== 'Archived');
    } else {
      sortableItems = sortableItems.filter((student) => student.status === statusFilter);
    }
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      sortableItems = sortableItems.filter(s => 
        s.name.toLowerCase().includes(lowerSearch) || 
        s.studentId.toLowerCase().includes(lowerSearch) || 
        s.email.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let valA: any = a[sortConfig.key as keyof typeof a];
        let valB: any = b[sortConfig.key as keyof typeof b];

        if (sortConfig.key === 'grade') {
          valA = a.gradeSection.split(' - ')[0] || a.gradeSection;
          valB = b.gradeSection.split(' - ')[0] || b.gradeSection;
        } else if (sortConfig.key === 'section') {
          valA = a.gradeSection.split(' - ')[1] || '';
          valB = b.gradeSection.split(' - ')[1] || '';
        } else if (sortConfig.key === 'attendanceRate') {
          valA = a.attendanceRate ?? 0;
          valB = b.attendanceRate ?? 0;
        } else if (sortConfig.key === 'averageGrade') {
          valA = a.averageGrade ?? 0;
          valB = b.averageGrade ?? 0;
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return sortableItems;
  }, [searchTerm, sortConfig, statusFilter, students]);

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
    setCurrentPage(1);
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(sortedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const archiveStudents = (ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setStudents((current) =>
      current.map((student) =>
        idSet.has(student.id) ? { ...student, status: 'Archived' } : student,
      ),
    );
    setSelectedStudents((current) => current.filter((id) => !idSet.has(id)));
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
    setSelectedStudents((current) => current.filter((id) => !idSet.has(id)));
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
    setSelectedStudents((current) => current.filter((id) => !idSet.has(id)));
    setToast({
      title: 'Students deactivated',
      message: `${ids.length} student${ids.length > 1 ? 's' : ''} marked as Inactive.`,
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    selectedStudents,
    handleSelectAll,
    handleSelectStudent,
    handleSort,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    getSortIcon,
    sortedStudents,
    totalCount: sortedStudents.length,
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
    archiveSelectedStudents: () => archiveStudents(selectedStudents),
    restoreStudent: (id: string) => restoreStudents([id]),
    restoreSelectedStudents: () => restoreStudents(selectedStudents),
    inactiveTarget: inactiveTargetId ? sortedStudents.find(s => s.id === inactiveTargetId) : null,
    openMarkInactive: (id: string) => setInactiveTargetId(id),
    closeMarkInactive: () => setInactiveTargetId(null),
    confirmMarkInactive: () => {
      if (inactiveTargetId) markInactive([inactiveTargetId]);
      setInactiveTargetId(null);
    },
    bulkInactiveOpen: isBulkInactiveOpen,
    openBulkMarkInactive: () => setIsBulkInactiveOpen(true),
    closeBulkMarkInactive: () => setIsBulkInactiveOpen(false),
    confirmBulkMarkInactive: () => {
      markInactive(selectedStudents);
      setIsBulkInactiveOpen(false);
    },
    restoreActive: (id: string) => restoreStudents([id]),
    selectedActiveCount: selectedStudents.filter(id => students.find(s => s.id === id)?.status !== 'Inactive').length,
    toast,
    dismissToast: () => setToast(null),
  };
};
