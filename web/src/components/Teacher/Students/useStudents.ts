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
import { applyStudentFormInput } from './utils';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  classFilter: 'All Classes',
  gradeLevel: 'All Grades',
  status: 'All Status' as 'All Status' | StudentStatus,
};

export type StudentsFiltersState = typeof DEFAULT_FILTERS;
export type StudentsFilterKey = keyof StudentsFiltersState;

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

export function useStudents(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, filterOptions } = teacherStudentsPageMock;
  const classFilter =
    resolveClassFilterOption(filterOptions.classes, options?.classFocus) ??
    DEFAULT_FILTERS.classFilter;

  const [students, setStudents] = useState(teacherStudentsPageMock.students);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [inactiveTargetId, setInactiveTargetId] = useState<string | null>(null);
  const [bulkInactiveOpen, setBulkInactiveOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );

  const list = usePagedList({
    items: students,
    initialFilters: { ...DEFAULT_FILTERS, classFilter },
    pageSize: PAGE_SIZE,
    filterFn: matchesStudent,
  });

  const paginatedStudents = list.paginatedItems;

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? null,
    [students, selectedStudentId],
  );

  const editingStudent = useMemo(
    () => students.find((student) => student.id === editingStudentId) ?? null,
    [students, editingStudentId],
  );

  const inactiveTarget = useMemo(
    () => students.find((student) => student.id === inactiveTargetId) ?? null,
    [students, inactiveTargetId],
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
    setBulkInactiveOpen(false);
  }, [list.filters, list.page]);

  const clearSelection = () => {
    setSelectedIds([]);
    setBulkInactiveOpen(false);
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

  const updateStudent = (input: StudentProfileFormInput) => {
    if (!editingStudentId) return;
    const source = students.find((student) => student.id === editingStudentId);
    if (!source) return;

    const next = applyStudentFormInput(source, input);
    setStudents((prev) =>
      prev.map((student) => (student.id === editingStudentId ? next : student)),
    );
    setEditingStudentId(null);
    setToast({
      title: 'Profile updated',
      message: `${next.fullName}'s details were saved.`,
    });
  };

  const confirmMarkInactive = () => {
    if (!inactiveTargetId) return;
    const source = students.find((student) => student.id === inactiveTargetId);
    if (!source || source.status === 'Inactive') {
      setInactiveTargetId(null);
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === inactiveTargetId ? { ...student, status: 'Inactive' } : student,
      ),
    );
    setSelectedIds((prev) => prev.filter((id) => id !== inactiveTargetId));
    setInactiveTargetId(null);
    setToast({
      title: 'Student marked inactive',
      message: `${source.fullName} is now Inactive. Find them under the Inactive status filter.`,
    });
  };

  const confirmBulkMarkInactive = () => {
    const targets = selectedStudents.filter((student) => student.status !== 'Inactive');
    if (targets.length === 0) {
      setBulkInactiveOpen(false);
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
    ...list,
    paginatedStudents,
    selectedStudent,
    openStudent: (id: string) => setSelectedStudentId(id),
    backToStudents: () => setSelectedStudentId(null),
    editingStudent,
    openEdit: (id: string) => {
      setInactiveTargetId(null);
      setBulkInactiveOpen(false);
      setEditingStudentId(id);
    },
    closeEdit: () => setEditingStudentId(null),
    updateStudent,
    inactiveTarget,
    openMarkInactive: (id: string) => {
      setEditingStudentId(null);
      setBulkInactiveOpen(false);
      setInactiveTargetId(id);
    },
    closeMarkInactive: () => setInactiveTargetId(null),
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
    bulkInactiveOpen,
    openBulkMarkInactive: () => {
      if (selectedActiveCount === 0) return;
      setEditingStudentId(null);
      setInactiveTargetId(null);
      setBulkInactiveOpen(true);
    },
    closeBulkMarkInactive: () => setBulkInactiveOpen(false),
    confirmBulkMarkInactive,
    restoreSelectedActive,
    toast,
    dismissToast: () => setToast(null),
  };
}
