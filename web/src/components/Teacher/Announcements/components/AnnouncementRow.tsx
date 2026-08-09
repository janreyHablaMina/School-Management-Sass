'use client';

import React from 'react';
import {
  ChalkBadge,
  ResourceTitle,
  RowActionsMenu,
  listStyles,
} from '../../shared';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';
import { announcementStatusAccent, announcementTypeAccent } from '../utils';
import styles from '../announcements.module.css';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Announcement' },
  { icon: '✎', label: 'Edit Announcement' },
  { icon: '📌', label: 'Toggle Pin' },
  { icon: '📋', label: 'Duplicate' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive' },
  { icon: '🗑', label: 'Delete' },
] as const;

interface AnnouncementRowProps {
  announcement: TeacherAnnouncementRow;
}

export function AnnouncementRow({ announcement }: AnnouncementRowProps) {
  return (
    <tr>
      <td>
        <div className={styles.titleCell}>
          <ResourceTitle
            icon={announcement.icon}
            accent={announcement.accent}
            title={announcement.title}
            description={announcement.description}
          />
          {announcement.pinned ? <span className={styles.pinBadge}>Pinned</span> : null}
        </div>
      </td>
      <td>
        <span className={styles.audienceText}>{announcement.audience}</span>
      </td>
      <td>
        <ChalkBadge
          label={announcement.type}
          accent={announcementTypeAccent(announcement.type)}
        />
      </td>
      <td>
        <ChalkBadge
          label={announcement.status}
          accent={announcementStatusAccent(announcement.status)}
        />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{announcement.publishedAt}</p>
          <p className={listStyles.stackMetaSecondary}>{announcement.views} views</p>
        </div>
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${announcement.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
