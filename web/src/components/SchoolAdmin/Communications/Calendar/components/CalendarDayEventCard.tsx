'use client';

import React from 'react';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { eventAccent, formatEventTime } from '../utils';
import styles from '../calendar.module.css';

interface CalendarDayEventCardProps {
  event: TeacherCalendarEvent;
  focused?: boolean;
  cardRef?: React.Ref<HTMLElement>;
}

export function CalendarDayEventCard({
  event,
  focused = false,
  cardRef,
}: CalendarDayEventCardProps) {
  const accent = eventAccent(event);

  return (
    <article
      ref={cardRef}
      className={`${styles.dayDetailItem} ${focused ? styles.dayDetailItemFocused : ''}`}
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
        {formatEventTime(event)}
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
}
