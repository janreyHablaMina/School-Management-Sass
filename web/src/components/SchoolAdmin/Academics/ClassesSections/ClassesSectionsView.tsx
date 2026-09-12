import React from 'react';
import { PaginationBar } from '@/components/Teacher/shared';
import { MetricsGrid, type Metric } from '../../shared/MetricsGrid';
import { PageHeader } from '../../shared/PageHeader';
import layoutStyles from '../../shared/layout.module.css';
import { ClassesSectionsFilters } from './ClassesSectionsFilters';
import { ClassesSectionsTable } from './ClassesSectionsTable';
import { useClassesSections } from './useClassesSections';

const CLASSES_SECTIONS_METRICS: Metric[] = [
  {
    title: 'Total Classes',
    value: '42',
    subtitle: 'Active sections this year',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Total Students',
    value: '1,245',
    subtitle: 'Across all sections',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Avg. Attendance',
    value: '93%',
    subtitle: 'Today across classes',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Needs Adviser',
    value: '3',
    subtitle: 'Sections requiring assignment',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const ClassesSectionsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    gradeFilter,
    setGradeFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    selectedClassSections,
    handleSelectAll,
    handleSelectClassSection,
    handleSort,
    sortKey,
    sortDirection,
    classSections,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useClassesSections();

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader
        title="Classes & Sections"
        subtitle="Organize grade sections, advisers, rooms, and class capacity"
        actionButton={{ label: 'Add Section', onClick: () => console.log('add section') }}
      />
      <MetricsGrid metrics={CLASSES_SECTIONS_METRICS} columns={4} />
      <ClassesSectionsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <ClassesSectionsTable
        classSections={classSections}
        selectedClassSections={selectedClassSections}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectClassSection={handleSelectClassSection}
        onSort={handleSort}
      />
      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={totalCount}
        page={currentPage}
        totalPages={totalPages}
        itemLabel="sections"
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
