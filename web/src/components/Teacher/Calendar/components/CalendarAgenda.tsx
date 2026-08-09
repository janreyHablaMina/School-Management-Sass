'use client';

import React from 'react';
import { listStyles } from '../../shared';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { calendarTypeAccent } from '../utils';
import styles from '../calendar.module.css';

interface CalendarAgendaProps {
  dayLabel: string;
  events: TeacherCalendarEvent[];
  onViewDayDetails: () => void;
  onOpenEvent: (event: TeacherCalendarEvent) => void;
}

export function CalendarAgenda({
  dayLabel,
  events,
  onViewDayDetails,
  onOpenEvent,
}: CalendarAgendaProps) {
  return (
    <aside className={styles.agendaPanel}>
      <p className={styles.agendaEyebrow}>Selected day</p>
      <h3 className={styles.agendaTitle}>{dayLabel}</h3>
      <p className={styles.agendaCount}>
        {events.length === 0
          ? 'No scheduled items'
          : `${events.length} item${events.length === 1 ? '' : 's'}`}
      </p>

      <div className={styles.agendaList}>
        {events.length === 0 ? (
          <div className={styles.agendaEmpty}>
            Pick another day or clear filters to see more schedule items.
          </div>
        ) : (
          events.map((event, index) => {
            const accent = event.accent || calendarTypeAccent(event.type);
            return (
              <button
                key={event.id}
                type="button"
                className={styles.agendaItemButton}
                onClick={() => onOpenEvent(event)}
              >
                <span className={styles.agendaTimeline} aria-hidden>
                  <span
                    className={styles.agendaDot}
                    style={{ background: accent, boxShadow: `0 0 0 3px ${accent}33` }}
                  />
                  {index < events.length - 1 ? <span className={styles.agendaLine} /> : null}
                </span>
                <span className={styles.agendaBody}>
                  <span className={styles.agendaMeta}>
                    <span className={styles.agendaTime}>
                      {event.startTime}
                      {event.endTime ? ` – ${event.endTime}` : ''}
                    </span>
                    <span
                      className={styles.agendaType}
                      style={{ color: accent, borderColor: `${accent}66` }}
                    >
                      {event.type}
                    </span>
                  </span>
                  <span className={styles.agendaItemTitle}>{event.title}</span>
                  <span className={styles.agendaClass}>{event.classLabel}</span>
                  {event.location ? (
                    <span className={styles.agendaLocation}>📍 {event.location}</span>
                  ) : null}
                </span>
              </button>
            );
          })
        )}
      </div>

      <div className={styles.agendaActions}>
        <button type="button" className={listStyles.primaryBtn} onClick={onViewDayDetails}>
          View day details
        </button>
      </div>
    </aside>
  );
}
