import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { AcademicDirectoryPage } from '../shared/AcademicDirectoryPage';
import { AssignmentsFilters } from './AssignmentsFilters';
import { AssignmentsTable } from './AssignmentsTable';
import { useAssignments } from './useAssignments';

const ASSIGNMENTS_METRICS: Metric[] = [
  {
    title: 'Total Assignments',
    value: '128',
    subtitle: 'Across all sections',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Active Assignments',
    value: '86',
    subtitle: 'Currently open',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Due Soon',
    value: '18',
    subtitle: 'Due within 3 days',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Low Submission',
    value: '9',
    subtitle: 'Needs teacher follow-up',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const AssignmentsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    currentPage,
    setCurrentPage,
    selectedAssignments,
    handleSelectAll,
    handleSelectAssignment,
    handleSort,
    sortKey,
    sortDirection,
    assignments,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useAssignments();

  return (
    <AcademicDirectoryPage
      title="Assignments"
      subtitle="Track assignment publishing, due dates, submissions, and grading progress"
      actionButton={{ label: 'Create Assignment', onClick: () => console.log('create assignment') }}
      metrics={ASSIGNMENTS_METRICS}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'assignments',
        onPageChange: setCurrentPage,
      }}
    >
      <AssignmentsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <AssignmentsTable
        assignments={assignments}
        selectedAssignments={selectedAssignments}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectAssignment={handleSelectAssignment}
        onSort={handleSort}
      />
    </AcademicDirectoryPage>
  );
};
