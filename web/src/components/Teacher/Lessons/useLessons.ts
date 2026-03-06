'use client';

import { useState } from 'react';
import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
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
  matchesAllOrExact,
  matchesSearch,
  sortByConfig,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';

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

  const [lessons, setLessons] = useState(seed);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<LessonSortKey>();

  const list = usePagedList({
    items: lessons,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesLesson,
    sortFn: (items, filters) => {
      if (sortConfig) {
        return sortByConfig(items, sortConfig, getLessonSortValue, (a, b) =>
          a.title.localeCompare(b.title),
        );
      }
      return sortLessons(items, filters);
    },
    sortDeps: sortConfig,
  });

  const handleSort = (key: LessonSortKey) => {
    toggleSort(key);
    list.setPage(1);
  };

  const paginatedLessons = list.paginatedItems;
  const visibleIds = paginatedLessons.map((lesson) => lesson.id);
  const {
    selectedIds,
    selectedCount,
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
    const idSet = new Set(selectedIds);
    setLessons((prev) =>
      prev.map((lesson) =>
        idSet.has(lesson.id) && lesson.status !== 'Archived'
          ? { ...lesson, status: 'Archived' }
          : lesson,
      ),
    );
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    const idSet = new Set(selectedIds);
    setLessons((prev) => prev.filter((lesson) => !idSet.has(lesson.id)));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id && lesson.status !== 'Archived'
          ? { ...lesson, status: 'Archived' }
          : lesson,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
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
    selectedCount,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
  };
}
