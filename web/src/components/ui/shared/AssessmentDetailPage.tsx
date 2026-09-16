'use client';

import type { ReactNode } from 'react';
import { DataTable, type DataTableColumn } from './DataTable';
import { ProgressStatCell } from './ProgressStatCell';
import listStyles from './listPage.module.css';
import styles from './assessmentDetail.module.css';

export interface AssessmentDetailStat {
  label: string;
  value: ReactNode;
  subText: ReactNode;
  progress?: {
    current: number;
    total: number;
    barColor: string;
  };
}

interface AssessmentDetailPageProps {
  backLabel: string;
  onBack: () => void;
  title: string;
  statusBadge: ReactNode;
  description: string;
  badges: ReactNode;
  scheduleDate: string;
  scheduleTime: string;
  stats: AssessmentDetailStat[];
  resultsTitle: string;
  resultsSummary: string;
  columns: readonly DataTableColumn[];
  children: ReactNode;
}

export function AssessmentDetailPage({
  backLabel,
  onBack,
  title,
  statusBadge,
  description,
  badges,
  scheduleDate,
  scheduleTime,
  stats,
  resultsTitle,
  resultsSummary,
  columns,
  children,
}: AssessmentDetailPageProps) {
  return (
    <div className={listStyles.page}>
      <button type="button" className={listStyles.backBtn} onClick={onBack}>
        <span aria-hidden>&lt;</span> {backLabel}
      </button>

      <section className={styles.header}>
        <div>
          <div className={styles.titleLine}>
            <h1 className={styles.title}>{title}</h1>
            {statusBadge}
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.badges}>{badges}</div>
        </div>

        <div className={styles.schedule}>
          <span>Scheduled</span>
          <strong>{scheduleDate}</strong>
          <span>{scheduleTime}</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statLabel}>{stat.label}</span>
            <strong>{stat.value}</strong>
            {stat.progress ? (
              <ProgressStatCell
                current={stat.progress.current}
                total={stat.progress.total}
                barColor={stat.progress.barColor}
              />
            ) : (
              <span>{stat.subText}</span>
            )}
          </div>
        ))}
      </section>

      <section className={styles.results}>
        <div className={styles.sectionHeader}>
          <h2>{resultsTitle}</h2>
          <span>{resultsSummary}</span>
        </div>

        <DataTable columns={columns} minWidth={820}>
          {children}
        </DataTable>
      </section>
    </div>
  );
}
