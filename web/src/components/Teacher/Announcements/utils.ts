import type {
  AnnouncementStatus,
  AnnouncementType,
  CreateAnnouncementInput,
  TeacherAnnouncementRow,
} from '@/types/teacherAnnouncements';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<AnnouncementType, string> = {
  General: '#b68eff',
  Reminder: '#84a9ff',
  Event: '#5cc789',
  Urgent: '#ff7e93',
};

const TYPE_ICONS: Record<AnnouncementType, string> = {
  General: '📢',
  Reminder: '📋',
  Event: '🗓️',
  Urgent: '🚨',
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

function formatAudience(input: CreateAnnouncementInput): string {
  const parts: string[] = [];

  if (input.allClasses) {
    parts.push('All Classes');
  } else if (input.classrooms.length === 1) {
    parts.push(input.classrooms[0]);
  } else if (input.classrooms.length > 1) {
    parts.push(`${input.classrooms.length} classes`);
  }

  if (input.includeParents) {
    parts.push('Parents');
  }

  return parts.join(', ') || 'Unassigned';
}

function formatDisplayDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function toSortKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function buildAnnouncementFromInput(
  input: CreateAnnouncementInput,
  id: string,
): TeacherAnnouncementRow {
  const now = new Date();
  const scheduled =
    input.publishMode === 'schedule' && input.scheduledAt
      ? new Date(`${input.scheduledAt}T12:00:00`)
      : null;

  let status: AnnouncementStatus = 'Draft';
  let publishedAt = '—';

  if (input.publishMode === 'publish') {
    status = 'Published';
    publishedAt = formatDisplayDate(now);
  } else if (input.publishMode === 'schedule' && scheduled && !Number.isNaN(scheduled.getTime())) {
    status = 'Scheduled';
    publishedAt = formatDisplayDate(scheduled);
  }

  return {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    audience: formatAudience(input),
    type: input.type,
    status,
    pinned: input.pinned,
    publishedAt,
    createdSortKey: toSortKey(now),
    views: 0,
    icon: TYPE_ICONS[input.type],
    accent: announcementTypeAccent(input.type),
  };
}
