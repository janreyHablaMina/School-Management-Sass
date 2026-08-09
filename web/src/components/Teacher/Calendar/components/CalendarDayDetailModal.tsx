'use client';

import React, { useEffect, useRef } from 'react';
import { listStyles, modalStyles, useEscapeKey, useLockWorkspaceScroll } from '../../shared';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { calendarTypeAccent, countEventsByType } from '../utils';
import { CalendarDayEventCard } from './CalendarDayEventCard';
import styles from '../calendar.module.css';

interface CalendarDayDetailModalProps {
  dayLabel: string;
  events: TeacherCalendarEvent[];
  focusEventId?: string | null;
  onClose: () => void;
}

export function CalendarDayDetailModal({
  dayLabel,
  events,
  focusEventId = null,
  onClose,
}: CalendarDayDetailModalProps) {
  const focusRef = useRef<HTMLElement | null>(null);

  useLockWorkspaceScroll();
  useEscapeKey(onClose);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusEventId]);

  const summary = countEventsByType(events);

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-day-detail-title"
      onClick={onClose}
    >
      <div
        className={`${modalStyles.modalCard} ${styles.dayDetailCard}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dayDetailHeader}>
          <div>
            <p className={modalStyles.modalEyebrow}>Day details</p>
            <h2 id="calendar-day-detail-title" className={modalStyles.modalTitle}>
              {dayLabel}
            </h2>
            <p className={modalStyles.modalCopy}>
              {events.length === 0
                ? 'Nothing scheduled for this day yet.'
                : `${events.length} scheduled item${events.length === 1 ? '' : 's'} for this day.`}
            </p>
          </div>
          <button
            type="button"
            className={styles.dayDetailClose}
            onClick={onClose}
            aria-label="Close day details"
          >
            ✕
          </button>
        </div>

        {summary.length > 0 ? (
          <div className={styles.dayDetailSummary}>
            {summary.map(([type, count]) => {
              const accent = calendarTypeAccent(type);
              return (
                <span
                  key={type}
                  className={styles.dayDetailChip}
                  style={{ color: accent, borderColor: `${accent}66` }}
                >
                  {count} {type}
                </span>
              );
            })}
          </div>
        ) : null}

        <div className={styles.dayDetailList}>
          {events.length === 0 ? (
            <div className={styles.agendaEmpty}>
              Pick another day on the calendar, or add an event for this date.
            </div>
          ) : (
            events.map((event) => (
              <CalendarDayEventCard
                key={event.id}
                event={event}
                focused={focusEventId === event.id}
                cardRef={focusEventId === event.id ? focusRef : undefined}
              />
            ))
          )}
        </div>

        <div className={modalStyles.modalActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
            Close
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
