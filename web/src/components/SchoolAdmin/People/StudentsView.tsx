import React, { useState } from 'react';
import { useStudents } from './useStudents';
import { MessageModal, MessageData } from '@/components/ui/MessageModal';
import { PageHeader } from '../shared/PageHeader';
import { MetricsGrid, Metric } from '../shared/MetricsGrid';
import layoutStyles from '../shared/layout.module.css';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { Student } from './StudentProfile/shared/types';
import { EmptyState, PaginationBar } from '@/components/Teacher/shared';
import { StudentFormModal } from '@/components/Teacher/Students/components/StudentFormModal';
import { StudentDetailView } from '@/components/Teacher/Students/components/StudentDetailView';
import { MarkInactiveModal } from '@/components/Teacher/Students/components/MarkInactiveModal';
import { ArchiveStudentModal } from '@/components/Teacher/Students/components/ArchiveStudentModal';
import { TeacherToast } from '@/components/Teacher/shared';
import type { LetterGrade, StudentStatus, TeacherStudentRow } from '@/types/teacherStudents';

const LETTER_GRADES: LetterGrade[] = ['A', 'A-', 'B+', 'B', 'C+', 'C', 'D', 'F'];

function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function gradeLevelFromSection(gradeSection: string) {
  return gradeSection.split(' - ')[0] || gradeSection || 'Grade 7';
}

function normalizeLetterGrade(letterGrade?: string): LetterGrade {
  if (letterGrade && LETTER_GRADES.includes(letterGrade as LetterGrade)) {
    return letterGrade as LetterGrade;
  }

  return letterGrade === 'A+' ? 'A' : 'C';
}

function normalizeStudentStatus(status?: string): StudentStatus {
  if (status === 'Active' || status === 'At Risk' || status === 'Inactive') {
    return status;
  }

  return 'Inactive';
}

function lrnFromStudentId(studentId: string) {
  return studentId.replace(/\D/g, '').padEnd(12, '0').slice(0, 12);
}

function toTeacherStudentRow(student: Student): TeacherStudentRow {
  const gradeLevel = gradeLevelFromSection(student.gradeSection);
  const guardianName = student.parentGuardian || 'Parent / Guardian';
  const guardianPhone = student.contact || 'Not provided';

  return {
    id: student.id,
    fullName: student.name,
    studentCode: student.studentId,
    idNumber: student.studentId,
    initials: initialsFromName(student.name) || 'ST',
    avatarAccent: student.avatarColor ?? '#f5c842',
    photoUrl: null,
    classLabel: student.gradeSection,
    subject: 'Homeroom',
    classFilter: student.gradeSection,
    gradeLevel,
    enrolledClasses: [
      {
        classLabel: student.gradeSection,
        subject: 'Homeroom',
        gradeLevel,
      },
    ],
    phone: student.contact,
    email: student.email,
    attendanceRate: student.attendanceRate ?? 0,
    averageGrade: student.averageGrade ?? 0,
    letterGrade: normalizeLetterGrade(student.letterGrade),
    status: normalizeStudentStatus(student.status),
    details: {
      gender: 'Male',
      birthDate: 'January 1, 2013',
      age: 13,
      address: 'No address on file',
      enrollmentDate: student.dateEnrolled,
      lrn: lrnFromStudentId(student.studentId),
      guardians: [
        {
          name: guardianName,
          relationship: 'Guardian',
          phone: guardianPhone,
          email: '',
          isPrimary: true,
        },
      ],
      emergencyContact: {
        name: guardianName,
        relationship: 'Guardian',
        phone: guardianPhone,
      },
      authorizedPickup: [
        {
          name: guardianName,
          relationship: 'Guardian',
          phone: guardianPhone,
        },
      ],
      allergies: 'None on file',
      medicalNotes: 'No medical notes on file.',
      teacherNotes: 'No special notes.',
    },
  };
}

export const StudentsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    selectedStudents,
    handleSelectAll,
    handleSelectStudent,
    handleSort,
    sortKey,
    sortDirection,
    sortedStudents,
    totalCount,
    atRiskCount,
    classOptions,
    gradeLevelOptions,
    subjectOptions,
    isCreateOpen,
    openCreate,
    closeCreate,
    createStudent,
    updateStudent,
    archiveStudent,
    archiveSelectedStudents,
    restoreStudent,
    restoreSelectedStudents,
    inactiveTarget,
    openMarkInactive,
    closeMarkInactive,
    confirmMarkInactive,
    bulkInactiveOpen,
    openBulkMarkInactive,
    closeBulkMarkInactive,
    confirmBulkMarkInactive,
    restoreActive,
    selectedActiveCount,
    archiveTarget,
    openArchive,
    closeArchive,
    confirmArchive,
    bulkArchiveOpen,
    openBulkArchive,
    closeBulkArchive,
    confirmBulkArchive,
    toast,
    dismissToast,
  } = useStudents();

  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<TeacherStudentRow | null>(null);
  const [editingStudent, setEditingStudent] = useState<TeacherStudentRow | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageTargetIds, setMessageTargetIds] = useState<string[]>([]);

  if (selectedStudentForDetails) {
    return (
      <StudentDetailView
        student={selectedStudentForDetails}
        onBack={() => setSelectedStudentForDetails(null)}
      />
    );
  }

  const STUDENTS_METRICS: Metric[] = [
    { title: 'Total Students', value: '1,245', subtitle: '8.6% vs last month', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
    { title: 'Male Students', value: '642', subtitle: '51.6% of total', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
    { title: 'Female Students', value: '603', subtitle: '48.4% of total', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93' },
    { title: 'New Enrollments', value: '56', subtitle: '12.0% vs last month', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b' },
    { title: 'At Risk Students', value: String(atRiskCount), subtitle: 'Needs academic follow-up', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
  ];

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader 
        title="Students" 
        subtitle="Management panel for Students" 
        actionButton={{ label: "Add Student", onClick: openCreate }} 
      />
      <MetricsGrid metrics={STUDENTS_METRICS} columns={5} />
      <StudentsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {sortedStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StudentsTable
          students={sortedStudents}
          selectedStudents={selectedStudents}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSelectAll={handleSelectAll}
          onSelectStudent={handleSelectStudent}
          onSort={handleSort}
          onViewDetails={(student) => setSelectedStudentForDetails(toTeacherStudentRow(student))}
          onEditStudent={(student) => setEditingStudent(toTeacherStudentRow(student))}
          onMessage={(ids) => {
            setMessageTargetIds(ids);
            setIsMessageModalOpen(true);
          }}
          onArchiveStudent={openArchive}
          onArchiveSelected={openBulkArchive}
          onRestoreStudent={restoreStudent}
          onRestoreSelected={restoreSelectedStudents}
          onMarkInactive={openMarkInactive}
          onRestoreActive={restoreActive}
          onBulkMarkInactive={openBulkMarkInactive}
        />
      )}
      <PaginationBar
        rangeStart={sortedStudents.length > 0 ? 1 : 0}
        rangeEnd={sortedStudents.length}
        total={totalCount}
        page={currentPage}
        totalPages={Math.max(1, Math.ceil(totalCount / 10))}
        itemLabel="students"
        onPageChange={setCurrentPage}
      />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientCount={messageTargetIds.length}
        onSend={(data: MessageData) => {
          console.log('Sending message to', messageTargetIds, data);
          setIsMessageModalOpen(false);
          // Here we would typically show a success toast
          alert(`Message sent to ${messageTargetIds.length} student(s) / parent(s)!`);
        }}
      />
      {isCreateOpen ? (
        <StudentFormModal
          mode="create"
          classes={classOptions}
          subjects={subjectOptions}
          gradeLevels={gradeLevelOptions}
          onCancel={closeCreate}
          onSubmit={createStudent}
        />
      ) : null}
      {editingStudent ? (
        <StudentFormModal
          mode="edit"
          student={editingStudent}
          classes={classOptions}
          subjects={subjectOptions}
          gradeLevels={gradeLevelOptions}
          onCancel={() => setEditingStudent(null)}
          onSubmit={(input) => {
            updateStudent(editingStudent.id, input);
            setEditingStudent(null);
          }}
        />
      ) : null}
      
      {inactiveTarget ? (
        <MarkInactiveModal
          student={inactiveTarget}
          onCancel={closeMarkInactive}
          onConfirm={confirmMarkInactive}
        />
      ) : null}

      {bulkInactiveOpen ? (
        <MarkInactiveModal
          count={selectedActiveCount}
          onCancel={closeBulkMarkInactive}
          onConfirm={confirmBulkMarkInactive}
        />
      ) : null}

      {archiveTarget ? (
        <ArchiveStudentModal
          student={toTeacherStudentRow(archiveTarget)}
          onCancel={closeArchive}
          onConfirm={confirmArchive}
        />
      ) : null}

      {bulkArchiveOpen ? (
        <ArchiveStudentModal
          count={selectedStudents.length}
          onCancel={closeBulkArchive}
          onConfirm={confirmBulkArchive}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </div>
  );
};
