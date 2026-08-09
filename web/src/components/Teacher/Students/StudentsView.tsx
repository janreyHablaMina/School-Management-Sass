'use client';

import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, ResourceListPage, TeacherToast } from '../shared';
import { ContactGuardianModal } from './components/ContactGuardianModal';
import { StudentDetailView } from './components/StudentDetailView';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { useGuardianContact } from './useGuardianContact';
import { useStudents } from './useStudents';
import { toStudentClassFocus } from './utils';

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

  const {
    target,
    openContact,
    closeContact,
    showToast,
    toast,
    dismissToast,
  } = useGuardianContact();

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
    <>
      <ResourceListPage
        title="Students"
        subtitle="View and manage all students from your classes."
        headerActions={
          <>
            <button type="button" className={listStyles.secondaryBtn}>
              ⬆ Import Students
            </button>
            <button type="button" className={listStyles.primaryBtn}>
              + Add Student
            </button>
          </>
        }
        metrics={metrics}
        metricsColumns={5}
        filters={
          <StudentsFilters
            filters={filters}
            onFilterChange={setFilter}
            classes={filterOptions.classes}
            gradeLevels={filterOptions.gradeLevels}
            statuses={filterOptions.statuses}
          />
        }
        itemsCount={paginatedStudents.length}
        emptyTitle="No students found"
        emptyDescription="Try adjusting your search or filters."
        table={
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
              if (student) openContact(student);
            }}
          />
        }
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="students"
        onPageChange={setPage}
      />

      {target ? (
        <ContactGuardianModal
          student={target.student}
          guardian={target.guardian}
          onClose={closeContact}
          onNotice={showToast}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </>
  );
}
