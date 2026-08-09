'use client';

import React from 'react';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { calendarTypeAccent } from '../utils';
import styles from '../calendar.module.css';

interface CalendarAgendaProps {
  dayLabel: string;
  events: TeacherCalendarEvent[];
}

export function CalendarAgenda({ dayLabel, events }: CalendarAgendaProps) {
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
              <article key={event.id} className={styles.agendaItem}>
                <div className={styles.agendaTimeline}>
                  <span
                    className={styles.agendaDot}
                    style={{ background: accent, boxShadow: `0 0 0 3px ${accent}33` }}
                  />
                  {index < events.length - 1 ? <span className={styles.agendaLine} /> : null}
                </div>
                <div className={styles.agendaBody}>
                  <div className={styles.agendaMeta}>
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
                  </div>
                  <h4 className={styles.agendaItemTitle}>{event.title}</h4>
                  <p className={styles.agendaClass}>{event.classLabel}</p>
                  {event.location ? (
                    <p className={styles.agendaLocation}>📍 {event.location}</p>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </div>
    </aside>
  );
}
