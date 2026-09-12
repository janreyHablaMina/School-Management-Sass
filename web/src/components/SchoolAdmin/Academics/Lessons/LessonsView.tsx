import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { AcademicDirectoryPage } from '../shared/AcademicDirectoryPage';
import { LessonsFilters } from './LessonsFilters';
import { LessonsTable } from './LessonsTable';
import { useLessons } from './useLessons';

const LESSONS_METRICS: Metric[] = [
  {
    title: 'Total Lessons',
    value: '128',
    subtitle: 'Across all sections',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Published Lessons',
    value: '98',
    subtitle: 'Ready for students',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Draft Lessons',
    value: '24',
    subtitle: 'Teacher work in progress',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Needs Review',
    value: '12',
    subtitle: 'Missing coverage or stale',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const LessonsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    coverageFilter,
    setCoverageFilter,
    currentPage,
    setCurrentPage,
    selectedLessons,
    handleSelectAll,
    handleSelectLesson,
    handleSort,
    sortKey,
    sortDirection,
    lessons,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useLessons();

  return (
    <AcademicDirectoryPage
      title="Lessons"
      subtitle="Review lesson content, publication status, and curriculum coverage"
      actionButton={{ label: 'Create Lesson', onClick: () => console.log('create lesson') }}
      metrics={LESSONS_METRICS}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'lessons',
        onPageChange: setCurrentPage,
      }}
    >
      <LessonsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        coverageFilter={coverageFilter}
        setCoverageFilter={setCoverageFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <LessonsTable
        lessons={lessons}
        selectedLessons={selectedLessons}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectLesson={handleSelectLesson}
        onSort={handleSort}
      />
    </AcademicDirectoryPage>
  );
};
