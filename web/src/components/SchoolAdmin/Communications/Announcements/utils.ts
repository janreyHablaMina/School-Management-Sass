import type { AnnouncementRecord } from './types';
import type { CreateAnnouncementInput, TeacherAnnouncementRow } from '@/types/teacherAnnouncements';

export function statusAccent(status: string) {
  if (status === 'Published') return '#5cc789';
  if (status === 'Scheduled') return '#84a9ff';
  if (status === 'Draft') return '#f5c842';
  return '#8a9a90';
}

export function typeAccent(type: string) {
  if (type === 'Urgent') return '#ff7e93';
  if (type === 'Event') return '#b68eff';
  if (type === 'Academic') return '#5cc789';
  if (type === 'Reminder') return '#f5c842';
  return '#84a9ff';
}

export function buildAnnouncementFromInput(input: CreateAnnouncementInput): AnnouncementRecord {
  let audience = 'All Users';
  if (!input.allClasses && input.classrooms.length > 0) {
      audience = input.classrooms.join(', ');
      if (input.includeParents) audience += ' and Parents';
  } else if (input.includeParents) {
      audience = 'Parents';
  }

  return {
    id: `ann${Date.now()}`,
    title: input.title,
    description: input.description,
    audience: audience,
    type: input.type,
    status: input.publishMode === 'publish' ? 'Published' : input.publishMode === 'schedule' ? 'Scheduled' : 'Draft',
    delivery: 'Portal',
    author: 'Admin', // Indicates it was created by school admin
    publishedAt: input.publishMode === 'publish' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : input.publishMode === 'schedule' && input.scheduledAt ? new Date(input.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft',
    publishedSortKey: new Date().toISOString().split('T')[0],
    recipientCount: 0,
    readRate: 0,
    priority: input.type === 'Urgent' ? 'High' : 'Medium',
    accent: '#84a9ff',
  };
}

export function mapToTeacherRow(announcement: AnnouncementRecord): TeacherAnnouncementRow {
  return {
    id: announcement.id,
    title: announcement.title,
    description: announcement.description,
    type: announcement.type as any,
    status: announcement.status as any,
    audience: announcement.audience,
    publishedAt: announcement.publishedAt,
    publishedSortKey: announcement.publishedSortKey,
    views: announcement.readRate,
    isPinned: false,
    scheduledFor: announcement.status === 'Scheduled' ? announcement.publishedAt : undefined,
  };
}
