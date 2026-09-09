'use client';

import { ArrowLeft } from 'lucide-react';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';
import { ChalkBadge, listStyles, PageHeader } from '../../shared';
import { announcementStatusAccent, announcementTypeAccent } from '../utils';
import styles from '../announcements.module.css';

interface AnnouncementDetailViewProps {
  announcement: TeacherAnnouncementRow;
  onBack: () => void;
}

export function AnnouncementDetailView({
  announcement,
  onBack,
}: AnnouncementDetailViewProps) {
  return (
    <div className={listStyles.page}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Announcements
      </button>

      <PageHeader title="View Announcement" />

      <article className={styles.detailPanel}>
        <div className={styles.detailHeading}>
          <div>
            <h2>{announcement.title}</h2>
            <div className={styles.detailBadges}>
              <ChalkBadge
                label={announcement.type}
                accent={announcementTypeAccent(announcement.type)}
              />
              <ChalkBadge
                label={announcement.status}
                accent={announcementStatusAccent(announcement.status)}
              />
            </div>
          </div>
          <dl className={styles.detailFacts}>
            <div>
              <dt>Audience</dt>
              <dd>{announcement.audience}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{announcement.publishedAt}</dd>
            </div>
            <div>
              <dt>Views</dt>
              <dd>{announcement.views}</dd>
            </div>
          </dl>
        </div>

        <p className={styles.detailContent}>{announcement.description}</p>

        {announcement.imageUrl ? (
          <figure className={styles.detailImageWrap}>
            <img
              src={announcement.imageUrl}
              alt={announcement.imageName || announcement.title}
              className={styles.detailImage}
            />
            {announcement.imageName ? (
              <figcaption>{announcement.imageName}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </article>
    </div>
  );
}
