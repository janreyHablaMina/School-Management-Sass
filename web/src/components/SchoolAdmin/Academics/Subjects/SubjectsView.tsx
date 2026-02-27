import React, { useState } from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { EmptyState, ConfirmActionModal, TeacherToast } from '@/components/ui/shared';
import { SubjectsFilters } from './SubjectsFilters';
import { SubjectsTable } from './SubjectsTable';
import { SubjectProfileView } from './SubjectProfileView';
import { useSubjects } from './useSubjects';

const SUBJECTS_METRICS: Metric[] = [
  {
    title: 'Total Subjects',
    value: '36',
    subtitle: 'Across all grade levels',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Active Subjects',
    value: '32',
    subtitle: 'Available this school year',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Needs Teacher',
    value: '3',
    subtitle: 'Teacher assignment pending',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Draft Subjects',
    value: '1',
    subtitle: 'Not yet published',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const SubjectsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    gradeFilter,
    setGradeFilter,
    departments,
    grades,
    currentPage,
    setCurrentPage,
    selectedSubjects,
    handleSelectAll,
    handleSelectSubject,
    handleSort,
    sortKey,
    sortDirection,
    subjects,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
    archiveSubject,
    archiveSelectedSubjects,
    toast,
    dismissToast,
  } = useSubjects();

  const [actionModal, setActionModal] = useState<{
    id?: string;
    ids?: string[];
    title: string;
    itemLabel: string;
    count: number;
    actionType: 'archive' | 'delete' | 'deactivate';
    onConfirm: () => void;
  } | null>(null);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  
  if (selectedSubjectId) {
    const subject = subjects.find(s => s.id === selectedSubjectId);
    if (subject) {
      return (
        <SubjectProfileView 
          subject={subject} 
          onBack={() => setSelectedSubjectId(null)} 
        />
      );
    }
  }

  return (
    <SchoolAdminDirectoryPage
      title="Subjects"
      subtitle="Manage curriculum subjects, departments, teachers, and section coverage"
      actionButton={{ label: 'Add Subject', onClick: () => console.log('add subject') }}
      metrics={SUBJECTS_METRICS}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'subjects',
        onPageChange: setCurrentPage,
      }}
    >
      <SubjectsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        departments={departments}
        grades={grades}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      {subjects.length === 0 ? (
        <EmptyState
          title="No subjects found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <SubjectsTable
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSelectAll={handleSelectAll}
          onSelectSubject={handleSelectSubject}
          onSort={handleSort}
          onViewSubject={(subject) => setSelectedSubjectId(subject.id)}
          onArchive={(ids) => {
            setActionModal({
              ids,
              title: ids.length === 1 ? 'Archive Subject' : 'Archive Subjects',
              itemLabel: 'subject',
              count: ids.length,
              actionType: 'archive',
              onConfirm: () => {
                if (ids.length === 1) archiveSubject(ids[0]);
                else archiveSelectedSubjects();
                setActionModal(null);
              },
            });
          }}
        />
      )}
      {actionModal && (
        <ConfirmActionModal
          title={actionModal.title}
          itemLabel={actionModal.itemLabel}
          count={actionModal.count}
          actionType={actionModal.actionType}
          onCancel={() => setActionModal(null)}
          onConfirm={actionModal.onConfirm}
        />
      )}
      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </SchoolAdminDirectoryPage>
  );
};
