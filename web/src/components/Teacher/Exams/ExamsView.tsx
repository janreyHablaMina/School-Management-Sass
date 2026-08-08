'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
} from '../shared';
import { useExams } from './useExams';
import { ExamsTable } from './ExamsTable';

export function ExamsView() {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedExams,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useExams();

  return (
    <ResourceListPage
      title="Exams"
      subtitle="Create, manage and monitor all your exams."
      headerActions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            + New Folder
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Exam
          </button>
        </>
      }
      metrics={metrics}
      metricsColumns={5}
      filters={
        <ClassroomResourceFilters
          filters={filters}
          onFilterChange={setFilter}
          tabs={tabs}
          classes={filterOptions.classes}
          subjects={filterOptions.subjects}
          statuses={filterOptions.statuses}
          types={filterOptions.types}
          sorts={filterOptions.sorts}
          searchPlaceholder="Search exams by title or keyword..."
          searchAriaLabel="Search exams"
          tabsAriaLabel="Exam views"
          tabsPlacement="after"
        />
      }
      itemsCount={paginatedExams.length}
      emptyTitle="No exams found"
      emptyDescription="Try adjusting your search or filters."
      table={<ExamsTable exams={paginatedExams} />}
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      total={filteredCount}
      page={page}
      totalPages={totalPages}
      itemLabel="exams"
      onPageChange={setPage}
    />
  );
}
