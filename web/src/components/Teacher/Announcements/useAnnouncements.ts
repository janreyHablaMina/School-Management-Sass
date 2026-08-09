'use client';

import { teacherAnnouncementsPageMock } from '@/lib/mock/teacherAnnouncements.mock';
import type {
  AnnouncementSort,
  AnnouncementStatus,
  AnnouncementTab,
  AnnouncementType,
  TeacherAnnouncementRow,
} from '@/types/teacherAnnouncements';
import {
  matchesAllOrExact,
  matchesSearch,
  sortByCreatedOrTitle,
  usePagedList,
} from '../shared';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Announcements' as AnnouncementTab,
  classFilter: 'All Audiences',
  subject: 'All Subjects',
  status: 'All Status' as 'All Status' | AnnouncementStatus,
  type: 'All Types' as 'All Types' | AnnouncementType,
  sort: 'Newest First' as AnnouncementSort,
};

export type AnnouncementsFiltersState = typeof DEFAULT_FILTERS;

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
    matchesAllOrExact(filters.classFilter, row.audience, 'All Audiences') &&
    matchesAllOrExact(filters.status, row.status, 'All Status') &&
    matchesAllOrExact(filters.type, row.type, 'All Types')
  );
}

export function useAnnouncements() {
  const { metrics, announcements, filterOptions, tabs } = teacherAnnouncementsPageMock;

  const list = usePagedList({
    items: announcements,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesAnnouncement,
    sortFn: (items, filters) => sortByCreatedOrTitle(items, filters.sort),
  });

  return {
    metrics,
    tabs,
    filterOptions,
    ...list,
    paginatedAnnouncements: list.paginatedItems,
  };
}
