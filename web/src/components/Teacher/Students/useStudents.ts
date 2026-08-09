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
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );

  const list = usePagedList({
    items: students,
    initialFilters: { ...DEFAULT_FILTERS, classFilter },
    pageSize: PAGE_SIZE,
    filterFn: matchesStudent,
  });

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? null,
    [students, selectedStudentId],
  );

  const editingStudent = useMemo(
    () => students.find((student) => student.id === editingStudentId) ?? null,
    [students, editingStudentId],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

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

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedStudents: list.paginatedItems,
    selectedStudent,
    openStudent: (id: string) => setSelectedStudentId(id),
    backToStudents: () => setSelectedStudentId(null),
    editingStudent,
    openEdit: (id: string) => setEditingStudentId(id),
    closeEdit: () => setEditingStudentId(null),
    updateStudent,
    toast,
    dismissToast: () => setToast(null),
  };
}
