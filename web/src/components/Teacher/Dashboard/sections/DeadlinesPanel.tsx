import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { DeadlineItem } from '@/types/teacherPortal';

interface DeadlinesPanelProps {
  deadlines: DeadlineItem[];
  onViewAll?: () => void;
  onSelectDeadline?: (id: number) => void;
  onViewCalendar?: () => void;
}

export function DeadlinesPanel({
  deadlines,
  onViewAll,
  onSelectDeadline,
  onViewCalendar,
}: DeadlinesPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.deadlinesPanel}`}>
      <PanelHeader
        title="Upcoming Deadlines"
      />
      <div className={styles.deadlineList}>
        {deadlines.slice(0, 3).map((d) => (
          <div
            key={d.id}
            className={styles.deadlineRow}
            onClick={() => onSelectDeadline?.(d.id)}
          >
            <div
              className={styles.deadlineDateBox}
              style={{ borderColor: `${d.color}88` }}
            >
              <span className={styles.deadlineMonth} style={{ color: d.color }}>
                {d.month}
              </span>
              <span className={styles.deadlineDay}>{d.day}</span>
            </div>
            <div className={styles.deadlineContent}>
              <div className={styles.deadlineTitleRow}>
                <p className={styles.deadlineTitle}>{d.title}</p>
              </div>
              <p className={styles.deadlineClass}>{d.className}</p>
              <span className={styles.deadlineDays}>{d.daysLeft}</span>
            </div>
            <span
              className={styles.deadlineType}
              style={{ color: d.color, borderColor: `${d.color}55` }}
            >
              {d.type}
            </span>
          </div>
        ))}
      </div>
      <button type="button" className={styles.panelFooterLink} onClick={onViewCalendar}>
        View calendar ›
      </button>
    </div>
  );
}
