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
import { LiveSessionPanel } from './components/LiveSessionPanel';
import { StartAttendanceModal } from './components/StartAttendanceModal';
import styles from './attendance.module.css';

import type { TeacherClassFocus } from '@/lib/teacher/classFocus';

interface AttendanceViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function AttendanceView({ classFocus = null }: AttendanceViewProps) {
  const {
    metrics,
    classes,
    viewModes,
    schoolConfig,
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
    selectedYear,
    selectedMonth,
    selectDay,
    goToPrevMonth,
    goToNextMonth,
    paginatedStudents,
    totalStudents,
    selectedIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    sortKey,
    sortDirection,
    handleSort,
    markAll,
    markSelected,
    clearSelection,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    showStartModal,
    openStartModal,
    closeStartModal,
    isStartingSession,
    locationHint,
    startAttendanceSession,
    activeSession,
    remainingSeconds,
    usedFallbackLocation,
    endAttendanceSession,
    sessionActive,
  } = useAttendance({ classFocus });

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
      <AttendanceDetailHeader
        cls={selectedClass}
        onBack={backToClasses}
        sessionActive={sessionActive}
        onStartAttendance={openStartModal}
      />

      {activeSession ? (
        <LiveSessionPanel
          session={activeSession}
          remainingSeconds={remainingSeconds}
          presentCount={activeSession.checkedInStudentIds.length}
          totalStudents={totalStudents}
          usedFallbackLocation={usedFallbackLocation}
          onEndSession={endAttendanceSession}
        />
      ) : null}

      <section className={styles.contextPanel}>
        <div className={styles.contextCalendar}>
          <AttendanceCalendar
            monthLabel={calendarMonthLabel}
            year={calendarYear}
            month={calendarMonth}
            days={calendarDays}
            selectedDay={selectedDay}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onSelectDay={selectDay}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
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
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        onToggleStudent={toggleStudent}
        onToggleAllVisible={toggleAllVisible}
        onMarkSelected={markSelected}
        onClearSelection={clearSelection}
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

      {showStartModal ? (
        <StartAttendanceModal
          classLabel={selectedClass.gradeSection}
          subject={selectedClass.subject}
          config={schoolConfig}
          isStarting={isStartingSession}
          locationHint={locationHint}
          onCancel={closeStartModal}
          onStart={startAttendanceSession}
        />
      ) : null}
    </div>
  );
}
