'use client';

import React from 'react';
import { CALENDAR_EVENT_TYPES, calendarTypeAccent } from '../utils';
import styles from '../calendar.module.css';

export function CalendarLegend() {
  return (
    <div className={styles.legend}>
      {CALENDAR_EVENT_TYPES.map((type) => (
        <span key={type} className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: calendarTypeAccent(type) }}
          />
          {type}
        </span>
      ))}
    </div>
  );
}
