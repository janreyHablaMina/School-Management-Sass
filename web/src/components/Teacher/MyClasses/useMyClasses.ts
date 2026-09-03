'use client';

import { useEffect, useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassFormInput, ClassStatus, MyClassRow } from '@/types/myClasses';
import {
  bindColumnSort,
  sortByConfig,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';
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

export type MyClassSortKey =
  | 'subject'
  | 'schedule'
  | 'studentCount'
  | 'attendanceRate'
  | 'courseProgress';

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

function classSortValue(cls: MyClassRow, key: MyClassSortKey): unknown {
  return cls[key];
}

export function useMyClasses() {
  const { filterOptions } = myClassesPageMock;
  const [classes, setClasses] = useState(myClassesPageMock.classes);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [scheduleClassId, setScheduleClassId] = useState<number | null>(null);
  const [inviteClassId, setInviteClassId] = useState<number | null>(null);
  const [archiveClassId, setArchiveClassId] = useState<number | null>(null);
  const [bulkArchiveOpen, setBulkArchiveOpen] = useState(false);
  const [highlightedClassId, setHighlightedClassId] = useState<number | null>(null);
  const [archivedSnapshots, setArchivedSnapshots] = useState<
    Record<number, ArchivedClassSnapshot>
  >({});
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  const {
    sortConfig,
    sortKey,
    sortDirection,
    handleSort: toggleSort,
  } = useColumnSort<MyClassSortKey>();

  const metrics = useMemo(() => buildMyClassesMetrics(classes), [classes]);

  const list = usePagedList({
    items: classes,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesClass,
    sortFn: (items) =>
      sortByConfig(items, sortConfig, classSortValue, (a, b) =>
        a.gradeSection.localeCompare(b.gradeSection),
      ),
    sortDeps: sortConfig,
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  const paginatedClasses = list.paginatedItems;
  const visibleIds = paginatedClasses.map((cls) => cls.id);

  const {
    selectedIds,
    allVisibleSelected,
    toggle: toggleClass,
    toggleAllVisible,
    clearSelection: clearRowSelection,
    setSelectedIds,
  } = useRowSelection<number>({
    visibleIds,
    resetKey: `${JSON.stringify(list.filters)}-${list.page}`,
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

  const inviteClass = useMemo(
    () => classes.find((cls) => cls.id === inviteClassId) ?? null,
    [classes, inviteClassId],
  );

  const archiveTarget = useMemo(
    () => classes.find((cls) => cls.id === archiveClassId) ?? null,
    [classes, archiveClassId],
  );

  const selectedClasses = useMemo(
    () => classes.filter((cls) => selectedIds.includes(cls.id)),
    [classes, selectedIds],
  );

  const selectedArchivedCount = selectedClasses.filter(
    (cls) => cls.status === 'Archived',
  ).length;
  const selectedActiveCount = selectedClasses.length - selectedArchivedCount;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setBulkArchiveOpen(false);
  }, [list.filters, list.page]);

  const clearSelection = () => {
    clearRowSelection();
    setBulkArchiveOpen(false);
  };

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
    setClasses((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx + 1, 0, next);
      return copy;
    });
    setHighlightedClassId(next.id);
    setTimeout(() => {
      setHighlightedClassId(null);
    }, 4000);
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
    setSelectedIds((prev) => prev.filter((id) => id !== source.id));
    setArchiveClassId(null);
    setEditingClassId((id) => (id === source.id ? null : id));
    setScheduleClassId((id) => (id === source.id ? null : id));
    if (selectedClassId === source.id) setSelectedClassId(null);
    setToast({
      title: 'Class archived',
      message: `${source.subject} · ${source.gradeSection}. Find it under Archived.`,
    });
  };

  const confirmBulkArchive = () => {
    const targets = selectedClasses.filter((cls) => cls.status !== 'Archived');
    if (targets.length === 0) {
      setBulkArchiveOpen(false);
      return;
    }

    const targetIds = new Set(targets.map((cls) => cls.id));
    setArchivedSnapshots((prev) => {
      const next = { ...prev };
      for (const source of targets) {
        next[source.id] = snapshotBeforeArchive(source);
      }
      return next;
    });
    setClasses((prev) =>
      prev.map((cls) => (targetIds.has(cls.id) ? archiveClassRow(cls) : cls)),
    );
    setEditingClassId((id) => (id != null && targetIds.has(id) ? null : id));
    setScheduleClassId((id) => (id != null && targetIds.has(id) ? null : id));
    if (selectedClassId != null && targetIds.has(selectedClassId)) {
      setSelectedClassId(null);
    }
    clearSelection();
    setToast({
      title: 'Classes archived',
      message: `${targets.length} class${targets.length === 1 ? '' : 'es'} moved to Archived.`,
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

  const restoreSelected = () => {
    const targets = selectedClasses.filter((cls) => cls.status === 'Archived');
    if (targets.length === 0) return;

    const targetIds = new Set(targets.map((cls) => cls.id));
    setClasses((prev) =>
      prev.map((cls) =>
        targetIds.has(cls.id)
          ? restoreClassRow(cls, archivedSnapshots[cls.id])
          : cls,
      ),
    );
    setArchivedSnapshots((prev) => {
      const next = { ...prev };
      for (const id of targetIds) delete next[id];
      return next;
    });
    clearSelection();
    setToast({
      title: 'Classes restored',
      message: `${targets.length} class${targets.length === 1 ? '' : 'es'} set back to Active.`,
    });
  };

  return {
    metrics,
    filterOptions,
    ...list,
    paginatedClasses,
    selectedClass,
    openClass: (id: number) => setSelectedClassId(id),
    backToClasses: () => setSelectedClassId(null),
    isCreateOpen,
    openCreate: () => {
      setEditingClassId(null);
      setScheduleClassId(null);
      setInviteClassId(null);
      setArchiveClassId(null);
      setBulkArchiveOpen(false);
      setIsCreateOpen(true);
    },
    closeCreate: () => setIsCreateOpen(false),
    createClass,
    editingClass,
    openEdit: (id: number) => {
      setIsCreateOpen(false);
      setScheduleClassId(null);
      setInviteClassId(null);
      setArchiveClassId(null);
      setBulkArchiveOpen(false);
      setEditingClassId(id);
    },
    closeEdit: () => setEditingClassId(null),
    updateClass,
    duplicateClass,
    scheduleClass,
    openSchedule: (id: number) => {
      setIsCreateOpen(false);
      setEditingClassId(null);
      setInviteClassId(null);
      setArchiveClassId(null);
      setBulkArchiveOpen(false);
      setScheduleClassId(id);
    },
    closeSchedule: () => setScheduleClassId(null),
    inviteClass,
    openInvite: (id: number) => {
      setIsCreateOpen(false);
      setEditingClassId(null);
      setScheduleClassId(null);
      setArchiveClassId(null);
      setBulkArchiveOpen(false);
      setInviteClassId(id);
    },
    closeInvite: () => setInviteClassId(null),
    notifyInviteCopied: (kind: 'code' | 'link') => {
      setToast({
        title: kind === 'code' ? 'Join code copied' : 'Invite link copied',
        message:
          kind === 'code'
            ? 'Share the code with students so they can join this class.'
            : 'Anyone with the link can create an account and join this class.',
      });
    },
    archiveTarget,
    openArchive: (id: number) => {
      setIsCreateOpen(false);
      setEditingClassId(null);
      setScheduleClassId(null);
      setInviteClassId(null);
      setBulkArchiveOpen(false);
      setArchiveClassId(id);
    },
    closeArchive: () => setArchiveClassId(null),
    confirmArchive,
    restoreClass,
    selectedIds,
    selectedActiveCount,
    selectedArchivedCount,
    allVisibleSelected,
    toggleClass,
    toggleAllVisible,
    clearSelection,
    bulkArchiveOpen,
    openBulkArchive: () => {
      if (selectedActiveCount === 0) return;
      setIsCreateOpen(false);
      setEditingClassId(null);
      setScheduleClassId(null);
      setInviteClassId(null);
      setArchiveClassId(null);
      setBulkArchiveOpen(true);
    },
    closeBulkArchive: () => setBulkArchiveOpen(false),
    confirmBulkArchive,
    restoreSelected,
    sortKey,
    sortDirection,
    handleSort,
    toast,
    dismissToast: () => setToast(null),
  };
}
