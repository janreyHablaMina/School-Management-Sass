'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useQuizzes } from './useQuizzes';
import { QuizzesFilters } from './QuizzesFilters';
import { QuizzesTable } from './QuizzesTable';

export function QuizzesView() {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedQuizzes,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useQuizzes();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Quizzes"
        subtitle="Create, manage and analyze your quizzes."
      >
        <button type="button" className={listStyles.secondaryBtn}>
          + New Folder
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          + Create New Quiz
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={5} />

      <QuizzesFilters
        filters={filters}
        onFilterChange={setFilter}
        tabs={tabs}
        classes={filterOptions.classes}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        types={filterOptions.types}
        sorts={filterOptions.sorts}
      />

      {paginatedQuizzes.length === 0 ? (
        <EmptyState
          title="No quizzes found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <QuizzesTable quizzes={paginatedQuizzes} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="quizzes"
        onPageChange={setPage}
      />
    </div>
  );
}
