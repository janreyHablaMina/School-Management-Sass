'use client';

import React from 'react';
import { ChalkLineChart, ChalkDistributionDonut, ChalkBarChart } from '@/components/ChalkCharts';
import { PageHeader } from '../../shared/PageHeader';
import { MetricsGrid, Metric } from '../../shared/MetricsGrid';
import layoutStyles from '../../shared/layout.module.css';
import styles from './reports.module.css';

export const ReportsView = () => {
  const REPORTS_METRICS: Metric[] = [
    { title: 'Total Students', value: '1,240', subtitle: '↑ 2.1% vs last semester', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
    { title: 'Active Teachers', value: '85', subtitle: '↑ 1.5% vs last semester', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
    { title: 'Avg. Attendance', value: '94.2%', subtitle: '↑ 0.8% vs last month', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
    { title: 'Average Grade', value: 'B+', subtitle: 'Stable across departments', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
  ];

  return (
    <div className={layoutStyles.studentsContainer}>
      
      <PageHeader 
        title="School Reports" 
        subtitle="Overview of your school's academic and operational performance."
        actionButton={{ label: "Export Report", onClick: () => console.log('Exporting...') }}
      />

      <MetricsGrid metrics={REPORTS_METRICS} columns={4} />

      {/* Growth Charts Row */}
      <div className={styles.twoColRow}>
        <div className={layoutStyles.tableSection}>
          <div className={layoutStyles.tableHeader}>
            <div className={layoutStyles.tableHeaderLeft}>
              <h2>Attendance Trends</h2>
              <p>Daily student attendance rate over the last 30 days.</p>
            </div>
          </div>
          <div className={styles.chartBody}>
            <ChalkLineChart />
          </div>
        </div>

        <div className={layoutStyles.tableSection}>
          <div className={layoutStyles.tableHeader}>
            <div className={layoutStyles.tableHeaderLeft}>
              <h2>Grade Distribution</h2>
              <p>Average grades distributed across all departments.</p>
            </div>
          </div>
          <div className={styles.chartBody}>
            <ChalkBarChart />
          </div>
        </div>
      </div>

      {/* Distribution Row */}
      <div className={styles.threeColRow}>
        <div className={layoutStyles.tableSection} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={layoutStyles.tableHeader}>
            <div className={layoutStyles.tableHeaderLeft}>
              <h2>Student Population</h2>
            </div>
          </div>
          <div className={styles.donutBody}>
            <div className={styles.donutWrapper}>
              <ChalkDistributionDonut total="1,240" label="Students" val1={55} val2={45} color1="#b388ff" color2="#ff6b6b" />
            </div>
            <div className={styles.donutLegend}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#b388ff' }}>●</span> Junior High</span>
                <span style={{ fontWeight: 600, color: '#f0efed' }}>682 (55%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#ff6b6b' }}>●</span> Senior High</span>
                <span style={{ fontWeight: 600, color: '#f0efed' }}>558 (45%)</span>
              </div>
            </div>
          </div>
          <div className={styles.actionLink}>
            View Detailed Enrollment →
          </div>
        </div>

        <div className={layoutStyles.tableSection} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={layoutStyles.tableHeader}>
            <div className={layoutStyles.tableHeaderLeft}>
              <h2>Teacher Workload</h2>
            </div>
          </div>
          <div className={styles.donutBody}>
            <div className={styles.donutWrapper}>
              <ChalkDistributionDonut total="85" label="Teachers" val1={70} val2={30} color1="#5cc789" color2="#f5c842" />
            </div>
            <div className={styles.donutLegend}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#5cc789' }}>●</span> Optimal Load</span>
                <span style={{ fontWeight: 600, color: '#f0efed' }}>59 (70%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#f5c842' }}>●</span> Heavy Load</span>
                <span style={{ fontWeight: 600, color: '#f0efed' }}>26 (30%)</span>
              </div>
            </div>
          </div>
          <div className={styles.actionLink}>
            View Workload Details →
          </div>
        </div>

        <div className={layoutStyles.tableSection} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={layoutStyles.tableHeader}>
            <div className={layoutStyles.tableHeaderLeft}>
              <h2>Quick Links</h2>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className={styles.quickReportItem}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📈</div>
                <div>
                  <h4 className={styles.quickReportTitle}>Academic Performance</h4>
                  <p className={styles.quickReportDesc}>Detailed grade analytics</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>
            
            <div className={styles.quickReportItem}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(74, 144, 226, 0.1)', color: '#4a90e2' }}>📅</div>
                <div>
                  <h4 className={styles.quickReportTitle}>Attendance Logs</h4>
                  <p className={styles.quickReportDesc}>Daily student presence</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>

            <div className={styles.quickReportItem} style={{ borderBottom: 'none' }}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>📝</div>
                <div>
                  <h4 className={styles.quickReportTitle}>Disciplinary Reports</h4>
                  <p className={styles.quickReportDesc}>Behavior and incident logs</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
