'use client';

import React from 'react';
import styles from './dashboard.module.css';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';

const MiniSparkline = ({ path, stroke }: { path: string; stroke: string }) => (
  <svg className={styles.sparkline} viewBox="0 0 80 36" fill="none" aria-hidden="true">
    <path d={path} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path
      d={`${path} L 76 36 L 4 36 Z`}
      fill={stroke}
      opacity="0.12"
    />
  </svg>
);

export const DashboardView: React.FC = () => {
  const {
    teacher,
    metrics,
    schedule,
    studentOverview,
    announcements,
    aiTools,
    myClasses,
    deadlines,
  } = teacherPortalMock;

  return (
    <div className={styles.dashboardContainer}>
      {/* HEADER */}
      <div className={styles.headerSection}>
        <div className={styles.headerText}>
          <h1>Good morning, {teacher.shortName}! 👋</h1>
          <p>Here&apos;s what&apos;s happening in your classes today.</p>
        </div>
        <button type="button" className={styles.aiAskBtn}>
          <span>✨</span> Ask AI Assistant
        </button>
      </div>

      {/* METRICS — 6 cards */}
      <div className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricTop}>
              <div
                className={styles.metricIcon}
                style={{ background: `${m.accent}22`, color: m.accent }}
              >
                {m.icon}
              </div>
              <button type="button" className={styles.metricLink}>
                {m.link}
              </button>
            </div>
            <span className={styles.metricLabel}>{m.label}</span>
            <span className={styles.metricValue}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* MIDDLE ROW */}
      <div className={styles.middleGrid}>
        {/* Today's Schedule */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Today&apos;s Schedule</h3>
          </div>
          <div className={styles.scheduleList}>
            {schedule.map((row) => (
              <div key={row.id} className={styles.scheduleRow}>
                <span className={styles.scheduleDot} style={{ background: row.accent }} />
                <div className={styles.scheduleTime}>{row.time}</div>
                <div className={styles.scheduleInfo}>
                  <p className={styles.scheduleTitle}>{row.title}</p>
                  <p className={styles.scheduleSubject}>{row.subject}</p>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.panelFooterLink}>
            View full schedule ›
          </button>
        </div>

        {/* Center column: Student Overview + Announcements */}
        <div className={styles.centerCol}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Student Overview</h3>
            </div>
            <div className={styles.overviewGrid}>
              {studentOverview.map((item) => (
                <div key={item.id} className={styles.overviewCard}>
                  <span className={styles.overviewLabel}>{item.label}</span>
                  <div className={styles.overviewValueRow}>
                    <span className={styles.overviewValue}>{item.value}</span>
                    <span className={`${styles.overviewChange} ${item.up ? styles.up : styles.down}`}>
                      {item.up ? '↑' : '↓'} {item.change}
                    </span>
                  </div>
                  <MiniSparkline path={item.path} stroke={item.stroke} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Recent Announcements</h3>
              <button type="button" className={styles.panelLink}>
                View all
              </button>
            </div>
            <div className={styles.announcementList}>
              {announcements.map((ann) => (
                <div key={ann.id} className={styles.announcementRow}>
                  <div
                    className={styles.itemIcon}
                    style={{ background: ann.iconBg, color: ann.iconColor }}
                  >
                    {ann.icon}
                  </div>
                  <div className={styles.announcementContent}>
                    <p className={styles.announcementTitle}>{ann.title}</p>
                    <p className={styles.announcementDesc}>{ann.desc}</p>
                  </div>
                  <span className={styles.announcementDate}>{ann.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Teaching Assistant */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>AI Teaching Assistant</h3>
          </div>
          <div className={styles.aiToolList}>
            {aiTools.map((tool) => (
              <button type="button" key={tool.id} className={styles.aiToolRow}>
                <div
                  className={styles.itemIcon}
                  style={{ background: tool.iconBg, color: tool.iconColor }}
                >
                  {tool.icon}
                </div>
                <div className={styles.aiToolContent}>
                  <span className={styles.aiToolTitle}>{tool.title}</span>
                  <span className={styles.aiToolDesc}>{tool.desc}</span>
                </div>
                <span className={styles.aiToolArrow}>›</span>
              </button>
            ))}
          </div>
          <button type="button" className={styles.panelFooterLink}>
            View all AI tools ›
          </button>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.bottomGrid}>
        {/* My Classes */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>My Classes</h3>
            <button type="button" className={styles.panelLink}>
              View all
            </button>
          </div>
          <div className={styles.classesGrid}>
            {myClasses.map((cls) => (
              <div key={cls.id} className={styles.classCard}>
                <div className={styles.classAccent} style={{ background: cls.accent }} />
                <div className={styles.classBody}>
                  <p className={styles.classTitle}>{cls.title}</p>
                  <p className={styles.classSubject}>{cls.subject}</p>
                  <div className={styles.classStats}>
                    <span>👥 {cls.students} Students</span>
                    <span>📅 {cls.attendance} Attendance</span>
                  </div>
                  <p className={styles.classNext}>{cls.next}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Upcoming Deadlines</h3>
            <button type="button" className={styles.panelLink}>
              View all
            </button>
          </div>
          <div className={styles.deadlineList}>
            {deadlines.map((d) => (
              <div key={d.id} className={styles.deadlineRow}>
                <div className={styles.deadlineDateBox} style={{ borderColor: `${d.color}66` }}>
                  <span className={styles.deadlineMonth} style={{ color: d.color }}>
                    {d.month}
                  </span>
                  <span className={styles.deadlineDay}>{d.day}</span>
                </div>
                <div className={styles.deadlineContent}>
                  <p className={styles.deadlineTitle}>{d.title}</p>
                  <p className={styles.deadlineClass}>{d.className}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
