import React from 'react';
import styles from '../SchoolDetailView.module.css';
import { ReportsMetricsRow } from './reports/ReportsMetricsRow';
import { EnrollmentTrendCard } from './reports/EnrollmentTrendCard';
import { StudentDistributionCard } from './reports/StudentDistributionCard';
import { AttendanceOverviewCard } from './reports/AttendanceOverviewCard';
import { TopSectionsCard } from './reports/TopSectionsCard';
import { AiUsageSummaryCard } from './reports/AiUsageSummaryCard';
import { ReportsListCard } from './reports/ReportsListCard';

export const ReportsTab = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

    {/* Filters & Export */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>Report Category</label>
          <div style={{ position: 'relative', width: '200px' }}>
            <select className={styles.chartSelect} style={{ width: '100%', background: 'rgba(10, 25, 17, 0.4)', fontFamily: 'inherit', fontSize: '0.85rem', appearance: 'none', paddingRight: '2rem' }}>
              <option>All Reports</option>
              <option>Academic</option>
              <option>Attendance</option>
              <option>AI Usage</option>
            </select>
            <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', opacity: 0.5, pointerEvents: 'none' }}>▼</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>Date Range</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 17, 0.4)', border: '1px solid rgba(240, 239, 237, 0.2)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <span>📅</span>
            <span>May 1, 2025 - May 31, 2025</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>▼</span>
          </div>
        </div>
      </div>
      <button className={styles.proGhostBtn} style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }}>
        <span>📥</span> Export Report
      </button>
    </div>

    <ReportsMetricsRow />

    <div className={styles.detailBodyGrid}>
      <EnrollmentTrendCard />
      <StudentDistributionCard />
      <AttendanceOverviewCard />
    </div>

    <div className={styles.detailBodyGrid}>
      <TopSectionsCard />
      <AiUsageSummaryCard />
      <ReportsListCard />
    </div>

    {/* Footer */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>
      <span>Showing reports for May 1, 2025 - May 31, 2025</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Data is updated as of May 31, 2025 11:59 PM</span>
        <span style={{ cursor: 'pointer' }}>🔄</span>
      </div>
    </div>
  </div>
);
