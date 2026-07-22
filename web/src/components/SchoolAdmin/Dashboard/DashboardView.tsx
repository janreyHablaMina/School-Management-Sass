import React from 'react';
import styles from './dashboard.module.css';
import { ChalkLineChart, ChalkDonutChart } from '@/components/ChalkCharts';
import { schoolAdminMockData } from '@/lib/data/schoolAdminMockData';

export const DashboardView: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* HEADER SECTION */}
      <div className={styles.headerSection}>
        <div className={styles.headerText}>
          <h1>Good morning, Sophia! 👋</h1>
          <p>Here&apos;s what&apos;s happening at ABC Learning Academy today.</p>
        </div>
        
        <div className={styles.headerControls}>
          <select className={styles.dropdownSelect} defaultValue="2025-2026">
            <option value="2025-2026">School Year 2025 - 2026</option>
            <option value="2024-2025">School Year 2024 - 2025</option>
          </select>
          <select className={styles.dropdownSelect} defaultValue="1">
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className={styles.metricsGrid}>
        {[
          { label: 'TOTAL STUDENTS', value: '1,245', icon: '👨‍🎓' },
          { label: 'TOTAL TEACHERS', value: '78', icon: '👩‍🏫' },
          { label: 'TOTAL SECTIONS', value: '42', icon: '🏫' },
          { label: 'ATTENDANCE TODAY', value: '96.4%', icon: '📅' },
          { label: 'PENDING TASKS', value: '18', icon: '📋' },
          { label: 'AI CREDITS', value: '1,250', icon: '🤖' },
        ].map(m => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricTop}>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricIcon}>{m.icon}</span>
            </div>
            <div className={styles.metricBottom}>
              <span className={styles.metricValue}>{m.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Attendance Overview ⓘ</h3>
            <select className={styles.dropdownSelect} style={{ padding: '0.3rem 1.8rem 0.3rem 0.6rem' }}>
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
            <select className={styles.dropdownSelect} style={{ padding: '0.3rem 1.8rem 0.3rem 0.6rem' }}>
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
                  <p className={styles.itemDesc} style={{ opacity: 0.6 }}>{ann.date}</p>
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
            { icon: '⚡', text: 'You have 1,250 AI credits remaining this month.', color: '#ff7e93' },
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
