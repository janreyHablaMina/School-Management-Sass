'use client';

import React from 'react';
import { listStyles, PageHeader, SummaryMetrics } from '../shared';
import { CalendarAgenda } from './components/CalendarAgenda';
import { CalendarDayDetailModal } from './components/CalendarDayDetailModal';
import { CalendarMonthGrid } from './components/CalendarMonthGrid';
import { calendarTypeAccent } from './utils';
import { useCalendar } from './useCalendar';
import styles from './calendar.module.css';

const LEGEND_TYPES = ['Class', 'Assignment', 'Quiz', 'Exam', 'Event', 'Reminder'] as const;

export function CalendarView() {
  const {
    metrics,
    filters,
    typeFilter,
    setTypeFilter,
    monthLabel,
    year,
    month,
    eventsByDay,
    selectedDay,
    selectedYear,
    selectedMonth,
    selectedDayLabel,
    selectedDayEvents,
    selectDay,
    openSelectedDayDetail,
    openEventDetail,
    closeDayDetail,
    isDayDetailOpen,
    focusEventId,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    today,
  } = useCalendar();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Calendar"
        subtitle="See classes, deadlines, and school events in one place."
      >
        <button type="button" className={listStyles.secondaryBtn} onClick={goToToday}>
          Today
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          + Add Event
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={4} />

      <div className={styles.filterRow} role="group" aria-label="Filter calendar by type">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filterChip} ${
              typeFilter === filter ? styles.filterChipActive : ''
            }`}
            onClick={() => setTypeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <CalendarMonthGrid
          monthLabel={monthLabel}
          year={year}
          month={month}
          eventsByDay={eventsByDay}
          selectedDay={selectedDay}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          today={today}
          onSelectDay={(day) => selectDay(day)}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />
        <CalendarAgenda
          dayLabel={selectedDayLabel}
          events={selectedDayEvents}
          onViewDayDetails={() => openSelectedDayDetail()}
          onOpenEvent={openEventDetail}
        />
      </div>

      <div className={styles.legend}>
        {LEGEND_TYPES.map((type) => (
          <span key={type} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: calendarTypeAccent(type) }}
            />
            {type}
          </span>
        ))}
      </div>

      {isDayDetailOpen ? (
        <CalendarDayDetailModal
          dayLabel={selectedDayLabel}
          events={selectedDayEvents}
          focusEventId={focusEventId}
          onClose={closeDayDetail}
        />
      ) : null}
    </div>
  );
}
