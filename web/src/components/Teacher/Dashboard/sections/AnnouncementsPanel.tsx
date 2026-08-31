import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { ItemIcon } from '../components/ItemIcon';
import type { AnnouncementItem } from '@/types/teacherPortal';

interface AnnouncementsPanelProps {
  announcements: AnnouncementItem[];
  onViewAll?: () => void;
  onSelectAnnouncement?: (id: number) => void;
}

export function AnnouncementsPanel({
  announcements,
  onViewAll,
  onSelectAnnouncement,
}: AnnouncementsPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.announcementPanel} ${styles.areaAnnouncements}`}>
      <PanelHeader
        title="Recent Announcements"
        right={
          <button type="button" className={styles.panelLink} onClick={onViewAll}>
            View all
          </button>
        }
      />
      <div className={styles.announcementList}>
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={styles.announcementRow}
            onClick={() => onSelectAnnouncement?.(ann.id)}
          >
            <ItemIcon icon={ann.icon} bg={ann.iconBg} color={ann.iconColor} />
            <div className={styles.announcementContent}>
              <div className={styles.announcementTitleRow}>
                <p className={styles.announcementTitle}>{ann.title}</p>
                {ann.pinned && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.pinnedIcon}
                    title="Pinned"
                  >
                    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6h2v-6h5v-2l-2-2z"/>
                  </svg>
                )}
              </div>
              <p className={styles.announcementDesc}>{ann.desc}</p>
              <span className={styles.announcementAudience}>{ann.audience}</span>
            </div>
            <span className={styles.announcementDate}>{ann.date}</span>
          </div>
        ))}
      </div>
      <button type="button" className={styles.panelFooterLink} onClick={onViewAll}>
        View all announcements ›
      </button>
    </div>
  );
}
