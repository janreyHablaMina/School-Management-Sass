'use client';

import { useEffect, useMemo, useState } from 'react';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import {
  resolveClassFilterOption,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  StudentProfileFormInput,
  StudentStatus,
  TeacherStudentRow,
} from '@/types/teacherStudents';
import { matchesAllOrExact, matchesSearch, usePagedList } from '../shared';
import { applyStudentFormInput, buildStudentFromInput } from './studentForm';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  classFilter: 'All Classes',
  gradeLevel: 'All Grades',
  status: 'All Status' as 'All Status' | StudentStatus,
};

export type StudentsFiltersState = typeof DEFAULT_FILTERS;

export type StudentSortKey =
  | 'fullName'
  | 'idNumber'
  | 'classLabel'
  | 'phone'
  | 'attendanceRate'
  | 'averageGrade'
  | 'status';

type SortConfig = { key: StudentSortKey; direction: 'asc' | 'desc' };

function matchesStudent(student: TeacherStudentRow, filters: StudentsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [
      student.fullName,
      student.studentCode,
      student.idNumber,
    ]) &&
    matchesAllOrExact(filters.classFilter, student.classFilter, 'All Classes') &&
    matchesAllOrExact(filters.gradeLevel, student.gradeLevel, 'All Grades') &&
    matchesAllOrExact(filters.status, student.status, 'All Status')
  );
}

function sortStudents(items: TeacherStudentRow[], sortConfig: SortConfig | null) {
  if (!sortConfig) return items;
  const { key, direction } = sortConfig;
  const sorted = [...items];
  sorted.sort((a, b) => {
    const left = a[key];
    const right = b[key];
    let cmp = 0;
    if (typeof left === 'number' && typeof right === 'number') {
      cmp = left - right;
    } else {
      cmp = String(left).localeCompare(String(right), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }
    if (cmp === 0 && key === 'classLabel') {
      cmp = a.subject.localeCompare(b.subject);
    }
    return direction === 'asc' ? cmp : -cmp;
  });
  return sorted;
}

type Overlay =
  | { kind: 'none' }
  | { kind: 'create' }
  | { kind: 'edit'; id: string }
  | { kind: 'inactive'; id: string }
  | { kind: 'bulkInactive' };

export function useStudents(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, filterOptions } = teacherStudentsPageMock;
  const classFilter =
    resolveClassFilterOption(filterOptions.classes, options?.classFocus) ??
    DEFAULT_FILTERS.classFilter;

  const [students, setStudents] = useState(teacherStudentsPageMock.students);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>({ kind: 'none' });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );

  const list = usePagedList({
    items: students,
    initialFilters: { ...DEFAULT_FILTERS, classFilter },
    pageSize: PAGE_SIZE,
    filterFn: matchesStudent,
    sortFn: (items) => sortStudents(items, sortConfig),
    sortDeps: sortConfig,
  });

  const handleSort = (key: StudentSortKey) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
    list.setPage(1);
  };

  const paginatedStudents = list.paginatedItems;

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? null,
    [students, selectedStudentId],
  );

  const editingStudent = useMemo(
    () =>
      overlay.kind === 'edit'
        ? (students.find((student) => student.id === overlay.id) ?? null)
        : null,
    [students, overlay],
  );

  const inactiveTarget = useMemo(
    () =>
      overlay.kind === 'inactive'
        ? (students.find((student) => student.id === overlay.id) ?? null)
        : null,
    [students, overlay],
  );

  const selectedStudents = useMemo(
    () => students.filter((student) => selectedIds.includes(student.id)),
    [students, selectedIds],
  );

  const allVisibleSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((student) => selectedIds.includes(student.id));

  const selectedInactiveCount = selectedStudents.filter(
    (student) => student.status === 'Inactive',
  ).length;
  const selectedActiveCount = selectedStudents.length - selectedInactiveCount;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setSelectedIds([]);
    setOverlay((prev) => (prev.kind === 'bulkInactive' ? { kind: 'none' } : prev));
  }, [list.filters, list.page]);

  const clearSelection = () => {
    setSelectedIds([]);
    setOverlay((prev) => (prev.kind === 'bulkInactive' ? { kind: 'none' } : prev));
  };

  const toggleStudent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAllVisible = () => {
    const visibleIds = paginatedStudents.map((student) => student.id);
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const subjectOptions = useMemo(() => {
    const unique = Array.from(new Set(students.map((student) => student.subject)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [students]);

  const updateStudent = (input: StudentProfileFormInput) => {
    if (overlay.kind !== 'edit') return;
    const editingId = overlay.id;
    const source = students.find((student) => student.id === editingId);
    if (!source) return;

    const next = applyStudentFormInput(source, input);
    setStudents((prev) =>
      prev.map((student) => (student.id === editingId ? next : student)),
    );
    setOverlay({ kind: 'none' });
    setToast({
      title: 'Profile updated',
      message: `${next.fullName}'s details were saved.`,
    });
  };

  const createStudent = (input: StudentProfileFormInput) => {
    const next = buildStudentFromInput(input, students);
    setOverlay({ kind: 'none' });
    setStudents((prev) => [next, ...prev]);
    setToast({
      title: 'Student added',
      message: `${next.fullName} was added to ${next.classLabel}.`,
    });
  };

  const confirmMarkInactive = () => {
    if (overlay.kind !== 'inactive') return;
    const targetId = overlay.id;
    const source = students.find((student) => student.id === targetId);
    if (!source || source.status === 'Inactive') {
      setOverlay({ kind: 'none' });
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === targetId ? { ...student, status: 'Inactive' } : student,
      ),
    );
    setSelectedIds((prev) => prev.filter((id) => id !== targetId));
    setOverlay({ kind: 'none' });
    setToast({
      title: 'Student marked inactive',
      message: `${source.fullName} is now Inactive. Find them under the Inactive status filter.`,
    });
  };

  const confirmBulkMarkInactive = () => {
    const targets = selectedStudents.filter((student) => student.status !== 'Inactive');
    if (targets.length === 0) {
      setOverlay({ kind: 'none' });
      return;
    }

    const targetIds = new Set(targets.map((student) => student.id));
    setStudents((prev) =>
      prev.map((student) =>
        targetIds.has(student.id) ? { ...student, status: 'Inactive' } : student,
      ),
    );
    clearSelection();
    setToast({
      title: 'Students marked inactive',
      message: `${targets.length} student${targets.length === 1 ? '' : 's'} moved to Inactive.`,
    });
  };

  const restoreActive = (id: string) => {
    const source = students.find((student) => student.id === id);
    if (!source || source.status !== 'Inactive') return;

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: 'Active' } : student,
      ),
    );
    setToast({
      title: 'Student restored',
      message: `${source.fullName} is Active again.`,
    });
  };

  const restoreSelectedActive = () => {
    const targets = selectedStudents.filter((student) => student.status === 'Inactive');
    if (targets.length === 0) return;

    const targetIds = new Set(targets.map((student) => student.id));
    setStudents((prev) =>
      prev.map((student) =>
        targetIds.has(student.id) ? { ...student, status: 'Active' } : student,
      ),
    );
    clearSelection();
    setToast({
      title: 'Students restored',
      message: `${targets.length} student${targets.length === 1 ? '' : 's'} set back to Active.`,
    });
  };

  return {
    metrics,
    filterOptions,
    subjectOptions,
    ...list,
    paginatedStudents,
    selectedStudent,
    openStudent: (id: string) => setSelectedStudentId(id),
    backToStudents: () => setSelectedStudentId(null),
    isCreateOpen: overlay.kind === 'create',
    openCreate: () => setOverlay({ kind: 'create' }),
    closeCreate: () => setOverlay({ kind: 'none' }),
    createStudent,
    editingStudent,
    openEdit: (id: string) => setOverlay({ kind: 'edit', id }),
    closeEdit: () => setOverlay({ kind: 'none' }),
    updateStudent,
    inactiveTarget,
    openMarkInactive: (id: string) => setOverlay({ kind: 'inactive', id }),
    closeMarkInactive: () => setOverlay({ kind: 'none' }),
    confirmMarkInactive,
    restoreActive,
    selectedIds,
    selectedCount: selectedIds.length,
    selectedActiveCount,
    selectedInactiveCount,
    allVisibleSelected,
    toggleStudent,
    toggleAllVisible,
    clearSelection,
    bulkInactiveOpen: overlay.kind === 'bulkInactive',
    openBulkMarkInactive: () => {
      if (selectedActiveCount === 0) return;
      setOverlay({ kind: 'bulkInactive' });
    },
    closeBulkMarkInactive: () => setOverlay({ kind: 'none' }),
    confirmBulkMarkInactive,
    restoreSelectedActive,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    handleSort,
    toast,
    dismissToast: () => setToast(null),
  };
}
