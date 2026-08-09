'use client';

import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, ResourceListPage, TeacherToast } from '../shared';
import { ContactGuardianModal } from './components/ContactGuardianModal';
import { EditStudentModal } from './components/EditStudentModal';
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
    editingStudent,
    openEdit,
    closeEdit,
    updateStudent,
    toast,
    dismissToast,
  } = useStudents({ classFocus });

  const {
    target,
    openContact,
    closeContact,
    showToast,
    toast: contactToast,
    dismissToast: dismissContactToast,
  } = useGuardianContact();

  const activeToast = contactToast ?? toast;
  const dismissActiveToast = contactToast ? dismissContactToast : dismissToast;

  if (selectedStudent) {
    return (
      <>
        <StudentDetailView
          student={selectedStudent}
          onBack={backToStudents}
          onNavigate={onNavigate}
        />
        {activeToast ? (
          <TeacherToast
            title={activeToast.title}
            message={activeToast.message}
            onClose={dismissActiveToast}
          />
        ) : null}
      </>
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
            onEdit={openEdit}
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

      {editingStudent ? (
        <EditStudentModal
          student={editingStudent}
          onCancel={closeEdit}
          onSubmit={updateStudent}
        />
      ) : null}

      {target ? (
        <ContactGuardianModal
          student={target.student}
          guardian={target.guardian}
          onClose={closeContact}
          onNotice={showToast}
        />
      ) : null}

      {activeToast ? (
        <TeacherToast
          title={activeToast.title}
          message={activeToast.message}
          onClose={dismissActiveToast}
        />
      ) : null}
    </>
  );
}
