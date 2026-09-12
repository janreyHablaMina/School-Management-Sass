import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { AcademicDirectoryPage } from '../shared/AcademicDirectoryPage';
import { AttendanceFilters } from './AttendanceFilters';
import { AttendanceTable } from './AttendanceTable';
import { useAttendance } from './useAttendance';

const ATTENDANCE_METRICS: Metric[] = [
  {
    title: 'Overall Attendance',
    value: '92.8%',
    subtitle: 'Across submitted sections',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Present Today',
    value: '302',
    subtitle: 'Students marked present',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Absent Today',
    value: '18',
    subtitle: 'Needs parent follow-up',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
  {
    title: 'Late Today',
    value: '10',
    subtitle: 'Arrived after bell',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Needs Review',
    value: '3',
    subtitle: 'Sections below threshold',
    iconBg: 'rgba(255, 171, 107, 0.1)',
    iconColor: '#ffab6b',
  },
];

export const AttendanceView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    currentPage,
    setCurrentPage,
    selectedAttendance,
    handleSelectAll,
    handleSelectAttendance,
    handleSort,
    sortKey,
    sortDirection,
    attendance,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useAttendance();

  return (
    <AcademicDirectoryPage
      title="Attendance"
      subtitle="Monitor daily attendance submissions and follow-up risk across sections"
      actionButton={{ label: 'Export Report', onClick: () => console.log('export attendance') }}
      metrics={ATTENDANCE_METRICS}
      metricColumns={5}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'sections',
        onPageChange: setCurrentPage,
      }}
    >
      <AttendanceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <AttendanceTable
        attendance={attendance}
        selectedAttendance={selectedAttendance}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectAttendance={handleSelectAttendance}
        onSort={handleSort}
      />
    </AcademicDirectoryPage>
  );
};
