'use client';

import React from 'react';
import {
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
  TeacherToast,
  useRowSelection,
} from '../shared';
import { useAttendance } from './useAttendance';
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
  const [toast, setToast] = React.useState<{ title: string; message?: string } | null>(null);
  const {
    metrics,
    classes,
    schoolConfig,
    selectedDateLabel,
    calendarMonthLabel,
    calendarYear,
    calendarMonth,
    calendarDays,
    selectedClass,
    openClass,
    backToClasses,
    selectedDay,
    selectedYear,
    selectedMonth,
    selectDay,
    goToPrevMonth,
    goToNextMonth,
    paginatedStudents,
    totalStudents,
    selectedIds: selectedStudentIds,
    toggleStudent,
    toggleAllVisible,
    allVisibleSelected,
    sortKey,
    sortDirection,
    handleSort,
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
  const classIds = classes.map((cls) => cls.id);
  const {
    selectedIds: selectedClassIds,
    allVisibleSelected: allClassesSelected,
    toggle: toggleClass,
    toggleAllVisible: toggleAllClasses,
    clearSelection: clearClassSelection,
  } = useRowSelection<string>({ visibleIds: classIds });
  const openAttendanceClass = (id: string) => {
    clearClassSelection();
    openClass(id);
  };
  const exportAttendanceReport = (count = 1) => {
    setToast({
      title: count === 1 ? 'Attendance report exported' : `${count} attendance reports exported`,
      message: 'The report is ready for download.',
    });
  };

  if (!selectedClass) {
    return (
      <div className={listStyles.page}>
        <PageHeader
          title="Attendance"
          subtitle="Choose a class or section to track and manage attendance."
        >
          <button
            type="button"
            className={listStyles.secondaryBtn}
            onClick={() => exportAttendanceReport(classes.length)}
          >
            ⬇ Export Report
          </button>
        </PageHeader>

        <SummaryMetrics metrics={metrics} columns={5} />

        <AttendanceClassGrid
          classes={classes}
          selectedIds={selectedClassIds}
          allVisibleSelected={allClassesSelected}
          onToggleClass={toggleClass}
          onToggleAllVisible={toggleAllClasses}
          onClearSelection={clearClassSelection}
          onExportSelected={() => exportAttendanceReport(selectedClassIds.length)}
          onExportClass={() => exportAttendanceReport()}
          onOpen={openAttendanceClass}
        />

        {toast ? (
          <TeacherToast
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ) : null}
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

      <AttendanceTable
        students={paginatedStudents}
        totalStudents={totalStudents}
        selectedIds={selectedStudentIds}
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
