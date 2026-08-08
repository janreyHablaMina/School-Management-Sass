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
import { AttendanceDetailHeader } from './components/AttendanceDetailHeader';
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
      <AttendanceDetailHeader cls={selectedClass} onBack={backToClasses} />

      <section className={styles.contextPanel}>
        <div className={styles.contextCalendar}>
          <AttendanceCalendar
            monthLabel={calendarMonthLabel}
            year={calendarYear}
            month={calendarMonth}
            days={calendarDays}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>
        <DaySummary
          dateLabel={selectedDateLabel}
          summary={selectedClass.daySummary}
          attendanceRate={selectedClass.attendanceRate}
        />
      </section>

      <AttendanceControls
        selectedDateLabel={selectedDateLabel}
        viewModes={viewModes}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onMarkAll={markAll}
      />

      <AttendanceTable
        students={paginatedStudents}
        totalStudents={totalStudents}
        selectedIds={selectedIds}
        allVisibleSelected={allVisibleSelected}
        onToggleStudent={toggleStudent}
        onToggleAllVisible={toggleAllVisible}
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
  );
}
