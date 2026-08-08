'use client';

import { teacherQuizzesPageMock } from '@/lib/mock/teacherQuizzes.mock';
import type {
  QuizSort,
  QuizStatus,
  QuizTab,
  QuizType,
  TeacherQuizRow,
} from '@/types/teacherQuizzes';
import { usePagedList } from '../shared';

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
  const q = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    !q ||
    quiz.title.toLowerCase().includes(q) ||
    quiz.description.toLowerCase().includes(q) ||
    quiz.subject.toLowerCase().includes(q);

  return (
    matchesSearch &&
    matchesTab(quiz, filters.tab) &&
    (filters.classFilter === 'All Classes' || quiz.classLabel === filters.classFilter) &&
    (filters.subject === 'All Subjects' || quiz.subject === filters.subject) &&
    (filters.status === 'All Status' || quiz.status === filters.status) &&
    (filters.type === 'All Types' || quiz.type === filters.type)
  );
}

function sortQuizzes(quizzes: TeacherQuizRow[], filters: QuizzesFiltersState) {
  const sorted = [...quizzes];
  const { sort } = filters;

  if (sort === 'Oldest First') {
    sorted.sort((a, b) => a.createdSortKey.localeCompare(b.createdSortKey));
    return sorted;
  }

  if (sort === 'Due Date') {
    sorted.sort((a, b) => a.dueSortKey.localeCompare(b.dueSortKey));
    return sorted;
  }

  if (sort === 'Title A-Z') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }

  sorted.sort((a, b) => b.createdSortKey.localeCompare(a.createdSortKey));
  return sorted;
}

export function useQuizzes() {
  const { metrics, quizzes, filterOptions, tabs } = teacherQuizzesPageMock;

  const list = usePagedList({
    items: quizzes,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesQuiz,
    sortFn: sortQuizzes,
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedQuizzes: list.paginatedItems,
  };
}
