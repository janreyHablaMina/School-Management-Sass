'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { ScheduleItem } from '@/types/teacherPortal';

interface SchedulePanelProps {
  schedule: ScheduleItem[];
  onViewAll?: () => void;
}

/**
 * Parses a time string like "8:00 AM" or "1:30 PM" into
 * total minutes since midnight.
 */
function parseTimeToMinutes(timeStr: string): number {
  const [timePart, meridiem] = timeStr.trim().split(' ');
  const [hourStr, minuteStr] = timePart.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minute;
}

/**
 * Returns the live status of a schedule item based on the current time
 * in the user's browser timezone.
 */
function computeStatus(time: string, endTime: string): 'done' | 'ongoing' | 'upcoming' {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();

  const localHour = parseInt(
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: tz }).format(now),
    10
  );
  const localMinute = parseInt(
    new Intl.DateTimeFormat('en-US', { minute: 'numeric', timeZone: tz }).format(now),
    10
  );
  const nowMinutes = localHour * 60 + localMinute;

  const startMinutes = parseTimeToMinutes(time);
  const endMinutes = parseTimeToMinutes(endTime);

  if (nowMinutes >= endMinutes) return 'done';
  if (nowMinutes >= startMinutes) return 'ongoing';
  return 'upcoming';
}

export function SchedulePanel({ schedule, onViewAll }: SchedulePanelProps) {
  const [now, setNow] = useState(() => new Date());

  // Re-compute every minute so statuses stay live
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.panel} ${styles.schedulePanel} ${styles.areaSchedule}`}>
      <PanelHeader
        title="Today's Schedule"
        right={<span className={styles.scheduleCount}>{schedule.length} classes</span>}
      />
      <div className={styles.scheduleList}>
        {schedule
          .map((row) => ({ ...row, computedStatus: computeStatus(row.time, row.endTime) }))
          .sort((a, b) => {
            const priority: Record<string, number> = { ongoing: 1, upcoming: 2, done: 3 };
            return priority[a.computedStatus] - priority[b.computedStatus];
          })
          .map((row) => {
            const isOngoing = row.computedStatus === 'ongoing';
            const isDone = row.computedStatus === 'done';

            return (
              <div
                key={row.id}
                className={`${styles.scheduleRow} ${isOngoing ? styles.scheduleRowActive : ''} ${isDone ? styles.scheduleRowDone : ''}`}
                onClick={() => console.log(`Navigating to class ${row.id}...`)}
              >
                <div className={styles.scheduleTimeline}>
                  <span
                    className={`${styles.scheduleDot} ${isOngoing ? styles.scheduleDotPulse : ''}`}
                    style={{
                      background: isDone ? 'rgba(240,239,237,0.2)' : row.accent,
                      boxShadow: isOngoing ? `0 0 0 3px ${row.accent}33` : 'none',
                    }}
                  />
                </div>
                <div className={styles.scheduleTimeBlock}>
                  <span className={styles.scheduleTime} style={{ opacity: isDone ? 0.45 : 1 }}>
                    {row.time}
                  </span>
                  <span className={styles.scheduleEndTime}>{row.endTime}</span>
                </div>
                <div className={styles.scheduleInfo}>
                  <p className={styles.scheduleTitle} style={{ opacity: isDone ? 0.5 : 1 }}>
                    {row.title}
                  </p>
                  <p className={styles.scheduleSubject}>{row.subject}</p>
                  <p className={styles.scheduleRoom}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '4px', verticalAlign: 'middle', opacity: 0.8 }}
                    >
                      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M9 11h.01M15 11h.01" />
                    </svg>
                    {row.room}
                  </p>
                </div>
                {isOngoing ? (
                  <span className={styles.badgeOngoing}>Ongoing</span>
                ) : isDone ? (
                  <span className={styles.badgeDone}>Done</span>
                ) : (
                  <span className={styles.badgeUpcoming}>Upcoming</span>
                )}
              </div>
            );
          })}
      </div>
      <button type="button" className={styles.panelFooterLink} onClick={onViewAll}>
        View full schedule ›
      </button>
    </div>
  );
}
