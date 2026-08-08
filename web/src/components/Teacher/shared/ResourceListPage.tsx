import React from 'react';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import { EmptyState } from './EmptyState';
import { PageHeader } from './PageHeader';
import { PaginationBar } from './PaginationBar';
import { SummaryMetrics } from './SummaryMetrics';
import styles from './listPage.module.css';

interface ResourceListPageProps {
  title: string;
  subtitle: string;
  headerActions?: React.ReactNode;
  metrics: TeacherSummaryMetric[];
  metricsColumns?: 4 | 5;
  filters: React.ReactNode;
  itemsCount: number;
  emptyTitle: string;
  emptyDescription: string;
  table: React.ReactNode;
  rangeStart: number;
  rangeEnd: number;
  total: number;
  page: number;
  totalPages: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
}

export function ResourceListPage({
  title,
  subtitle,
  headerActions,
  metrics,
  metricsColumns = 5,
  filters,
  itemsCount,
  emptyTitle,
  emptyDescription,
  table,
  rangeStart,
  rangeEnd,
  total,
  page,
  totalPages,
  itemLabel,
  onPageChange,
}: ResourceListPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader title={title} subtitle={subtitle}>
        {headerActions}
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={metricsColumns} />
      {filters}

      {itemsCount === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        table
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={total}
        page={page}
        totalPages={totalPages}
        itemLabel={itemLabel}
        onPageChange={onPageChange}
      />
    </div>
  );
}
