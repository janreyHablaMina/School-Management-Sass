'use client';

import { useEffect, useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassFormInput, ClassStatus, MyClassRow } from '@/types/myClasses';
import { usePagedList } from '../shared';
import {
  applyClassFormInput,
  archiveClassRow,
  buildClassFromInput,
  buildMyClassesMetrics,
  duplicateClassFrom,
  restoreClassRow,
  snapshotBeforeArchive,
  type ArchivedClassSnapshot,
} from './utils';

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
  searchTerm: '',
  academicYear: '2026 - 2027',
  gradeLevel: 'All Grades',
  subject: 'All Subjects',
  status: 'Active' as 'All Status' | ClassStatus,
};

export type MyClassesFiltersState = typeof DEFAULT_FILTERS;
export type MyClassesFilterKey = keyof MyClassesFiltersState;

function matchesClass(cls: MyClassRow, filters: MyClassesFiltersState) {
  const q = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    !q ||
    cls.subject.toLowerCase().includes(q) ||
    cls.gradeSection.toLowerCase().includes(q) ||
    cls.room.toLowerCase().includes(q);

  return (
    matchesSearch &&
    (filters.academicYear === 'All Years' || cls.academicYear === filters.academicYear) &&
    (filters.gradeLevel === 'All Grades' || cls.gradeLevel === filters.gradeLevel) &&
    (filters.subject === 'All Subjects' || cls.subject === filters.subject) &&
    (filters.status === 'All Status' || cls.status === filters.status)
  );
}

export function useMyClasses() {
  const { filterOptions } = myClassesPageMock;
  const [classes, setClasses] = useState(myClassesPageMock.classes);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [scheduleClassId, setScheduleClassId] = useState<number | null>(null);
  const [archiveClassId, setArchiveClassId] = useState<number | null>(null);
  const [archivedSnapshots, setArchivedSnapshots] = useState<
    Record<number, ArchivedClassSnapshot>
  >({});
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  const metrics = useMemo(() => buildMyClassesMetrics(classes), [classes]);

  const list = usePagedList({
    items: classes,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesClass,
  });

  const selectedClass = useMemo(
    () => classes.find((cls) => cls.id === selectedClassId) ?? null,
    [classes, selectedClassId],
  );

  const editingClass = useMemo(
    () => classes.find((cls) => cls.id === editingClassId) ?? null,
    [classes, editingClassId],
  );

  const scheduleClass = useMemo(
    () => classes.find((cls) => cls.id === scheduleClassId) ?? null,
    [classes, scheduleClassId],
  );

  const archiveTarget = useMemo(
    () => classes.find((cls) => cls.id === archiveClassId) ?? null,
    [classes, archiveClassId],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const createClass = (input: ClassFormInput) => {
    const next = buildClassFromInput(input, classes);
    setIsCreateOpen(false);
    setClasses((prev) => [next, ...prev]);
    queueMicrotask(() => {
      setSelectedClassId(next.id);
    });
  };

  const updateClass = (input: ClassFormInput) => {
    if (editingClassId == null) return;
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === editingClassId ? applyClassFormInput(cls, input) : cls,
      ),
    );
    setEditingClassId(null);
    setToast({
      title: 'Class updated',
      message: 'Your changes were saved for this session.',
    });
  };

  const duplicateClass = (id: number) => {
    const source = classes.find((cls) => cls.id === id);
    if (!source) return;
    const next = duplicateClassFrom(source, classes);
    setClasses((prev) => [next, ...prev]);
    list.setPage(1);
    setToast({
      title: 'Class duplicated successfully',
      message: `${next.subject} · ${next.gradeSection}`,
    });
  };

  const confirmArchive = () => {
    if (archiveClassId == null) return;
    const source = classes.find((cls) => cls.id === archiveClassId);
    if (!source || source.status === 'Archived') {
      setArchiveClassId(null);
      return;
    }

    setArchivedSnapshots((prev) => ({
      ...prev,
      [source.id]: snapshotBeforeArchive(source),
    }));
    setClasses((prev) =>
      prev.map((cls) => (cls.id === source.id ? archiveClassRow(cls) : cls)),
    );
    setArchiveClassId(null);
    setEditingClassId((id) => (id === source.id ? null : id));
    setScheduleClassId((id) => (id === source.id ? null : id));
    if (selectedClassId === source.id) setSelectedClassId(null);
    setToast({
      title: 'Class archived',
      message: `${source.subject} · ${source.gradeSection}. Find it under Archived.`,
    });
  };

  const restoreClass = (id: number) => {
    const source = classes.find((cls) => cls.id === id);
    if (!source || source.status !== 'Archived') return;
    const snapshot = archivedSnapshots[id];
    setClasses((prev) =>
      prev.map((cls) => (cls.id === id ? restoreClassRow(cls, snapshot) : cls)),
    );
    setArchivedSnapshots((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setToast({
      title: 'Class restored',
      message: `${source.subject} · ${source.gradeSection} is Active again.`,
    });
  };

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedClasses: list.paginatedItems,
    selectedClass,
    openClass: (id: number) => setSelectedClassId(id),
    backToClasses: () => setSelectedClassId(null),
    isCreateOpen,
    openCreate: () => {
      setEditingClassId(null);
      setScheduleClassId(null);
      setArchiveClassId(null);
      setIsCreateOpen(true);
    },
    closeCreate: () => setIsCreateOpen(false),
    createClass,
    editingClass,
    openEdit: (id: number) => {
      setIsCreateOpen(false);
      setScheduleClassId(null);
      setArchiveClassId(null);
      setEditingClassId(id);
    },
    closeEdit: () => setEditingClassId(null),
    updateClass,
    duplicateClass,
    scheduleClass,
    openSchedule: (id: number) => {
      setIsCreateOpen(false);
      setEditingClassId(null);
      setArchiveClassId(null);
      setScheduleClassId(id);
    },
    closeSchedule: () => setScheduleClassId(null),
    archiveTarget,
    openArchive: (id: number) => {
      setIsCreateOpen(false);
      setEditingClassId(null);
      setScheduleClassId(null);
      setArchiveClassId(id);
    },
    closeArchive: () => setArchiveClassId(null),
    confirmArchive,
    restoreClass,
    toast,
    dismissToast: () => setToast(null),
  };
}
