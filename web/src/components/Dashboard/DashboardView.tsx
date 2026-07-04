'use client';

import React from 'react';
import styles from '@/app/admin/admin.module.css';
import {
  ChalkLineChart,
  ChalkDonutChart,
  ChalkMiniLineChart,
  ChalkRadialGauge,
} from '@/components/ChalkCharts';
import { School } from '@/types/school';
import { recentSchools } from '@/lib/data/schools';

interface DashboardViewProps {
  onTabChange: (tab: string) => void;
  onSelectSchool: (school: School) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onTabChange, onSelectSchool }) => {
  const [activeRecentDropdownId, setActiveRecentDropdownId] = React.useState<number | null>(null);

  return (
    <>
      {/* Control toolbar row */}
      <div className={styles.controlRow}>
        <div className={styles.dateRangeSelector}>📅 May 1 – May 31, 2025 ▾</div>
        <button className={styles.exportReportBtn} onClick={() => alert('Exporting report as PDF...')}>
          📥 Export Report
        </button>
      </div>

      {/* 6 Metrics Grid */}
      <section className={styles.metricsGrid}>
        {[
          { label: 'Total Schools', value: '24', growth: '+3 this month', growthClass: styles.growthYellow },
          { label: 'Total Students', value: '12,540', growth: '+320 this month', growthClass: styles.growthGreen },
          { label: 'Total Teachers', value: '1,024', growth: '+18 this month', growthClass: styles.growthGreen },
          { label: 'Total Parents', value: '9,312', growth: '+210 this month', growthClass: styles.growthGreen },
          { label: 'Active Subscriptions', value: '22', growth: '91.67% of schools', growthClass: styles.growthYellow },
          { label: 'Monthly Revenue', value: '₱65,978', growth: '+12.5% vs last month', growthClass: styles.growthGreen },
        ].map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricValue}>{m.value}</div>
            <div className={`${styles.metricGrowth} ${m.growthClass}`}>{m.growth}</div>
          </div>
        ))}
      </section>

      {/* Row 2: Charts Row */}
      <section className={styles.chartsRow}>
        {/* Schools growth overview */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Schools Overview</h3>
            <select className={styles.chartSelect} defaultValue="month">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart /></div>
        </div>

        {/* Subscriptions donut ratio */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Subscription Status</h3>
          </div>
          <div className={`${styles.chartCanvas} ${styles.donutCanvas}`}><ChalkDonutChart /></div>
          <div className={styles.donutLegend}>
            {[
              { color: '#8affad', label: 'Active', value: '22 (91.67%)' },
              { color: '#f5c842', label: 'Expiring Soon', value: '1 (4.17%)' },
              { color: '#e05e5e', label: 'Expired', value: '1 (4.17%)' },
            ].map((item) => (
              <div key={item.label} className={styles.legendItem}>
                <span className={styles.legendLabel}>
                  <span className={styles.legendDot} style={{ background: item.color }} /> {item.label}
                </span>
                <span className={styles.legendValue}>{item.value}</span>
              </div>
            ))}
          </div>
          <button className={styles.viewLink} onClick={() => onTabChange('Subscriptions')}>
            View All Subscriptions →
          </button>
        </div>

        {/* Monthly Revenue chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Monthly Revenue</h3>
          </div>
          <div className={styles.revenueValContainer}>
            <div className={styles.revMainVal}>₱65,978</div>
            <div className={styles.revSubVal}>+12.5% vs last month</div>
          </div>
          <div className={styles.chartCanvas}><ChalkMiniLineChart /></div>
          <div className={styles.revFooterStats}>
            {[
              { label: 'Last Month', value: '₱58,634', highlight: false },
              { label: 'This Month', value: '₱65,978', highlight: false },
              { label: 'Growth', value: '12.5%', highlight: true },
            ].map((s) => (
              <div key={s.label} className={styles.revStatBlock}>
                <span className={styles.revStatLabel}>{s.label}</span>
                <span className={`${styles.revStatValue} ${s.highlight ? styles.revStatValueHighlight : ''}`}>{s.value}</span>
              </div>
            ))}
          </div>
          <button className={styles.viewLink} onClick={() => onTabChange('Billing')}>
            View Billing Reports →
          </button>
        </div>
      </section>

      {/* Row 3: Bottom Listings Row */}
      <section className={styles.bottomRow}>
        {/* Recent Schools Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Recent Schools</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.dashboardTable}>
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentSchools.map((school, i) => (
                  <tr
                    key={i}
                    className={styles.clickableRow}
                    onClick={() => { onTabChange('Schools'); onSelectSchool(school); }}
                  >
                    <td className={styles.schoolNameCol}>{school.name}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        school.status === 'Active' ? styles.statusActive :
                        school.status === 'Expiring Soon' ? styles.statusExpiring : styles.statusExpired
                      }`}>
                        {school.status}
                      </span>
                    </td>
                    <td>{school.joined}</td>
                    <td>
                      <div className={styles.actionsGroup} style={{ position: 'relative' }}>
                        <button
                          className={styles.actionIconBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRecentDropdownId(activeRecentDropdownId === i ? null : i);
                          }}
                        >
                          ⋮
                        </button>
                        {activeRecentDropdownId === i && (
                          <>
                            <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveRecentDropdownId(null); }} />
                            <div className={`${styles.actionDropdownMenu} ${i >= 4 ? styles.actionDropdownMenuUp : ''}`}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setActiveRecentDropdownId(null); onTabChange('Schools'); onSelectSchool(school); }}
                                className={styles.actionDropdownItem}
                              >
                                👁️ View Details
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setActiveRecentDropdownId(null); alert(`Editing school ${school.name}...`); }}
                                className={styles.actionDropdownItem}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setActiveRecentDropdownId(null); alert(`Deleting school ${school.name}...`); }}
                                className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className={styles.viewLink} onClick={() => onTabChange('Schools')}>
            View All Schools →
          </button>
        </div>

        {/* AI Credits radial gauge */}
        <div className={styles.radialCard}>
          <div className={styles.chartHeader} style={{ width: '100%' }}>
            <h3 className={styles.chartTitle}>AI Credits Usage</h3>
          </div>
          <div className={styles.gaugeContainer}>
            <ChalkRadialGauge />
            <div className={styles.gaugeTextCenter}>
              <span className={styles.gaugePercent}>24.9%</span>
              <span className={styles.gaugeValText}>Total Credits Used</span>
            </div>
          </div>
          <div className={styles.radialStats}>
            {[
              { label: 'Used', value: '12,450', highlight: true },
              { label: 'Remaining', value: '37,550', highlight: false },
              { label: 'Total', value: '50,000', highlight: false },
            ].map((s) => (
              <div key={s.label} className={styles.radialStatItem}>
                <span className={styles.radialStatLabel}>{s.label}</span>
                <span className={`${styles.radialStatVal} ${s.highlight ? styles.radialStatValHighlight : ''}`}>{s.value}</span>
              </div>
            ))}
          </div>
          <button className={styles.viewLink} onClick={() => onTabChange('AI Credits')}>
            Manage AI Credits →
          </button>
        </div>

        {/* Recent Activities timeline */}
        <div className={styles.activitiesCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Recent Activities</h3>
          </div>
          <ul className={styles.timelineList}>
            {[
              { text: "New school registered: St. Mary's Academy", time: '2 hours ago', dotClass: styles.timelineDot },
              { text: 'Subscription renewed: Greenfield High School', time: '5 hours ago', dotClass: styles.timelineDotBlue },
              { text: 'AI credits purchased: Riverside National HS', time: '1 day ago', dotClass: styles.timelineDotBlue },
              { text: 'New teacher added: Bright Future School', time: '1 day ago', dotClass: styles.timelineDot },
              { text: 'Subscription expired: Unity Christian School', time: '2 days ago', dotClass: styles.timelineDotRed },
            ].map((activity, i) => (
              <li key={i} className={styles.timelineItem}>
                <span className={`${styles.timelineDot} ${activity.dotClass}`} />
                <span className={styles.timelineText}>{activity.text}</span>
                <span className={styles.timelineTime}>{activity.time}</span>
              </li>
            ))}
          </ul>
          <button className={styles.viewLink} onClick={() => alert('Viewing all platform activity logs...')}>
            View All Activities →
          </button>
        </div>
      </section>
    </>
  );
};
