import React from 'react';
import { PaginationBar } from '@/components/Teacher/shared';
import { MetricsGrid, type Metric } from './MetricsGrid';
import { PageHeader } from './PageHeader';
import layoutStyles from './layout.module.css';

interface HeaderAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface SchoolAdminDirectoryPageProps {
  title: string;
  subtitle: string;
  actionButton?: HeaderAction;
  secondaryButton?: HeaderAction;
  metrics: Metric[];
  metricColumns?: 4 | 5 | 6;
  children: React.ReactNode;
  pagination: {
    rangeStart: number;
    rangeEnd: number;
    total: number;
    page: number;
    totalPages: number;
    itemLabel: string;
    onPageChange: (page: number) => void;
  };
}

export const SchoolAdminDirectoryPage: React.FC<SchoolAdminDirectoryPageProps> = ({
  title,
  subtitle,
  actionButton,
  secondaryButton,
  metrics,
  metricColumns = 4,
  children,
  pagination,
}) => {
  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actionButton={actionButton}
        secondaryButton={secondaryButton}
      />
      <MetricsGrid metrics={metrics} columns={metricColumns} />
      {children}
      <PaginationBar {...pagination} />
    </div>
  );
};
