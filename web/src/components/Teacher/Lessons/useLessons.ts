'use client';

import { useEffect, useState } from 'react';
import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import {
  consumeLessonsPendingToast,
  loadTeacherLessons,
  persistTeacherLessons,
} from '@/lib/lessons/storage';
import {
  resolveListFiltersFromFocus,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  LessonSort,
  LessonStatus,
  LessonTab,
  LessonType,
  TeacherLessonRow,
} from '@/types/teacherLessons';
import {
  archiveRowById,
  archiveRowsByIds,
  bindColumnSort,
  deleteRowById,
  deleteRowsByIds,
  matchesAllOrExact,
  matchesSearch,
  sortWithColumnOverride,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';
import { buildLessonFromInput, sanitizeLessonList, type CreateLessonInput } from './utils';

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Lessons' as LessonTab,
  classFilter: 'All Classes',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | LessonStatus,
  type: 'All Types' as 'All Types' | LessonType,
  sort: 'Newest First' as LessonSort,
};

export type LessonsFiltersState = typeof DEFAULT_FILTERS;

export type LessonSortKey =
  | 'title'
  | 'classLabel'
  | 'type'
  | 'status'
  | 'updatedSortKey';

function matchesLesson(lesson: TeacherLessonRow, filters: LessonsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [lesson.title, lesson.description, lesson.subject]) &&
    matchesAllOrExact(filters.classFilter, lesson.classLabel, 'All Classes') &&
    matchesAllOrExact(filters.subject, lesson.subject, 'All Subjects') &&
    matchesAllOrExact(filters.status, lesson.status, 'All Status') &&
    matchesAllOrExact(filters.type, lesson.type, 'All Types')
  );
}

function sortLessons(lessons: TeacherLessonRow[], filters: LessonsFiltersState) {
  const sorted = [...lessons];
  const { tab, sort } = filters;

  if (tab === 'By Class') {
    sorted.sort((a, b) => a.classLabel.localeCompare(b.classLabel) || a.title.localeCompare(b.title));
    return sorted;
  }

  if (tab === 'By Subject') {
    sorted.sort((a, b) => a.subject.localeCompare(b.subject) || a.title.localeCompare(b.title));
    return sorted;
  }

  if (tab === 'Recently Updated' || sort === 'Newest First') {
    sorted.sort((a, b) => b.updatedSortKey.localeCompare(a.updatedSortKey));
    return sorted;
  }

  if (sort === 'Oldest First') {
    sorted.sort((a, b) => a.updatedSortKey.localeCompare(b.updatedSortKey));
    return sorted;
  }

  sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted;
}

function getLessonSortValue(lesson: TeacherLessonRow, key: LessonSortKey): unknown {
  return lesson[key];
}

export function useLessons(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, lessons: seed, filterOptions, tabs } = teacherLessonsPageMock;
  const { classFilter, subject } = resolveListFiltersFromFocus(
    filterOptions,
    options?.classFocus,
    DEFAULT_FILTERS,
  );

  const [lessons, setLessons] = useState(() => {
    const loaded = loadTeacherLessons(seed);
    const sanitized = sanitizeLessonList(loaded);
    if (sanitized.some((lesson, index) => lesson !== loaded[index])) {
      persistTeacherLessons(sanitized);
    }
    return sanitized;
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<LessonSortKey>();

  const list = usePagedList({
    items: lessons,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesLesson,
    sortFn: (items, filters) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        getLessonSortValue,
        sortLessons,
        filters,
        (a, b) => a.title.localeCompare(b.title),
      ),
    sortDeps: sortConfig,
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  useEffect(() => {
    persistTeacherLessons(lessons);
  }, [lessons]);

  useEffect(() => {
    const pending = consumeLessonsPendingToast();
    if (pending) setToast(pending);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const paginatedLessons = list.paginatedItems;
  const visibleIds = paginatedLessons.map((lesson) => lesson.id);
  const {
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    setSelectedIds,
  } = useRowSelection({
    visibleIds,
    resetKey: `${list.page}:${JSON.stringify(list.filters)}`,
  });

  const archiveSelected = () => {
    if (selectedIds.length === 0) return;
    setLessons((prev) => archiveRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setLessons((prev) => deleteRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setLessons((prev) => archiveRowById(prev, id));
  };

  const deleteItem = (id: string) => {
    setLessons((prev) => deleteRowById(prev, id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const createLesson = (input: CreateLessonInput) => {
    const next = buildLessonFromInput(input, lessons);
    setLessons((prev) => [next, ...prev]);
    setIsCreateOpen(false);
    list.setPage(1);
    setToast({
      title: input.status === 'Published' ? 'Lesson published' : 'Draft saved',
      message: `${next.title} · ${next.classLabel}`,
    });
  };

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedLessons,
    sortKey,
    sortDirection,
    handleSort,
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    createLesson,
    toast,
    dismissToast: () => setToast(null),
  };
}
