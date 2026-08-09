'use client';

import React from 'react';
import { listStyles, PageHeader, SummaryMetrics } from '../shared';
import { CalendarAgenda } from './components/CalendarAgenda';
import { CalendarDayDetailModal } from './components/CalendarDayDetailModal';
import { CalendarLegend } from './components/CalendarLegend';
import { CalendarMonthGrid } from './components/CalendarMonthGrid';
import { CalendarTypeFilters } from './components/CalendarTypeFilters';
import { CreateEventModal } from './components/CreateEventModal';
import { useCalendar } from './useCalendar';
import styles from './calendar.module.css';

export function CalendarView() {
  const {
    metrics,
    filters,
    classroomOptions,
    typeFilter,
    setTypeFilter,
    monthLabel,
    year,
    month,
    eventsByDay,
    selectedDay,
    selectedYear,
    selectedMonth,
    selectedDateKey,
    selectedDayLabel,
    selectedDayEvents,
    selectDay,
    openDayDetail,
    openEventDetail,
    closeDayDetail,
    isDayDetailOpen,
    focusEventId,
    isCreateOpen,
    openCreate,
    closeCreate,
    createEvent,
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
        <button type="button" className={listStyles.primaryBtn} onClick={openCreate}>
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
          onViewDayDetails={openDayDetail}
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
          onAddEvent={openCreate}
        />
      ) : null}

      {isCreateOpen ? (
        <CreateEventModal
          defaultDateKey={selectedDateKey}
          classrooms={classroomOptions}
          onCancel={closeCreate}
          onCreate={createEvent}
        />
      ) : null}
    </div>
  );
}
