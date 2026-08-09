'use client';

import React, { useMemo } from 'react';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { buildMonthCells } from '../utils';
import styles from '../calendar.module.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

interface CalendarMonthGridProps {
  monthLabel: string;
  year: number;
  month: number;
  eventsByDay: Map<number, TeacherCalendarEvent[]>;
  selectedDay: number;
  selectedYear: number;
  selectedMonth: number;
  today: { year: number; month: number; day: number };
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarMonthGrid({
  monthLabel,
  year,
  month,
  eventsByDay,
  selectedDay,
  selectedYear,
  selectedMonth,
  today,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: CalendarMonthGridProps) {
  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);

  return (
    <section className={styles.monthPanel}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>{monthLabel}</h2>
        <div className={styles.calendarNav}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Previous month"
            onClick={onPrevMonth}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Next month"
            onClick={onNextMonth}
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <span key={day} className={styles.weekday}>
            {day}
          </span>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className={`${styles.dayCell} ${styles.dayEmpty}`} />;
          }

          const dayEvents = eventsByDay.get(day) ?? [];
          const isSelected =
            day === selectedDay && year === selectedYear && month === selectedMonth;
          const isToday =
            day === today.day && year === today.year && month === today.month;
          const visible = dayEvents.slice(0, 2);
          const extra = dayEvents.length - visible.length;

          return (
            <button
              key={day}
              type="button"
              className={`${styles.dayCell} ${isSelected ? styles.daySelected : ''} ${
                isToday ? styles.dayToday : ''
              }`}
              onClick={() => onSelectDay(day)}
            >
              <span className={styles.dayNumber}>{day}</span>
              <span className={styles.dayEvents}>
                {visible.map((event) => (
                  <span
                    key={event.id}
                    className={styles.dayEventPill}
                    style={{
                      background: `${event.accent}22`,
                      borderColor: `${event.accent}66`,
                      color: event.accent,
                    }}
                  >
                    {event.title}
                  </span>
                ))}
                {extra > 0 ? <span className={styles.dayMore}>+{extra} more</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
