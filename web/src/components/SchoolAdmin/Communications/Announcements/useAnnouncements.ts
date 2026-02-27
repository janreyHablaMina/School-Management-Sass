import { useState } from 'react';
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
}

const INITIAL_FILTERS: AnnouncementFilters = {
  searchTerm: '',
  statusFilter: 'All Status',
  typeFilter: 'All Types',
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

  return matchesSearch && matchesStatus && matchesType;
}

export function useAnnouncements() {
  const [items, setItems] = useState<AnnouncementRecord[]>(schoolAdminMockData.announcementDirectory);

  const directory = useSchoolAdminDirectory<
    AnnouncementRecord,
    AnnouncementSortKey,
    AnnouncementFilters
  >({
    items,
    initialFilters: INITIAL_FILTERS,
    getId: (announcement) => announcement.id,
    filterItem: filterAnnouncement,
    getSortValue: valueForSort,
  });

  const addAnnouncement = (newAnnouncement: AnnouncementRecord) => {
    setItems((prev) => [newAnnouncement, ...prev]);
  };

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  const duplicateItem = (id: string) => {
    const source = items.find((announcement) => announcement.id === id);
    if (!source) return;

    setItems((prev) => {
      const duplicate: AnnouncementRecord = {
        ...source,
        id: `ann${Date.now()}`,
        title: `Copy of ${source.title}`,
        status: 'Draft',
        publishedAt: 'Draft',
        publishedSortKey: new Date().toISOString().split('T')[0],
        recipientCount: 0,
        readRate: 0,
      };

      return [duplicate, ...prev];
    });
    directory.setPage(1);
    setToast({
      title: `"${source.title}" duplicated`,
      message: 'A draft copy was added to the list.',
    });
  };

  const dismissToast = () => setToast(null);

  return {
    searchTerm: directory.filters.searchTerm,
    setSearchTerm: (value: string) => directory.setFilter('searchTerm', value),
    statusFilter: directory.filters.statusFilter,
    setStatusFilter: (value: string) => directory.setFilter('statusFilter', value),
    typeFilter: directory.filters.typeFilter,
    setTypeFilter: (value: string) => directory.setFilter('typeFilter', value),
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
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    addAnnouncement,
    duplicateItem,
    toast,
    dismissToast,
    setToast,
  };
}
