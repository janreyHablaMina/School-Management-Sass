'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { ClassDetailView } from './components/ClassDetailView';
import { ClassesTable } from './ClassesTable';
import { MyClassesFilters } from './MyClassesFilters';
import { useMyClasses } from './useMyClasses';

interface MyClassesViewProps {
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function MyClassesView({ onNavigate }: MyClassesViewProps) {
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    filteredCount,
    paginatedClasses,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    selectedClass,
    openClass,
    backToClasses,
  } = useMyClasses();

  if (selectedClass) {
    return (
      <ClassDetailView
        cls={selectedClass}
        onBack={backToClasses}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Classes"
        subtitle="View and manage all your classes in one place."
      >
        <button type="button" className={listStyles.primaryBtn}>
          + Create New Class
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={4} />

      <MyClassesFilters
        filters={filters}
        onFilterChange={setFilter}
        academicYears={filterOptions.academicYears}
        gradeLevels={filterOptions.gradeLevels}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        onClear={clearFilters}
      />

      {paginatedClasses.length === 0 ? (
        <EmptyState
          title="No classes found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <ClassesTable classes={paginatedClasses} onOpen={openClass} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="classes"
        onPageChange={setPage}
      />
    </div>
  );
}
