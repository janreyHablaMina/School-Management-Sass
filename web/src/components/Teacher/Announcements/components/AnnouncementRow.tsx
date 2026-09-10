'use client';

import {
  ChalkBadge,
  ResourceTitle,
  RowActionsMenu,
  RowSelectCell,
  listStyles,
} from '../../shared';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';
import { announcementStatusAccent, announcementTypeAccent } from '../utils';
import styles from '../announcements.module.css';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Announcement' },
  { icon: '✎', label: 'Edit Announcement' },
  { icon: '📋', label: 'Duplicate' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive' },
  { icon: '🗑', label: 'Delete' },
] as const;

interface AnnouncementRowProps {
  announcement: TeacherAnnouncementRow;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onView: (announcement: TeacherAnnouncementRow) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AnnouncementRow({
  announcement,
  selected,
  onToggleSelect,
  onView,
  onDuplicate,
  onArchive,
  onDelete,
}: AnnouncementRowProps) {
  const dateLabel =
    announcement.status === 'Scheduled' && announcement.scheduledFor
      ? announcement.scheduledFor
      : announcement.publishedAt;
  const dateMeta =
    announcement.status === 'Scheduled' && announcement.scheduledFor
      ? 'Scheduled send'
      : `${announcement.views} views`;

  return (
    <tr className={selected ? listStyles.rowSelected : undefined}>
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggleSelect(announcement.id)}
        label={`Select ${announcement.title}`}
      />
      <td>
        <div className={styles.titleCell}>
          <ResourceTitle
            title={announcement.title}
            footer={
              <div className={styles.titleBadges}>
                <ChalkBadge
                  label={announcement.type}
                  accent={announcementTypeAccent(announcement.type)}
                />
                {announcement.imageUrl ? (
                  <ChalkBadge label="Image" accent="#84a9ff" />
                ) : null}
              </div>
            }
          />
        </div>
      </td>
      <td>
        <span className={styles.audienceText}>{announcement.audience}</span>
      </td>
      <td>
        <ChalkBadge
          label={announcement.status}
          accent={announcementStatusAccent(announcement.status)}
        />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{dateLabel}</p>
          <p className={listStyles.stackMetaSecondary}>{dateMeta}</p>
        </div>
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${announcement.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
          onAction={(actionLabel) => {
            if (actionLabel === 'View Announcement') onView(announcement);
            if (actionLabel === 'Duplicate') onDuplicate(announcement.id);
            if (actionLabel === 'Archive') onArchive(announcement.id);
            if (actionLabel === 'Delete') onDelete(announcement.id);
          }}
        />
      </td>
    </tr>
  );
}
