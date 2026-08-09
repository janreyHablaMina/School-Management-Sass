import type { AnnouncementStatus, AnnouncementType } from '@/types/teacherAnnouncements';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<AnnouncementType, string> = {
  General: '#b68eff',
  Reminder: '#84a9ff',
  Event: '#5cc789',
  Urgent: '#ff7e93',
};

const STATUS_ACCENTS: Record<AnnouncementStatus, string> = {
  Published: '#5cc789',
  Draft: '#f5a623',
  Scheduled: '#84a9ff',
  Archived: '#8a9a90',
};

export function announcementTypeAccent(type: AnnouncementType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function announcementStatusAccent(status: AnnouncementStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}
