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
  // Temporary override for design showcase:
  if (time.includes('8:00')) return 'ongoing';
  return 'upcoming';
}

/** Map subject keywords to emoji icons */
function getSubjectIcon(subject: string): string {
  const s = subject.toLowerCase();
  if (s.includes('math')) return '📐';
  if (s.includes('science')) return '🔬';
  if (s.includes('information') || s.includes('ict') || s.includes('computer')) return '💻';
  if (s.includes('english')) return '📝';
  if (s.includes('history') || s.includes('social')) return '🌍';
  if (s.includes('art') || s.includes('music')) return '🎨';
  if (s.includes('physical') || s.includes('pe') || s.includes('sport')) return '⚽';
  return '📚';
}

export function SchedulePanel({ schedule, onViewAll }: SchedulePanelProps) {
  const [now, setNow] = useState(() => new Date());

  // Re-compute every minute so statuses stay live
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.panel} ${styles.schedulePanel}`}>
      <PanelHeader
        title="Today's Schedule"
        right={<span className={styles.scheduleCount}>{schedule.length} classes</span>}
      />
      <div className={styles.scheduleListColorful}>
        {schedule
          .map((row) => ({ ...row, computedStatus: computeStatus(row.time, row.endTime) }))
          .sort((a, b) => {
            const priority: Record<string, number> = { ongoing: 1, upcoming: 2, done: 3 };
            return priority[a.computedStatus] - priority[b.computedStatus];
          })
          .slice(0, 3)
          .map((row) => {
            const isOngoing = row.computedStatus === 'ongoing';
            const isDone = row.computedStatus === 'done';
            const icon = getSubjectIcon(row.subject);

            return (
              <div
                key={row.id}
                className={`${styles.scheduleRowColorful} ${isOngoing ? styles.scheduleRowColorfulActive : ''} ${isDone ? styles.scheduleRowColorfulDone : ''}`}
                style={{
                  borderColor: isOngoing ? `${row.accent}55` : undefined,
                }}
                onClick={() => console.log(`Navigating to class ${row.id}...`)}
              >
                {/* Accent stripe */}
                <div
                  className={styles.scheduleColorfulAccent}
                  style={{ background: row.accent }}
                />

                {/* Body: icon + info */}
                <div className={styles.scheduleColorfulBody}>
                  <div
                    className={styles.scheduleColorfulIcon}
                    style={{
                      background: `${row.accent}18`,
                      borderColor: `${row.accent}30`,
                    }}
                  >
                    {icon}
                  </div>
                  <div className={styles.scheduleColorfulInfo}>
                    <div className={styles.scheduleColorfulTitle}>
                      {row.title}
                    </div>
                    <div className={styles.scheduleColorfulMeta}>
                      <span style={{ color: row.accent, fontWeight: 600 }}>{row.subject}</span>
                      <span className={styles.metaDividerColorful}>•</span>
                      <span>{row.room}</span>
                    </div>
                  </div>
                </div>

                {/* Right: time range + badge */}
                <div className={styles.scheduleColorfulEnd}>
                  <span className={styles.scheduleColorfulTimeRange}>
                    {row.time}
                  </span>
                  {isOngoing ? (
                    <span
                      className={styles.badgeColorfulOngoing}
                      style={{ background: row.accent }}
                    >
                      <span className={styles.liveDot} />
                      LIVE
                    </span>
                  ) : (
                    <span className={styles.scheduleColorfulEndTime}>
                      ends {row.endTime}
                    </span>
                  )}
                </div>
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
