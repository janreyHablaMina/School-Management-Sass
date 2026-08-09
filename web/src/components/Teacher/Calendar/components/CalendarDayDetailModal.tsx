'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { listStyles, modalStyles, useLockWorkspaceScroll } from '../../shared';
import type { CalendarEventType, TeacherCalendarEvent } from '@/types/teacherCalendar';
import { calendarTypeAccent } from '../utils';
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusEventId]);

  const summary = useMemo(() => {
    const counts = events.reduce<Partial<Record<CalendarEventType, number>>>((acc, item) => {
      acc[item.type] = (acc[item.type] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts) as Array<[CalendarEventType, number]>;
  }, [events]);

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
            events.map((event) => {
              const accent = event.accent || calendarTypeAccent(event.type);
              const isFocused = focusEventId === event.id;
              return (
                <article
                  key={event.id}
                  ref={isFocused ? focusRef : undefined}
                  className={`${styles.dayDetailItem} ${
                    isFocused ? styles.dayDetailItemFocused : ''
                  }`}
                  style={{ borderColor: `${accent}55` }}
                >
                  <div className={styles.dayDetailItemTop}>
                    <span
                      className={styles.agendaType}
                      style={{ color: accent, borderColor: `${accent}66` }}
                    >
                      {event.type}
                    </span>
                    <span
                      className={styles.dayDetailStatus}
                      style={{ color: accent, background: `${accent}18` }}
                    >
                      {event.status}
                    </span>
                  </div>

                  <h3 className={styles.dayDetailItemTitle}>{event.title}</h3>
                  <p className={styles.dayDetailItemTime}>
                    {event.startTime}
                    {event.endTime ? ` – ${event.endTime}` : ''}
                    {event.location ? ` · ${event.location}` : ''}
                  </p>
                  <p className={styles.dayDetailItemClass}>{event.classLabel}</p>
                  <p className={styles.dayDetailItemDesc}>{event.description}</p>
                  {event.notes ? (
                    <p className={styles.dayDetailNotes}>
                      <span>Note:</span> {event.notes}
                    </p>
                  ) : null}
                </article>
              );
            })
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
