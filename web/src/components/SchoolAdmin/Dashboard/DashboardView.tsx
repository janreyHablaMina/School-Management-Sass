'use client';
import React from 'react';
import styles from './dashboard.module.css';
import { ChalkLineChart, ChalkDonutChart } from '@/components/ChalkCharts';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { DashboardListPanel } from '@/components/shared/DashboardListPanel';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';

export const DashboardView: React.FC = () => {
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
          { label: 'Total Classes', value: '42', growth: 'View all →', growthClass: 'yellow' },
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
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>1 Month</option>
              <option>3 Months</option>
              <option>This School Year</option>
            </select>
          </div>
          <div className={styles.chartCanvas}>
            <ChalkLineChart variant="attendance" tooltipDate="TODAY" tooltipText="96.4%" />
          </div>
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
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This School Year</option>
              <option>Previous School Year</option>
              <option>Year over Year</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart tooltipDate="2025-2026" tooltipText="Enrolled: 1,245" /></div>
        </div>
      </div>

      {/* LISTS ROW */}
      <div className={styles.listsGrid}>
        
        <DashboardListPanel
          title="Recent Activities"
          footerLabel="View all ›"
          items={schoolAdminMockData.recentActivities.map((activity) => ({
            id: activity.id,
            title: activity.user,
            description: activity.details,
            icon: activity.icon,
            color: activity.iconColor,
            badge: 'Update',
          }))}
        />

        <DashboardListPanel
          title="Upcoming Events"
          footerLabel="View calendar ›"
          items={schoolAdminMockData.upcomingEvents.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.time,
            month: event.month,
            day: event.day,
            color: event.color,
            badge: 'Event',
          }))}
        />

        <DashboardListPanel
          title="Announcements"
          footerLabel="View all ›"
          items={schoolAdminMockData.announcements.map((announcement) => ({
            id: announcement.id,
            title: announcement.title,
            description: announcement.desc,
            meta: announcement.date,
            icon: announcement.icon,
            color: announcement.iconColor,
            badge: 'Notice',
          }))}
        />

      </div>

    </div>
  );
};
