import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { ItemIcon } from '../components/ItemIcon';
import type { AnnouncementItem } from '@/types/teacherPortal';

interface AnnouncementsPanelProps {
  announcements: AnnouncementItem[];
}

export function AnnouncementsPanel({ announcements }: AnnouncementsPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.announcementPanel} ${styles.areaAnnouncements}`}>
      <PanelHeader
        title="Recent Announcements"
        right={
          <button type="button" className={styles.panelLink}>
            View all
          </button>
        }
      />
      <div className={styles.announcementList}>
        {announcements.map((ann) => (
          <div key={ann.id} className={styles.announcementRow}>
            <ItemIcon icon={ann.icon} bg={ann.iconBg} color={ann.iconColor} />
            <div className={styles.announcementContent}>
              <div className={styles.announcementTitleRow}>
                <p className={styles.announcementTitle}>{ann.title}</p>
                {ann.pinned && <span className={styles.pinnedBadge}>Pinned</span>}
              </div>
              <p className={styles.announcementDesc}>{ann.desc}</p>
              <span className={styles.announcementAudience}>{ann.audience}</span>
            </div>
            <span className={styles.announcementDate}>{ann.date}</span>
          </div>
        ))}
      </div>
      <button type="button" className={styles.composeBtn}>
        + New Announcement
      </button>
    </div>
  );
}
