'use client';

import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import type {
  LessonSort,
  LessonStatus,
  LessonTab,
  LessonType,
  TeacherLessonRow,
} from '@/types/teacherLessons';
import { usePagedList } from '../shared';

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

export function useLessons() {
  const { metrics, lessons, filterOptions, tabs } = teacherLessonsPageMock;

  const list = usePagedList({
    items: lessons,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesLesson,
    sortFn: sortLessons,
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedLessons: list.paginatedItems,
  };
}
