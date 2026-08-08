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
import { DaySummary } from './components/DaySummary';
import styles from './attendance.module.css';

export function AttendanceView() {
  const {
    metrics,
    classOptions,
    viewModes,
    selectedDateLabel,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    daySummary,
    classId,
    setClassId,
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

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Attendance"
        subtitle="Track and manage student attendance."
      >
        <button type="button" className={listStyles.secondaryBtn}>
          ⬇ Export Report
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          ✓ Take Attendance
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={5} />

      <AttendanceControls
        classOptions={classOptions}
        classId={classId}
        onClassChange={setClassId}
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
          <DaySummary dateLabel={selectedDateLabel} summary={daySummary} />
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
