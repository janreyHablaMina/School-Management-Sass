import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type LessonRecord = (typeof schoolAdminMockData.lessons)[number];
export type LessonSortKey =
  | 'title'
  | 'classLabel'
  | 'subject'
  | 'teacher'
  | 'type'
  | 'status'
  | 'durationMins'
  | 'updatedSortKey'
  | 'coverage';

interface LessonFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  coverageFilter: string;
}

const INITIAL_FILTERS: LessonFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  coverageFilter: 'All Coverage',
};

function valueForSort(lesson: LessonRecord, key: LessonSortKey) {
  return lesson[key];
}

function filterLesson(lesson: LessonRecord, filters: LessonFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    lesson.title.toLowerCase().includes(normalizedSearch) ||
    lesson.classLabel.toLowerCase().includes(normalizedSearch) ||
    lesson.subject.toLowerCase().includes(normalizedSearch) ||
    lesson.teacher.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || lesson.status === filters.statusFilter;
  const matchesCoverage =
    filters.coverageFilter === 'All Coverage' || lesson.coverage === filters.coverageFilter;

  return matchesSearch && matchesStatus && matchesCoverage;
}

export function useLessons() {
  const directory = useSchoolAdminDirectory<LessonRecord, LessonSortKey, LessonFilters>({
    items: schoolAdminMockData.lessons,
    initialFilters: INITIAL_FILTERS,
    getId: (lesson) => lesson.id,
    filterItem: filterLesson,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    coverageFilter: directory.filters.coverageFilter,
    setCoverageFilter: (value: string) => directory.setFilter('coverageFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedLessons: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectLesson: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    lessons: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
