import React from 'react';
import { PaginationBar } from '@/components/Teacher/shared';
import { MetricsGrid, type Metric } from '../../shared/MetricsGrid';
import { PageHeader } from '../../shared/PageHeader';
import layoutStyles from '../../shared/layout.module.css';
import { QuizzesFilters } from './QuizzesFilters';
import { QuizzesTable } from './QuizzesTable';
import { useQuizzes } from './useQuizzes';

const QUIZZES_METRICS: Metric[] = [
  {
    title: 'Total Quizzes',
    value: '42',
    subtitle: 'Across all sections',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Active Quizzes',
    value: '18',
    subtitle: 'Currently open',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Upcoming Quizzes',
    value: '5',
    subtitle: 'Scheduled this week',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Low Attempts',
    value: '7',
    subtitle: 'Needs follow-up',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const QuizzesView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    currentPage,
    setCurrentPage,
    selectedQuizzes,
    handleSelectAll,
    handleSelectQuiz,
    handleSort,
    sortKey,
    sortDirection,
    quizzes,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useQuizzes();

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader
        title="Quizzes"
        subtitle="Monitor quiz schedules, attempts, score trends, and low-participation risk"
        actionButton={{ label: 'Create Quiz', onClick: () => console.log('create quiz') }}
      />
      <MetricsGrid metrics={QUIZZES_METRICS} columns={4} />
      <QuizzesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <QuizzesTable
        quizzes={quizzes}
        selectedQuizzes={selectedQuizzes}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectQuiz={handleSelectQuiz}
        onSort={handleSort}
      />
      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={totalCount}
        page={currentPage}
        totalPages={totalPages}
        itemLabel="quizzes"
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
