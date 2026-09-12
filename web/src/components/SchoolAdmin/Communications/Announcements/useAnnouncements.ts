import { useSchoolAdminDirectory } from '@/components/SchoolAdmin/shared/useSchoolAdminDirectory';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type AnnouncementRecord = (typeof schoolAdminMockData.announcementDirectory)[number];
export type AnnouncementSortKey =
  | 'title'
  | 'audience'
  | 'type'
  | 'status'
  | 'delivery'
  | 'author'
  | 'publishedSortKey'
  | 'recipientCount'
  | 'readRate'
  | 'priority';

interface AnnouncementFilters extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  priorityFilter: string;
}

const INITIAL_FILTERS: AnnouncementFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  typeFilter: 'All Types',
  priorityFilter: 'All Priorities',
};

function valueForSort(announcement: AnnouncementRecord, key: AnnouncementSortKey) {
  return announcement[key];
}

function filterAnnouncement(announcement: AnnouncementRecord, filters: AnnouncementFilters) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch === '' ||
    announcement.title.toLowerCase().includes(normalizedSearch) ||
    announcement.description.toLowerCase().includes(normalizedSearch) ||
    announcement.audience.toLowerCase().includes(normalizedSearch) ||
    announcement.author.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    filters.statusFilter === 'All Status' || announcement.status === filters.statusFilter;
  const matchesType =
    filters.typeFilter === 'All Types' || announcement.type === filters.typeFilter;
  const matchesPriority =
    filters.priorityFilter === 'All Priorities' ||
    announcement.priority === filters.priorityFilter;

  return matchesSearch && matchesStatus && matchesType && matchesPriority;
}

export function useAnnouncements() {
  const directory = useSchoolAdminDirectory<
    AnnouncementRecord,
    AnnouncementSortKey,
    AnnouncementFilters
  >({
    items: schoolAdminMockData.announcementDirectory,
    initialFilters: INITIAL_FILTERS,
    getId: (announcement) => announcement.id,
    filterItem: filterAnnouncement,
    getSortValue: valueForSort,
  });

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    typeFilter: directory.filters.typeFilter,
    setTypeFilter: (value: string) => directory.setFilter('typeFilter', value),
    priorityFilter: directory.filters.priorityFilter,
    setPriorityFilter: (value: string) => directory.setFilter('priorityFilter', value),
    currentPage: directory.page,
    setCurrentPage: directory.setPage,
    selectedAnnouncements: directory.selectedIds,
    handleSelectAll: directory.handleSelectAll,
    handleSelectAnnouncement: directory.handleSelectItem,
    handleSort: directory.handleSort,
    sortKey: directory.sortKey,
    sortDirection: directory.sortDirection,
    announcements: directory.paginatedItems,
    totalCount: directory.filteredCount,
    totalPages: directory.totalPages,
    rangeStart: directory.rangeStart,
    rangeEnd: directory.rangeEnd,
    resetFilters: directory.clearFilters,
    hasActiveFilters: directory.isDirty,
  };
}
