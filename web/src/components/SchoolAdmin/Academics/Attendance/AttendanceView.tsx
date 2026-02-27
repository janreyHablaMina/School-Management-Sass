import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { EmptyState } from '@/components/ui/shared';
import { AttendanceFilters } from './AttendanceFilters';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceDetailView } from './AttendanceDetailView';
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
  const [selectedDetailId, setSelectedDetailId] = React.useState<string | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    gradeFilter,
    setGradeFilter,
    sectionFilter,
    setSectionFilter,
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
    availableGrades,
    availableSections,
  } = useAttendance();

  if (selectedDetailId) {
    return (
      <AttendanceDetailView
        attendanceId={selectedDetailId}
        onBack={() => setSelectedDetailId(null)}
      />
    );
  }

  return (
    <SchoolAdminDirectoryPage
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
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        availableGrades={availableGrades}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
        availableSections={availableSections}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      {attendance.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <AttendanceTable
          attendance={attendance}
          selectedAttendance={selectedAttendance}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSelectAll={handleSelectAll}
          onSelectAttendance={handleSelectAttendance}
          onSort={handleSort}
          onRowClick={setSelectedDetailId}
        />
      )}
    </SchoolAdminDirectoryPage>
  );
};
