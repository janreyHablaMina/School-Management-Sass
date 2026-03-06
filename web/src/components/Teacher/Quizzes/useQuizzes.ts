'use client';

import { useState } from 'react';
import { teacherQuizzesPageMock } from '@/lib/mock/teacherQuizzes.mock';
import {
  resolveListFiltersFromFocus,
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
  sortByConfig,
  sortByCreatedOrTitle,
  useColumnSort,
  usePagedList,
  useRowSelection,
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

export type QuizSortKey =
  | 'title'
  | 'classLabel'
  | 'questionCount'
  | 'dueSortKey'
  | 'attemptCount'
  | 'status';

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

function getQuizSortValue(quiz: TeacherQuizRow, key: QuizSortKey): unknown {
  return quiz[key];
}

export function useQuizzes(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, quizzes: seed, filterOptions, tabs } = teacherQuizzesPageMock;
  const { classFilter, subject } = resolveListFiltersFromFocus(
    filterOptions,
    options?.classFocus,
    DEFAULT_FILTERS,
  );

  const [quizzes, setQuizzes] = useState(seed);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<QuizSortKey>();

  const list = usePagedList({
    items: quizzes,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesQuiz,
    sortFn: (items, filters) => {
      if (sortConfig) {
        return sortByConfig(items, sortConfig, getQuizSortValue, (a, b) =>
          a.title.localeCompare(b.title),
        );
      }
      return sortByCreatedOrTitle(items, filters.sort);
    },
    sortDeps: sortConfig,
  });

  const handleSort = (key: QuizSortKey) => {
    toggleSort(key);
    list.setPage(1);
  };

  const paginatedQuizzes = list.paginatedItems;
  const visibleIds = paginatedQuizzes.map((quiz) => quiz.id);
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
    setQuizzes((prev) =>
      prev.map((quiz) =>
        idSet.has(quiz.id) && quiz.status !== 'Archived'
          ? { ...quiz, status: 'Archived' }
          : quiz,
      ),
    );
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    const idSet = new Set(selectedIds);
    setQuizzes((prev) => prev.filter((quiz) => !idSet.has(quiz.id)));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.id === id && quiz.status !== 'Archived'
          ? { ...quiz, status: 'Archived' }
          : quiz,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedQuizzes,
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
