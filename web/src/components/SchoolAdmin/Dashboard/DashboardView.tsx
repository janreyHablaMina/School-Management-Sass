'use client';
import React from 'react';
import styles from './dashboard.module.css';
import { ChalkLineChart, ChalkDonutChart } from '@/components/ChalkCharts';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';

export const DashboardView: React.FC = () => {
  const { teacherCount, totalAllocated } = schoolAdminMockData.aiCredits;
  const totalAllocatedLabel = totalAllocated.toLocaleString();

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader
        name="Sophia"
        description="Here's what's happening at ABC Learning Academy today."
      />

      <DashboardMetrics
        columns={5}
        metrics={[
          { label: 'Total Students', value: '1,245', growth: 'View all →', growthClass: 'yellow' },
          { label: 'Total Teachers', value: '78', growth: 'View all →', growthClass: 'yellow' },
          { label: 'Total Sections', value: '42', growth: 'View all →', growthClass: 'yellow' },
          { label: 'Teachers Present', value: '74', growth: '4 on leave today', growthClass: 'green' },
          { label: 'At-Risk Students', value: '23', growth: 'Needs intervention', growthClass: 'yellow' },
        ]}
      />

      {/* CHARTS ROW */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Attendance Overview ⓘ</h3>
            <select className={styles.dropdownSelectSmall}>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart tooltipDate="TODAY" tooltipText="Attendance: 96.4%" /></div>
        </div>
        
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Students by Grade Level</h3>
          </div>
          <div className={styles.chartCanvas}><ChalkDonutChart /></div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Enrollment Trend</h3>
            <select className={styles.dropdownSelectSmall}>
              <option>This School Year</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart tooltipDate="2025-2026" tooltipText="Enrolled: 1,245" /></div>
        </div>
      </div>

      {/* LISTS ROW */}
      <div className={styles.listsGrid}>
        
        {/* Recent Activities */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <h3 className={styles.listTitle}>Recent Activities</h3>
            <button className={styles.listLink}>View All</button>
          </div>
          <div className={styles.listBody}>
            {schoolAdminMockData.recentActivities.map(act => (
              <div key={act.id} className={styles.listItem}>
                <div className={styles.itemIcon} style={{ background: act.iconBg, color: act.iconColor }}>
                  {act.icon}
                </div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>{act.user}</p>
                  <p className={styles.itemDesc}>{act.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <h3 className={styles.listTitle}>Upcoming Events</h3>
            <button className={styles.listLink}>View Calendar</button>
          </div>
          <div className={styles.listBody}>
            {schoolAdminMockData.upcomingEvents.map(evt => (
              <div key={evt.id} className={styles.listItem}>
                <div className={styles.eventDateBox}>
                  <span className={styles.eventMonth} style={{ color: evt.color }}>{evt.month}</span>
                  <span className={styles.eventDay}>{evt.day}</span>
                </div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>{evt.title}</p>
                  <p className={styles.itemDesc}>{evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <h3 className={styles.listTitle}>Announcements</h3>
            <button className={styles.listLink}>View All</button>
          </div>
          <div className={styles.listBody}>
            {schoolAdminMockData.announcements.map(ann => (
              <div key={ann.id} className={styles.listItem}>
                <div className={styles.itemIcon} style={{ background: ann.iconBg, color: ann.iconColor }}>
                  {ann.icon}
                </div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>{ann.title}</p>
                  <p className={styles.itemDesc}>{ann.desc}</p>
                  <p className={styles.itemDateMuted}>{ann.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI INSIGHTS BANNER */}
      <div className={styles.insightsBanner}>
        <div className={styles.insightsHeader}>
          <h3 className={styles.insightsTitle}>
            ✨ AI Assistant Insights
          </h3>
          <button className={styles.listLink}>View All Insights →</button>
        </div>
        <div className={styles.insightsGrid}>
          {[
            { icon: '📉', text: 'Attendance dropped by 4.2% compared to last week.', color: '#b68eff' },
            { icon: '⚠️', text: 'Grade 10 - Section B has the highest missing assignments.', color: '#5cc789' },
            { icon: '📖', text: '8 students have incomplete requirements.', color: '#ffab6b' },
            { icon: '⚡', text: `${totalAllocatedLabel} AI credits are allocated across ${teacherCount} teachers.`, color: '#ff7e93' },
          ].map((insight, i) => (
            <div key={i} className={styles.insightBox}>
              <div className={styles.insightBoxIcon} style={{ background: `rgba(255,255,255,0.05)`, color: insight.color }}>
                {insight.icon}
              </div>
              <p className={styles.insightBoxText}>{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
