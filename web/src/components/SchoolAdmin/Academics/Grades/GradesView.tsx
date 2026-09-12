import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { AcademicDirectoryPage } from '../shared/AcademicDirectoryPage';
import { GradesFilters } from './GradesFilters';
import { GradesTable } from './GradesTable';
import { useGrades } from './useGrades';

const GRADES_METRICS: Metric[] = [
  {
    title: 'Class Average',
    value: '82.1%',
    subtitle: 'Across active gradebooks',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Passing Rate',
    value: '81%',
    subtitle: 'Students at 75% or above',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Needs Review',
    value: '3',
    subtitle: 'Gradebooks below threshold',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
  {
    title: 'Incomplete Inputs',
    value: '14',
    subtitle: 'Missing scores or submissions',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
];

export const GradesView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    currentPage,
    setCurrentPage,
    selectedGrades,
    handleSelectAll,
    handleSelectGrade,
    handleSort,
    sortKey,
    sortDirection,
    grades,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useGrades();

  return (
    <AcademicDirectoryPage
      title="Grades"
      subtitle="Monitor gradebook completion, averages, passing rates, and at-risk sections"
      actionButton={{ label: 'Export Grades', onClick: () => console.log('export grades') }}
      metrics={GRADES_METRICS}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'gradebooks',
        onPageChange: setCurrentPage,
      }}
    >
      <GradesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <GradesTable
        grades={grades}
        selectedGrades={selectedGrades}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectGrade={handleSelectGrade}
        onSort={handleSort}
      />
    </AcademicDirectoryPage>
  );
};
