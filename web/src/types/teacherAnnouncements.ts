export type AnnouncementStatus = 'Published' | 'Draft' | 'Scheduled' | 'Archived';

export type AnnouncementType = 'General' | 'Reminder' | 'Event' | 'Urgent';

export type AnnouncementTab =
  | 'All Announcements'
  | 'Published'
  | 'Drafts'
  | 'Pinned'
  | 'Scheduled';

export type AnnouncementSort = 'Newest First' | 'Oldest First' | 'Title A-Z';

export interface TeacherAnnouncementRow {
  id: string;
  title: string;
  description: string;
  audience: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  pinned: boolean;
  publishedAt: string;
  createdSortKey: string;
  views: number;
  icon: string;
  accent: string;
}

export type AnnouncementPublishMode = 'publish' | 'draft' | 'schedule';

export interface CreateAnnouncementInput {
  title: string;
  description: string;
  type: AnnouncementType;
  classrooms: string[];
  includeParents: boolean;
  allClasses: boolean;
  pinned: boolean;
  publishMode: AnnouncementPublishMode;
  scheduledAt?: string;
}

export interface TeacherAnnouncementsPageData {
  announcements: TeacherAnnouncementRow[];
  tabs: AnnouncementTab[];
  classroomOptions: string[];
  filterOptions: {
    audiences: string[];
    statuses: Array<'All Status' | AnnouncementStatus>;
    types: Array<'All Types' | AnnouncementType>;
    sorts: AnnouncementSort[];
  };
}
