'use client';

import { teacherExamsPageMock } from '@/lib/mock/teacherExams.mock';
import {
  resolveClassFilterOption,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  ExamSort,
  ExamStatus,
  ExamTab,
  ExamType,
  TeacherExamRow,
} from '@/types/teacherExams';
import {
  matchesAllOrExact,
  matchesSearch,
  sortByCreatedOrTitle,
  usePagedList,
} from '../shared';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Exams' as ExamTab,
  classFilter: 'All Classes',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | ExamStatus,
  type: 'All Types' as 'All Types' | ExamType,
  sort: 'Newest First' as ExamSort,
};

export type ExamsFiltersState = typeof DEFAULT_FILTERS;

function matchesTab(exam: TeacherExamRow, tab: ExamTab) {
  switch (tab) {
    case 'Upcoming':
      return exam.status === 'Upcoming';
    case 'Ongoing':
      return exam.status === 'Ongoing';
    case 'Completed':
      return exam.status === 'Completed';
    case 'Draft':
      return exam.status === 'Draft';
    case 'Archived':
      return exam.status === 'Archived';
    default:
      return true;
  }
}

function matchesExam(exam: TeacherExamRow, filters: ExamsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [exam.title, exam.description, exam.subject]) &&
    matchesTab(exam, filters.tab) &&
    matchesAllOrExact(filters.classFilter, exam.classLabel, 'All Classes') &&
    matchesAllOrExact(filters.subject, exam.subject, 'All Subjects') &&
    matchesAllOrExact(filters.status, exam.status, 'All Status') &&
    matchesAllOrExact(filters.type, exam.type, 'All Types')
  );
}

export function useExams(options?: { classFocus?: TeacherClassFocus | null }) {
  const { metrics, exams, filterOptions, tabs } = teacherExamsPageMock;
  const classFilter =
    resolveClassFilterOption(filterOptions.classes, options?.classFocus) ??
    DEFAULT_FILTERS.classFilter;
  const subject =
    options?.classFocus && filterOptions.subjects.includes(options.classFocus.subject)
      ? options.classFocus.subject
      : DEFAULT_FILTERS.subject;

  const list = usePagedList({
    items: exams,
    initialFilters: { ...DEFAULT_FILTERS, classFilter, subject },
    pageSize: PAGE_SIZE,
    filterFn: matchesExam,
    sortFn: (items, filters) => sortByCreatedOrTitle(items, filters.sort),
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedExams: list.paginatedItems,
  };
}
