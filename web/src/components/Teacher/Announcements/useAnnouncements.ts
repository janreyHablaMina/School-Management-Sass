'use client';

import { useMemo, useState } from 'react';
import { teacherAnnouncementsPageMock } from '@/lib/mock/teacherAnnouncements.mock';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type {
  AnnouncementSort,
  AnnouncementStatus,
  AnnouncementTab,
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
  sortByCreatedOrTitle,
  sortWithColumnOverride,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';
import { buildAnnouncementFromInput } from './utils';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Announcements' as AnnouncementTab,
  classFilter: 'All Audiences',
  status: 'All Status' as 'All Status' | AnnouncementStatus,
  type: 'All Types' as 'All Types' | AnnouncementType,
  sort: 'Newest First' as AnnouncementSort,
};

export type AnnouncementsFiltersState = typeof DEFAULT_FILTERS;

export type AnnouncementSortKey =
  | 'title'
  | 'audience'
  | 'type'
  | 'status'
  | 'createdSortKey';

function matchesAudience(row: TeacherAnnouncementRow, classFilter: string) {
  if (classFilter === 'All Audiences') return true;
  if (row.audience === classFilter) return true;
  if (classFilter === 'All Classes' && row.audience.includes('All Classes')) return true;
  if (classFilter === 'Parents' && row.audience.includes('Parents')) return true;
  return row.audience.split(', ').includes(classFilter);
}

function matchesTab(row: TeacherAnnouncementRow, tab: AnnouncementTab) {
  switch (tab) {
    case 'Published':
      return row.status === 'Published';
    case 'Drafts':
      return row.status === 'Draft';
    case 'Pinned':
      return row.pinned;
    case 'Scheduled':
      return row.status === 'Scheduled';
    default:
      return true;
  }
}

function matchesAnnouncement(row: TeacherAnnouncementRow, filters: AnnouncementsFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [row.title, row.description, row.audience]) &&
    matchesTab(row, filters.tab) &&
    matchesAudience(row, filters.classFilter) &&
    matchesAllOrExact(filters.status, row.status, 'All Status') &&
    matchesAllOrExact(filters.type, row.type, 'All Types')
  );
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
  const { filterOptions, tabs, classroomOptions, announcements: seed } = teacherAnnouncementsPageMock;
  const [announcements, setAnnouncements] = useState(seed);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<AnnouncementSortKey>();

  const metrics = useMemo(() => buildMetrics(announcements), [announcements]);

  const list = usePagedList({
    items: announcements,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesAnnouncement,
    sortFn: (items, filters) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        getAnnouncementSortValue,
        (rows, f) => sortByCreatedOrTitle(rows, f.sort),
        filters,
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
    list.setPage(1);
  };

  const archiveSelected = () => {
    if (selectedIds.length === 0) return;
    setAnnouncements((prev) => archiveRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setAnnouncements((prev) => deleteRowsByIds(prev, selectedIds));
    clearSelection();
  };

  const archiveItem = (id: string) => {
    setAnnouncements((prev) => archiveRowById(prev, id));
  };

  const deleteItem = (id: string) => {
    setAnnouncements((prev) => deleteRowById(prev, id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    metrics,
    tabs,
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
  };
}
