export type AnnouncementStatus = 'Published' | 'Draft' | 'Scheduled' | 'Archived';

export type AnnouncementType = 'General' | 'Reminder' | 'Event' | 'Urgent';

export type AnnouncementSortKey =
  | 'title'
  | 'audience'
  | 'status'
  | 'createdSortKey';

export interface TeacherAnnouncementRow {
  id: string;
  title: string;
  description: string;
  audience: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  pinned: boolean;
  publishedAt: string;
  scheduledFor?: string;
  createdSortKey: string;
  views: number;
  imageUrl?: string;
  imageName?: string;
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
  scheduledTime?: string;
  imageUrl?: string;
  imageName?: string;
}

export interface TeacherAnnouncementsPageData {
  announcements: TeacherAnnouncementRow[];
  classroomOptions: string[];
  filterOptions: {
    recipients: string[];
    statuses: Array<'All Status' | AnnouncementStatus>;
    types: Array<'All Types' | AnnouncementType>;
  };
}
