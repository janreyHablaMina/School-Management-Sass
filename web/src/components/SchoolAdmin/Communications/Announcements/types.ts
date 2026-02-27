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

export interface AnnouncementFiltersState extends Record<string, string> {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
}

