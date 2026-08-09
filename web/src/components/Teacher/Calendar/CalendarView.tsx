'use client';

import React from 'react';
import { listStyles, PageHeader, SummaryMetrics } from '../shared';
import { CalendarAgenda } from './components/CalendarAgenda';
import { CalendarDayDetailModal } from './components/CalendarDayDetailModal';
import { CalendarLegend } from './components/CalendarLegend';
import { CalendarMonthGrid } from './components/CalendarMonthGrid';
import { CalendarTypeFilters } from './components/CalendarTypeFilters';
import { useCalendar } from './useCalendar';
import styles from './calendar.module.css';

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

      <CalendarTypeFilters
        filters={filters}
        value={typeFilter}
        onChange={setTypeFilter}
      />

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
          onSelectDay={selectDay}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />
        <CalendarAgenda
          dayLabel={selectedDayLabel}
          events={selectedDayEvents}
          onViewDayDetails={openSelectedDayDetail}
          onOpenEvent={openEventDetail}
        />
      </div>

      <CalendarLegend />

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
