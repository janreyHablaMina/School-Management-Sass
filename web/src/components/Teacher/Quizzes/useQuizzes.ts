'use client';

import { teacherQuizzesPageMock } from '@/lib/mock/teacherQuizzes.mock';
import {
  resolveClassFilterOption,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  QuizSort,
  QuizStatus,
  QuizTab,
  QuizType,
  TeacherQuizRow,
} from '@/types/teacherQuizzes';
import {
  matchesAllOrExact,
  matchesSearch,
  sortByCreatedOrTitle,
  usePagedList,
} from '../shared';

const PAGE_SIZE = 7;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Quizzes' as QuizTab,
  classFilter: 'All Classes',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | QuizStatus,
  type: 'All Types' as 'All Types' | QuizType,
  sort: 'Newest First' as QuizSort,
};

export type QuizzesFiltersState = typeof DEFAULT_FILTERS;

function matchesTab(quiz: TeacherQuizRow, tab: QuizTab) {
  switch (tab) {
    case 'Upcoming':
      return quiz.status === 'Upcoming';
    case 'Active':
      return quiz.status === 'Active';
    case 'Completed':
      return quiz.status === 'Completed';
    case 'Draft':
      return quiz.status === 'Draft';
    case 'Archived':
      return quiz.status === 'Archived';
    default:
      return true;
  }
}

function matchesQuiz(quiz: TeacherQuizRow, filters: QuizzesFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [quiz.title, quiz.description, quiz.subject]) &&
    matchesTab(quiz, filters.tab) &&
    matchesAllOrExact(filters.classFilter, quiz.classLabel, 'All Classes') &&
    matchesAllOrExact(filters.subject, quiz.subject, 'All Subjects') &&
    matchesAllOrExact(filters.status, quiz.status, 'All Status') &&
    matchesAllOrExact(filters.type, quiz.type, 'All Types')
  );
}

export function useQuizzes(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, quizzes, filterOptions, tabs } = teacherQuizzesPageMock;
  const classFilter =
    resolveClassFilterOption(filterOptions.classes, options?.classFocus) ??
    DEFAULT_FILTERS.classFilter;
  const subject =
    options?.classFocus && filterOptions.subjects.includes(options.classFocus.subject)
      ? options.classFocus.subject
      : DEFAULT_FILTERS.subject;

  const list = usePagedList({
    items: quizzes,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesQuiz,
    sortFn: (items, filters) => sortByCreatedOrTitle(items, filters.sort),
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedQuizzes: list.paginatedItems,
  };
}
