import React from 'react';
import styles from './dashboard.module.css';
import { ChalkLineChart, ChalkDonutChart } from '@/components/ChalkCharts';
import { schoolAdminMockData } from '@/lib/data/schoolAdminMockData';

// Reusable SVG for the blackboard in the header
const HeaderBlackboard = () => (
  <svg width="200" height="80" viewBox="0 0 200 80" fill="none" aria-hidden="true" style={{ marginLeft: 'auto', marginRight: '2rem' }}>
    <rect x="10" y="10" width="180" height="60" rx="4" fill="rgba(0,0,0,0.4)" stroke="rgba(240, 239, 237, 0.4)" strokeWidth="3" />
    {/* Chalk drawings on board */}
    <path d="M40 30 Q60 20 80 40 T120 30" stroke="rgba(240, 239, 237, 0.3)" strokeWidth="1.5" fill="none" />
    <path d="M140 25 L160 55 L120 55 Z" stroke="rgba(240, 239, 237, 0.2)" strokeWidth="1" fill="none" />
    {/* Small plants/books decor */}
    <path d="M170 70 L170 50 Q180 40 185 45 Q175 55 170 70" fill="#5cc789" />
    <path d="M170 70 L170 55 Q160 45 155 50 Q165 60 170 70" fill="#4aa671" />
    <rect x="160" y="70" width="20" height="10" fill="#ffab6b" />
    <rect x="25" y="65" width="25" height="5" fill="#84a9ff" />
    <rect x="28" y="60" width="20" height="5" fill="#f5c842" />
  </svg>
);

export const DashboardView: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* HEADER SECTION */}
      <div className={styles.headerSection}>
        <div className={styles.headerText}>
          <h1>Good morning, Sophia! 👋</h1>
          <p>Here&apos;s what&apos;s happening at ABC Learning Academy today.</p>
        </div>
        
        <HeaderBlackboard />

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

      {/* QUICK ACTIONS */}
      <div className={styles.quickActionsGrid}>
        {[
          { label: 'Add Student', icon: '👤+' },
          { label: 'Add Teacher', icon: '👨‍🏫+' },
          { label: 'Create Section', icon: '👥' },
          { label: 'Create Subject', icon: '📚' },
          { label: 'Post Announcement', icon: '📢' },
          { label: 'Generate Report', icon: '📄' },
        ].map(action => (
          <button key={action.label} className={styles.actionButton}>
            <span className={styles.actionIcon}>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* METRICS GRID */}
      <div className={styles.metricsGrid}>
        {[
          { label: 'Total Students', value: '1,245', growth: '↑ 8.6% vs last month', growthClass: styles.growthGreen, icon: '👨‍🎓', bg: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' },
          { label: 'Total Teachers', value: '78', growth: '↑ 5.3% vs last month', growthClass: styles.growthGreen, icon: '👩‍🏫', bg: 'rgba(107, 203, 255, 0.1)', color: '#6bcbff' },
          { label: 'Total Sections', value: '42', growth: '↑ 3.1% vs last month', growthClass: styles.growthGreen, icon: '🏫', bg: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' },
          { label: 'Attendance Today', value: '96.4%', growth: '↑ 2.7% vs yesterday', growthClass: styles.growthGreen, icon: '📅', bg: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' },
          { label: 'Pending Tasks', value: '18', growth: 'View all tasks', growthClass: styles.viewLink, icon: '📋', bg: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' },
          { label: 'AI Credits Remaining', value: '1,250', growth: 'of 2,000 credits', growthClass: styles.metricGrowth, icon: '🤖', bg: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' },
        ].map(m => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricTop}>
              <div className={styles.metricIconWrapper} style={{ background: m.bg, color: m.color }}>
                {m.icon}
              </div>
            </div>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricValue}>{m.value}</div>
            <div className={`${styles.metricGrowth} ${m.growthClass}`}>{m.growth}</div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Attendance Overview ⓘ</h3>
            <select className={styles.dropdownSelect} style={{ padding: '0.3rem 0.6rem' }}>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart /></div>
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
            <select className={styles.dropdownSelect} style={{ padding: '0.3rem 0.6rem' }}>
              <option>This School Year</option>
            </select>
          </div>
          <div className={styles.chartCanvas}><ChalkLineChart /></div>
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
