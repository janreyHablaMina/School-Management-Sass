'use client';

import { useMemo, useState } from 'react';
import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import type {
  LessonSort,
  LessonStatus,
  LessonTab,
  LessonType,
  TeacherLessonRow,
} from '@/types/teacherLessons';

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
export type LessonsFilterKey = keyof LessonsFiltersState;

function matchesLesson(lesson: TeacherLessonRow, filters: LessonsFiltersState) {
  const q = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    !q ||
    lesson.title.toLowerCase().includes(q) ||
    lesson.description.toLowerCase().includes(q) ||
    lesson.subject.toLowerCase().includes(q);

  return (
    matchesSearch &&
    (filters.classFilter === 'All Classes' || lesson.classLabel === filters.classFilter) &&
    (filters.subject === 'All Subjects' || lesson.subject === filters.subject) &&
    (filters.status === 'All Status' || lesson.status === filters.status) &&
    (filters.type === 'All Types' || lesson.type === filters.type)
  );
}

function sortLessons(lessons: TeacherLessonRow[], sort: LessonSort, tab: LessonTab) {
  const sorted = [...lessons];

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

export function useLessons() {
  const { metrics, lessons, filterOptions, tabs } = teacherLessonsPageMock;
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const sortedFiltered = useMemo(() => {
    const filtered = lessons.filter((lesson) => matchesLesson(lesson, filters));
    return sortLessons(filtered, filters.sort, filters.tab);
  }, [lessons, filters]);

  const filteredCount = sortedFiltered.length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedLessons = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedFiltered.slice(start, start + PAGE_SIZE);
  }, [sortedFiltered, currentPage]);

  const setFilter = <K extends LessonsFilterKey>(key: K, value: LessonsFiltersState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const rangeStart = filteredCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredCount);

  return {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedLessons,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
