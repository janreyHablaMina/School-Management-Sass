import React, { useState } from 'react';
import { useStudents } from './useStudents';
import { MessageModal, MessageData } from '@/components/ui/MessageModal';
import { PageHeader } from '../shared/PageHeader';
import { MetricsGrid, Metric } from '../shared/MetricsGrid';
import layoutStyles from '../shared/layout.module.css';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { StudentProfileView } from './StudentProfile/StudentProfileView';
import { Student } from './StudentProfile/shared/types';
import { EmptyState, PaginationBar } from '@/components/Teacher/shared';
import { StudentFormModal } from '@/components/Teacher/Students/components/StudentFormModal';

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
    archiveStudent,
    archiveSelectedStudents,
    restoreStudent,
    restoreSelectedStudents,
  } = useStudents();

  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<Student | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageTargetIds, setMessageTargetIds] = useState<string[]>([]);

  if (selectedStudentForDetails) {
    return <StudentProfileView student={selectedStudentForDetails} onBack={() => setSelectedStudentForDetails(null)} />;
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
          onViewDetails={setSelectedStudentForDetails}
          onMessage={(ids) => {
            setMessageTargetIds(ids);
            setIsMessageModalOpen(true);
          }}
          onArchiveStudent={archiveStudent}
          onArchiveSelected={archiveSelectedStudents}
          onRestoreStudent={restoreStudent}
          onRestoreSelected={restoreSelectedStudents}
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
    </div>
  );
};
