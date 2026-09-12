import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type QuizRecord = (typeof schoolAdminMockData.quizzes)[number];
export type QuizSortKey =
  | 'title'
  | 'classLabel'
  | 'subject'
  | 'teacher'
  | 'questionCount'
  | 'dueSortKey'
  | 'attemptCount'
  | 'averageScore'
  | 'status'
  | 'riskLevel';

interface QuizFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
}

const INITIAL_FILTERS: QuizFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  riskFilter: 'All Risk Levels',
};

function valueForSort(quiz: QuizRecord, key: QuizSortKey) {
  if (key === 'averageScore') return quiz.averageScore ?? -1;
  return quiz[key];
}

function filterQuiz(quiz: QuizRecord, filters: QuizFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    quiz.title.toLowerCase().includes(normalizedSearch) ||
    quiz.classLabel.toLowerCase().includes(normalizedSearch) ||
    quiz.subject.toLowerCase().includes(normalizedSearch) ||
    quiz.teacher.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || quiz.status === filters.statusFilter;
  const matchesRisk =
    filters.riskFilter === 'All Risk Levels' || quiz.riskLevel === filters.riskFilter;

  return matchesSearch && matchesStatus && matchesRisk;
}

export function useQuizzes() {
  const directory = useSchoolAdminDirectory<QuizRecord, QuizSortKey, QuizFilters>({
    items: schoolAdminMockData.quizzes,
    initialFilters: INITIAL_FILTERS,
    getId: (quiz) => quiz.id,
    filterItem: filterQuiz,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    riskFilter: directory.filters.riskFilter,
    setRiskFilter: (value: string) => directory.setFilter('riskFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedQuizzes: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectQuiz: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    quizzes: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
