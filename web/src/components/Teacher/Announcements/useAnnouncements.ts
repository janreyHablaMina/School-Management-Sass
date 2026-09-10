'use client';

import { useMemo, useState } from 'react';
import { teacherAnnouncementsPageMock } from '@/lib/mock/teacherAnnouncements.mock';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type {
  AnnouncementSortKey,
  AnnouncementStatus,
  AnnouncementType,
  CreateAnnouncementInput,
  TeacherAnnouncementRow,
} from '@/types/teacherAnnouncements';
import {
  archiveRowById,
  archiveRowsByIds,
  bindColumnSort,
  deleteRowById,
  deleteRowsByIds,
  matchesAllOrExact,
  matchesSearch,
  sortWithColumnOverride,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';
import { buildAnnouncementFromInput } from './utils';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  recipientFilter: 'All Recipients',
  status: 'All Status' as 'All Status' | AnnouncementStatus,
  type: 'All Types' as 'All Types' | AnnouncementType,
};

export type AnnouncementsFiltersState = typeof DEFAULT_FILTERS;

function matchesRecipient(row: TeacherAnnouncementRow, recipientFilter: string) {
  if (recipientFilter === 'All Recipients') return true;
  if (recipientFilter === 'Parents') return row.audience.includes('Parents');
  if (recipientFilter === 'Students') return row.audience !== 'Parents';
  return true;
}

function matchesAnnouncement(row: TeacherAnnouncementRow, filters: AnnouncementsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [row.title, row.description, row.audience]) &&
    matchesRecipient(row, filters.recipientFilter) &&
    matchesAllOrExact(filters.status, row.status, 'All Status') &&
    matchesAllOrExact(filters.type, row.type, 'All Types')
  );
}

function sortNewestFirst(rows: TeacherAnnouncementRow[]) {
  return [...rows].sort((a, b) => b.createdSortKey.localeCompare(a.createdSortKey));
}

function getAnnouncementSortValue(
  row: TeacherAnnouncementRow,
  key: AnnouncementSortKey,
): unknown {
  return row[key];
}

function buildMetrics(announcements: TeacherAnnouncementRow[]): TeacherSummaryMetric[] {
  const published = announcements.filter((a) => a.status === 'Published').length;
  const drafts = announcements.filter((a) => a.status === 'Draft').length;
  const pinned = announcements.filter((a) => a.pinned).length;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekKey = weekAgo.toISOString().slice(0, 10);
  const thisWeek = announcements.filter((a) => a.createdSortKey >= weekKey).length;

  return [
    {
      label: 'Total Announcements',
      value: String(announcements.length),
      subtitle: 'This school year',
      icon: '📢',
      accent: '#b68eff',
    },
    {
      label: 'Published',
      value: String(published),
      subtitle: 'Visible to students',
      icon: '✅',
      accent: '#5cc789',
    },
    {
      label: 'Drafts',
      value: String(drafts),
      subtitle: 'Not sent yet',
      icon: '📝',
      accent: '#f5a623',
    },
    {
      label: 'Pinned',
      value: String(pinned),
      subtitle: 'Stay on top',
      icon: '📌',
      accent: '#84a9ff',
    },
    {
      label: 'This Week',
      value: String(thisWeek),
      subtitle: 'Posted or scheduled',
      icon: '📅',
      accent: '#f5c842',
    },
  ];
}

export function useAnnouncements() {
  const { filterOptions, classroomOptions, announcements: seed } = teacherAnnouncementsPageMock;
  const [announcements, setAnnouncements] = useState(seed);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort, setSortConfig } =
    useColumnSort<AnnouncementSortKey>();

  const metrics = useMemo(() => buildMetrics(announcements), [announcements]);

  const list = usePagedList({
    items: announcements,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesAnnouncement,
    sortFn: (items) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        getAnnouncementSortValue,
        sortNewestFirst,
        undefined,
        (a, b) => a.title.localeCompare(b.title),
      ),
    sortDeps: sortConfig,
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  const paginatedAnnouncements = list.paginatedItems;
  const visibleIds = paginatedAnnouncements.map((row) => row.id);
  const {
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    setSelectedIds,
  } = useRowSelection({
    visibleIds,
    resetKey: `${list.page}:${JSON.stringify(list.filters)}`,
  });

  const createAnnouncement = (input: CreateAnnouncementInput) => {
    const next = buildAnnouncementFromInput(input, `ann-${Date.now()}`);
    setAnnouncements((prev) => [next, ...prev]);
    setIsCreateOpen(false);
    setSortConfig(null);
    list.clearFilters();
    list.setPage(1);
    clearSelection();
    setToast({
      title:
        next.status === 'Published'
          ? 'Announcement published'
          : next.status === 'Scheduled'
            ? 'Announcement scheduled'
            : 'Draft saved',
      message:
        next.status === 'Scheduled' && next.scheduledFor
          ? `${next.title} will auto-send on ${next.scheduledFor}.`
          : `${next.title} was added to your announcements.`,
    });
  };

  const archiveSelected = () => {
    if (selectedIds.length === 0) return;
    setAnnouncements((prev) => archiveRowsByIds(prev, selectedIds));
    setToast({
      title: `${selectedIds.length} announcement${selectedIds.length === 1 ? '' : 's'} archived`,
    });
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setAnnouncements((prev) => deleteRowsByIds(prev, selectedIds));
    setToast({
      title: `${selectedIds.length} announcement${selectedIds.length === 1 ? '' : 's'} deleted`,
    });
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setAnnouncements((prev) => archiveRowById(prev, id));
    setToast({ title: 'Announcement archived' });
  };

  const deleteItem = (id: string) => {
    setAnnouncements((prev) => deleteRowById(prev, id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    setToast({ title: 'Announcement deleted' });
  };

  const duplicateItem = (id: string) => {
    setAnnouncements((prev) => {
      const source = prev.find((announcement) => announcement.id === id);
      if (!source) return prev;

      const duplicate: TeacherAnnouncementRow = {
        ...source,
        id: `ann-${Date.now()}`,
        title: `Copy of ${source.title}`,
        status: 'Draft',
        pinned: false,
        publishedAt: 'Not published',
        scheduledFor: undefined,
        createdSortKey: new Date().toISOString().slice(0, 10),
        views: 0,
      };

      return [duplicate, ...prev];
    });
    list.setPage(1);
    setToast({
      title: 'Announcement duplicated',
      message: 'A draft copy was added to the list.',
    });
  };

  return {
    metrics,
    filterOptions,
    classroomOptions,
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    createAnnouncement,
    ...list,
    paginatedAnnouncements,
    sortKey,
    sortDirection,
    handleSort,
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
    duplicateItem,
    toast,
    dismissToast: () => setToast(null),
  };
}
