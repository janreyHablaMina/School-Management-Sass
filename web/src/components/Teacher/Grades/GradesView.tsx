'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { GradesFilters } from './GradesFilters';
import { GradesTable } from './GradesTable';
import { GradeClassGrid } from './components/GradeClassGrid';
import { GradesDetailHeader } from './components/GradesDetailHeader';
import { useGrades } from './useGrades';

export function GradesView() {
  const {
    metrics,
    classes,
    tabs,
    filterOptions,
    selectedClass,
    openClass,
    backToClasses,
    filters,
    setFilter,
    filteredCount,
    paginatedGrades,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useGrades();

  if (!selectedClass) {
    return (
      <div className={listStyles.page}>
        <PageHeader
          title="Grades"
          subtitle="Choose a class or section to open its gradebook."
        >
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export Report
          </button>
        </PageHeader>

        <SummaryMetrics metrics={metrics} columns={5} />
        <GradeClassGrid classes={classes} onOpen={openClass} />
      </div>
    );
  }

  return (
    <div className={listStyles.page}>
      <GradesDetailHeader cls={selectedClass} onBack={backToClasses} />

      <GradesFilters
        filters={filters}
        onFilterChange={setFilter}
        tabs={tabs}
        statuses={filterOptions.statuses}
        terms={filterOptions.terms}
        sorts={filterOptions.sorts}
      />

      {paginatedGrades.length === 0 ? (
        <EmptyState
          title="No grades found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <GradesTable grades={paginatedGrades} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="students"
        onPageChange={setPage}
      />
    </div>
  );
}
