'use client';

import { useEffect, useState } from 'react';
import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
  TeacherToast,
} from '../shared';
import { ContactGuardianModal } from './components/ContactGuardianModal';
import { StudentDetailView } from './components/StudentDetailView';
import { useStudents } from './useStudents';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import {
  openGuardianChannel,
  primaryGuardian,
  toStudentClassFocus,
} from './utils';

interface StudentsViewProps {
  classFocus?: TeacherClassFocus | null;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function StudentsView({
  classFocus = null,
  onNavigate,
}: StudentsViewProps) {
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedStudents,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    selectedStudent,
    openStudent,
    backToStudents,
  } = useStudents({ classFocus });

  const [contactTarget, setContactTarget] = useState<{
    student: TeacherStudentRow;
    guardian: StudentGuardian;
  } | null>(null);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (selectedStudent) {
    return (
      <StudentDetailView
        student={selectedStudent}
        onBack={backToStudents}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Students"
        subtitle="View and manage all students from your classes."
      >
        <button type="button" className={listStyles.secondaryBtn}>
          ⬆ Import Students
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          + Add Student
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={5} />

      <StudentsFilters
        filters={filters}
        onFilterChange={setFilter}
        classes={filterOptions.classes}
        gradeLevels={filterOptions.gradeLevels}
        statuses={filterOptions.statuses}
      />

      {paginatedStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StudentsTable
          students={paginatedStudents}
          onOpen={openStudent}
          onViewGrades={(id) => {
            const student = paginatedStudents.find((item) => item.id === id);
            if (!student) return;
            onNavigate?.({ tab: 'Grades', classFocus: toStudentClassFocus(student) });
          }}
          onMessage={(id) => {
            const student = paginatedStudents.find((item) => item.id === id);
            if (!student) return;
            const guardian = primaryGuardian(student);
            if (!guardian) return;
            setContactTarget({ student, guardian });
          }}
        />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="students"
        onPageChange={setPage}
      />

      {contactTarget ? (
        <ContactGuardianModal
          student={contactTarget.student}
          guardian={contactTarget.guardian}
          onClose={() => setContactTarget(null)}
          onAppMessage={(guardian) => {
            const notice = openGuardianChannel(
              'app',
              contactTarget.student,
              guardian,
            );
            if (notice) setToast(notice);
          }}
        />
      ) : null}

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
