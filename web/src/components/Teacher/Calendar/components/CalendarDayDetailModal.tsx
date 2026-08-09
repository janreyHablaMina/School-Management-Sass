'use client';

import React, { useEffect, useRef } from 'react';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { calendarTypeAccent, countEventsByType } from '../utils';
import { CalendarDayEventCard } from './CalendarDayEventCard';
import styles from '../calendar.module.css';

interface CalendarDayDetailModalProps {
  dayLabel: string;
  events: TeacherCalendarEvent[];
  focusEventId?: string | null;
  onClose: () => void;
  onAddEvent: () => void;
}

export function CalendarDayDetailModal({
  dayLabel,
  events,
  focusEventId = null,
  onClose,
  onAddEvent,
}: CalendarDayDetailModalProps) {
  const focusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusEventId]);

  const summary = countEventsByType(events);
  const copy =
    events.length === 0
      ? 'Nothing scheduled for this day yet.'
      : `${events.length} scheduled item${events.length === 1 ? '' : 's'} for this day.`;

  return (
    <TeacherModal
      titleId="calendar-day-detail-title"
      eyebrow="Day details"
      title={dayLabel}
      copy={copy}
      onClose={onClose}
      showClose
      cardClassName={modalStyles.modalCardWide}
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
            Close
          </button>
          <button type="button" className={listStyles.primaryBtn} onClick={onAddEvent}>
            + Add Event
          </button>
        </>
      }
    >
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
    </TeacherModal>
  );
}
