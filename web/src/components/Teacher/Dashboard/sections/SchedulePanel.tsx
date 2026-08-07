import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { ScheduleItem } from '@/types/teacherPortal';

interface SchedulePanelProps {
  schedule: ScheduleItem[];
}

export function SchedulePanel({ schedule }: SchedulePanelProps) {
  return (
    <div className={`${styles.panel} ${styles.schedulePanel} ${styles.areaSchedule}`}>
      <PanelHeader
        title="Today's Schedule"
        right={<span className={styles.scheduleCount}>{schedule.length} classes</span>}
      />
      <div className={styles.scheduleList}>
        {schedule.map((row, index) => (
          <div
            key={row.id}
            className={`${styles.scheduleRow} ${row.status === 'ongoing' ? styles.scheduleRowActive : ''}`}
          >
            <div className={styles.scheduleTimeline}>
              <span
                className={`${styles.scheduleDot} ${row.status === 'ongoing' ? styles.scheduleDotPulse : ''}`}
                style={{ background: row.accent, boxShadow: `0 0 0 3px ${row.accent}33` }}
              />
              {index < schedule.length - 1 && <span className={styles.scheduleLine} />}
            </div>
            <div className={styles.scheduleTimeBlock}>
              <span className={styles.scheduleTime}>{row.time}</span>
              <span className={styles.scheduleEndTime}>{row.endTime}</span>
            </div>
            <div className={styles.scheduleInfo}>
              <p className={styles.scheduleTitle}>{row.title}</p>
              <p className={styles.scheduleSubject}>{row.subject}</p>
              <p className={styles.scheduleRoom}>📍 {row.room}</p>
            </div>
            {row.status === 'ongoing' ? (
              <span className={styles.badgeOngoing}>Ongoing</span>
            ) : (
              <button type="button" className={styles.btnStartClass}>
                Start
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" className={styles.panelFooterLink}>
        View full schedule ›
      </button>
    </div>
  );
}
