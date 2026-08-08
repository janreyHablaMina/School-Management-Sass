'use client';

import React from 'react';
import {
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useAttendance } from './useAttendance';
import { AttendanceControls } from './AttendanceControls';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceCalendar } from './components/AttendanceCalendar';
import { AttendanceClassGrid } from './components/AttendanceClassGrid';
import { DaySummary } from './components/DaySummary';
import styles from './attendance.module.css';

export function AttendanceView() {
  const {
    metrics,
    classes,
    viewModes,
    selectedDateLabel,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    selectedClass,
    openClass,
    backToClasses,
    viewMode,
    setViewMode,
    selectedDay,
    setSelectedDay,
    paginatedStudents,
    totalStudents,
    selectedIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    markAll,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useAttendance();

  if (!selectedClass) {
    return (
      <div className={listStyles.page}>
        <PageHeader
          title="Attendance"
          subtitle="Choose a class or section to track and manage attendance."
        >
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export Report
          </button>
        </PageHeader>

        <SummaryMetrics metrics={metrics} columns={5} />

        <AttendanceClassGrid classes={classes} onOpen={openClass} />
      </div>
    );
  }

  return (
    <div className={listStyles.page}>
      <PageHeader
        title={selectedClass.subject}
        subtitle={`${selectedClass.gradeSection} · ${selectedClass.room}`}
      >
        <button type="button" className={listStyles.secondaryBtn} onClick={backToClasses}>
          ← Back to Classes
        </button>
        <button type="button" className={listStyles.secondaryBtn}>
          ⬇ Export Report
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          ✓ Take Attendance
        </button>
      </PageHeader>

      <AttendanceControls
        selectedDateLabel={selectedDateLabel}
        viewModes={viewModes}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className={styles.layout}>
        <aside className={styles.sidePanel}>
          <AttendanceCalendar
            monthLabel={calendarMonthLabel}
            year={calendarYear}
            month={calendarMonth}
            days={calendarDays}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          <DaySummary dateLabel={selectedDateLabel} summary={selectedClass.daySummary} />
        </aside>

        <div>
          <AttendanceTable
            students={paginatedStudents}
            totalStudents={totalStudents}
            selectedIds={selectedIds}
            allVisibleSelected={allVisibleSelected}
            onToggleStudent={toggleStudent}
            onToggleAllVisible={toggleAllVisible}
            onMarkAll={markAll}
          />
          <PaginationBar
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={totalStudents}
            page={page}
            totalPages={totalPages}
            itemLabel="students"
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
