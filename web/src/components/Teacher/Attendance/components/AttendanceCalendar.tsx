'use client';

import React, { useMemo } from 'react';
import type { AttendanceDayMark } from '@/types/teacherAttendance';
import { attendanceStatusAccent } from '../utils';
import styles from '../attendance.module.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

interface AttendanceCalendarProps {
  monthLabel: string;
  year: number;
  month: number;
  days: AttendanceDayMark[];
  selectedDay: number;
  selectedYear: number;
  selectedMonth: number;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function AttendanceCalendar({
  monthLabel,
  year,
  month,
  days,
  selectedDay,
  selectedYear,
  selectedMonth,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: AttendanceCalendarProps) {
  const marksByDay = useMemo(() => {
    const map = new Map<number, AttendanceDayMark['marks']>();
    days.forEach((entry) => map.set(entry.day, entry.marks));
    return map;
  }, [days]);

  const cells = useMemo(() => {
    const firstWeekday = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const result: Array<number | null> = [];

    for (let i = 0; i < firstWeekday; i += 1) result.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) result.push(day);
    return result;
  }, [year, month]);

  return (
    <div>
      <div className={styles.calendarHeader}>
        <h3 className={styles.calendarTitle}>{monthLabel}</h3>
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

          const marks = marksByDay.get(day) ?? [];
          const isSelected =
            day === selectedDay && year === selectedYear && month === selectedMonth;

          return (
            <button
              key={day}
              type="button"
              className={`${styles.dayCell} ${isSelected ? styles.daySelected : ''}`}
              onClick={() => onSelectDay(day)}
            >
              <span>{day}</span>
              <span className={styles.dayDots}>
                {marks.slice(0, 3).map((mark) => (
                  <span
                    key={`${day}-${mark}`}
                    className={styles.dayDot}
                    style={{ background: attendanceStatusAccent(mark) }}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
