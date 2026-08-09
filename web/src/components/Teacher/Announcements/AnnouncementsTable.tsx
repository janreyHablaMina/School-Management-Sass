import React from 'react';
import { DataTable } from '../shared';
import { AnnouncementRow } from './components/AnnouncementRow';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';

interface AnnouncementsTableProps {
  announcements: TeacherAnnouncementRow[];
}

const COLUMNS = [
  'Announcement',
  'Audience',
  'Type',
  'Status',
  'Date / Views',
  'Actions',
] as const;

export function AnnouncementsTable({ announcements }: AnnouncementsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={980}>
      {announcements.map((announcement) => (
        <AnnouncementRow key={announcement.id} announcement={announcement} />
      ))}
    </DataTable>
  );
}
