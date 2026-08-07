import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { DeadlineItem } from '@/types/teacherPortal';

interface DeadlinesPanelProps {
  deadlines: DeadlineItem[];
}

export function DeadlinesPanel({ deadlines }: DeadlinesPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.deadlinesPanel}`}>
      <PanelHeader
        title="Upcoming Deadlines"
        right={
          <button type="button" className={styles.panelLink}>
            View all
          </button>
        }
      />
      <div className={styles.deadlineList}>
        {deadlines.map((d) => (
          <div key={d.id} className={styles.deadlineRow}>
            <div
              className={styles.deadlineDateBox}
              style={{ borderColor: `${d.color}88`, boxShadow: `0 0 0 3px ${d.color}18` }}
            >
              <span className={styles.deadlineMonth} style={{ color: d.color }}>
                {d.month}
              </span>
              <span className={styles.deadlineDay}>{d.day}</span>
            </div>
            <div className={styles.deadlineContent}>
              <div className={styles.deadlineTitleRow}>
                <p className={styles.deadlineTitle}>{d.title}</p>
                <span
                  className={styles.deadlineType}
                  style={{ color: d.color, borderColor: `${d.color}55` }}
                >
                  {d.type}
                </span>
              </div>
              <p className={styles.deadlineClass}>{d.className}</p>
              <span className={styles.deadlineDays}>{d.daysLeft}</span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.panelFooterLink}>
        View calendar ›
      </button>
    </div>
  );
}
