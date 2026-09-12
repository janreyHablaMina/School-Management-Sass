import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { AcademicDirectoryPage } from '../shared/AcademicDirectoryPage';
import { SubjectsFilters } from './SubjectsFilters';
import { SubjectsTable } from './SubjectsTable';
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
    departments,
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
  } = useSubjects();

  return (
    <AcademicDirectoryPage
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
        departments={departments}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <SubjectsTable
        subjects={subjects}
        selectedSubjects={selectedSubjects}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectSubject={handleSelectSubject}
        onSort={handleSort}
      />
    </AcademicDirectoryPage>
  );
};
