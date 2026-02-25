'use client';

import React from 'react';
import { DatePicker } from '@/components/ui/DatePicker';
import { TimePicker } from '@/components/ui/TimePicker';
import { listStyles, modalStyles } from '@/components/ui/shared';
import type { AnnouncementPublishMode } from '@/types/teacherAnnouncements';
import styles from '../../announcements.module.css';

export const PUBLISH_MODES: Array<{ value: AnnouncementPublishMode; label: string }> = [
  { value: 'publish', label: 'Publish now' },
  { value: 'draft', label: 'Save draft' },
  { value: 'schedule', label: 'Auto-send later' },
];

interface DeliveryStepProps {
  publishMode: AnnouncementPublishMode;
  setPublishMode: (value: AnnouncementPublishMode) => void;
  scheduledAt: string;
  setScheduledAt: (value: string) => void;
  scheduledTime: string;
  setScheduledTime: (value: string) => void;
  minScheduleDate: string;
  pinned: boolean;
  setPinned: (value: boolean) => void;
}

export function DeliveryStep({
  publishMode,
  setPublishMode,
  scheduledAt,
  setScheduledAt,
  scheduledTime,
  setScheduledTime,
  minScheduleDate,
  pinned,
  setPinned,
}: DeliveryStepProps) {
  return (
    <>
      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>When to send</span>
        <div className={styles.deliveryGrid}>
          {PUBLISH_MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              className={`${styles.deliveryOption} ${publishMode === mode.value ? styles.deliveryOptionActive : ''}`}
              onClick={() => setPublishMode(mode.value)}
            >
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {publishMode === 'schedule' ? (
        <div className={styles.schedulePanel}>
          <div>
            <span className={styles.scheduleEyebrow}>Auto-send</span>
            <p className={styles.scheduleCopy}>
              The announcement will stay scheduled until this date and time.
            </p>
          </div>
          <div className={styles.scheduleGrid}>
            <label className={`${modalStyles.modalField} ${styles.scheduleField}`}>
              <span className={modalStyles.modalLabel}>Send date</span>
              <DatePicker value={scheduledAt} minDate={minScheduleDate} onChange={setScheduledAt} />
            </label>
            <label className={`${modalStyles.modalField} ${styles.scheduleField}`}>
              <span className={modalStyles.modalLabel}>Send time</span>
              <TimePicker value={scheduledTime} onChange={setScheduledTime} />
            </label>
          </div>
        </div>
      ) : null}

      <label className={styles.checkRow}>
        <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
        <span>Pin this announcement to the top</span>
      </label>
    </>
  );
}

