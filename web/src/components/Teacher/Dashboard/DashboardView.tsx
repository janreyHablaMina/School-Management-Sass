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
    aiCredits,
    metrics,
    schedule,
    studentOverview,
    classPerformance,
    attentionItems,
    announcements,
    aiTools,
    aiUsage,
    myClasses,
    classActivity,
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

      {/* METRICS — Super Admin style cards */}
      <section className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricValue}>{m.value}</div>
            <div
              className={`${styles.metricGrowth} ${
                m.growthClass === 'green' ? styles.growthGreen : styles.growthYellow
              }`}
            >
              {m.growth}
            </div>
          </div>
        ))}
      </section>

      {/* MIDDLE SECTION */}
      <div className={styles.middleSection}>
        <div className={`${styles.panel} ${styles.schedulePanel} ${styles.areaSchedule}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>Today&apos;s Schedule</h3>
            <span className={styles.scheduleCount}>{schedule.length} classes</span>
          </div>
          <div className={styles.scheduleList}>
            {schedule.map((row, index) => (
              <div
                key={row.id}
                className={`${styles.scheduleRow} ${row.status === 'ongoing' ? styles.scheduleRowActive : ''}`}
              >
                <div className={styles.scheduleTimeline}>
                  <span
                    className={`${styles.scheduleDot} ${row.status === 'ongoing' ? styles.scheduleDotPulse : ''}`}
                    style={{ background: row.accent, boxShadow: `0 0 0 3px ${row.accent}33` }}
                  />
                  {index < schedule.length - 1 && <span className={styles.scheduleLine} />}
                </div>
                <div className={styles.scheduleTimeBlock}>
                  <span className={styles.scheduleTime}>{row.time}</span>
                  <span className={styles.scheduleEndTime}>{row.endTime}</span>
                </div>
                <div className={styles.scheduleInfo}>
                  <p className={styles.scheduleTitle}>{row.title}</p>
                  <p className={styles.scheduleSubject}>{row.subject}</p>
                  <p className={styles.scheduleRoom}>📍 {row.room}</p>
                </div>
                {row.status === 'ongoing' ? (
                  <span className={styles.badgeOngoing}>Ongoing</span>
                ) : (
                  <button type="button" className={styles.btnStartClass}>
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" className={styles.panelFooterLink}>
            View full schedule ›
          </button>
        </div>

        <div className={`${styles.panel} ${styles.aiPanel} ${styles.areaAi}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>AI Teaching Assistant</h3>
            <span className={styles.aiCreditsHint}>✨ {aiCredits.toLocaleString()} left</span>
          </div>

          <div className={styles.aiUsageBox}>
            <div className={styles.aiUsageTop}>
              <span>Credits used this month</span>
              <span>
                {aiUsage.used} / {aiUsage.total}
              </span>
            </div>
            <div className={styles.aiUsageTrack}>
              <div
                className={styles.aiUsageFill}
                style={{ width: `${aiUsage.percent}%` }}
              />
            </div>
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
                <span className={styles.aiToolCredits}>{tool.credits}</span>
                <span className={styles.aiToolArrow}>›</span>
              </button>
            ))}
          </div>
          <button type="button" className={styles.panelFooterLink}>
            View all AI tools ›
          </button>
        </div>

        <div className={`${styles.panel} ${styles.announcementPanel} ${styles.areaAnnouncements}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>Recent Announcements</h3>
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
                  <div className={styles.announcementTitleRow}>
                    <p className={styles.announcementTitle}>{ann.title}</p>
                    {ann.pinned && <span className={styles.pinnedBadge}>Pinned</span>}
                  </div>
                  <p className={styles.announcementDesc}>{ann.desc}</p>
                  <span className={styles.announcementAudience}>{ann.audience}</span>
                </div>
                <span className={styles.announcementDate}>{ann.date}</span>
              </div>
            ))}
          </div>
          <button type="button" className={styles.composeBtn}>
            + New Announcement
          </button>
        </div>

        <div className={`${styles.panel} ${styles.overviewPanel} ${styles.areaOverview}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>Student Overview</h3>
            <button type="button" className={styles.panelLink}>
              View report
            </button>
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

          <div className={styles.overviewSplit}>
            <div className={styles.performanceBlock}>
              <div className={styles.overviewSubHeader}>
                <span>Class Performance</span>
              </div>
              <div className={styles.performanceList}>
                {classPerformance.map((cls) => (
                  <div key={cls.id} className={styles.performanceRow}>
                    <div className={styles.performanceMeta}>
                      <span className={styles.performanceName}>{cls.name}</span>
                      <span className={styles.performanceSubject}>{cls.subject}</span>
                    </div>
                    <div className={styles.performanceBarTrack}>
                      <div
                        className={styles.performanceBarFill}
                        style={{ width: `${cls.score}%`, background: cls.color }}
                      />
                    </div>
                    <span className={styles.performanceScore} style={{ color: cls.color }}>
                      {cls.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.attentionBlock}>
              <div className={styles.overviewSubHeader}>
                <span>Needs Attention</span>
                <span className={styles.attentionBadge}>{attentionItems.length}</span>
              </div>
              <div className={styles.attentionList}>
                {attentionItems.map((item) => (
                  <div key={item.id} className={styles.attentionRow}>
                    <div className={styles.attentionAvatar}>
                      {item.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className={styles.attentionContent}>
                      <p className={styles.attentionName}>{item.name}</p>
                      <p className={styles.attentionDetail}>{item.detail}</p>
                    </div>
                    <span
                      className={styles.attentionTag}
                      style={{ color: item.tagColor, borderColor: `${item.tagColor}66` }}
                    >
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.bottomGrid}>
        {/* My Classes */}
        <div className={`${styles.panel} ${styles.classesPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>My Classes</h3>
            <div className={styles.classesHeaderRight}>
              <span className={styles.classesCount}>{myClasses.length} active</span>
              <button type="button" className={styles.panelLink}>
                View all
              </button>
            </div>
          </div>
          <div className={styles.classesGrid}>
            {myClasses.map((cls) => (
              <div key={cls.id} className={styles.classCard}>
                <div className={styles.classAccent} style={{ background: cls.accent }} />
                <div className={styles.classBody}>
                  <div className={styles.classTop}>
                    <div>
                      <p className={styles.classTitle}>{cls.title}</p>
                      <p className={styles.classSubject}>{cls.subject}</p>
                    </div>
                    <span
                      className={styles.classGradePill}
                      style={{ color: cls.accent, borderColor: `${cls.accent}66` }}
                    >
                      {cls.avgGrade}
                    </span>
                  </div>

                  <div className={styles.classStats}>
                    <span className={styles.classStat}>
                      <span className={styles.classStatIcon}>👥</span>
                      {cls.students} Students
                    </span>
                    <span className={styles.classStat}>
                      <span className={styles.classStatIcon}>📅</span>
                      {cls.attendance}% Attendance
                    </span>
                  </div>

                  <div className={styles.classAttendanceTrack}>
                    <div
                      className={styles.classAttendanceFill}
                      style={{ width: `${cls.attendance}%`, background: cls.accent }}
                    />
                  </div>

                  <p className={styles.classNext}>
                    <span>Next</span> {cls.next}
                  </p>

                  <button type="button" className={styles.classOpenBtn}>
                    Open Class ›
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.classActivityBlock}>
            <div className={styles.overviewSubHeader}>
              <span>Recent Class Activity</span>
            </div>
            <div className={styles.classActivityList}>
              {classActivity.map((act) => (
                <div key={act.id} className={styles.classActivityRow}>
                  <span
                    className={styles.classActivityDot}
                    style={{ background: act.accent }}
                  />
                  <p className={styles.classActivityText}>{act.text}</p>
                  <span className={styles.classActivityTime}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={`${styles.panel} ${styles.deadlinesPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitleChalk}>Upcoming Deadlines</h3>
            <button type="button" className={styles.panelLink}>
              View all
            </button>
          </div>
          <div className={styles.deadlineList}>
            {deadlines.map((d) => (
              <div key={d.id} className={styles.deadlineRow}>
                <div
                  className={styles.deadlineDateBox}
                  style={{ borderColor: `${d.color}88`, boxShadow: `0 0 0 3px ${d.color}18` }}
                >
                  <span className={styles.deadlineMonth} style={{ color: d.color }}>
                    {d.month}
                  </span>
                  <span className={styles.deadlineDay}>{d.day}</span>
                </div>
                <div className={styles.deadlineContent}>
                  <div className={styles.deadlineTitleRow}>
                    <p className={styles.deadlineTitle}>{d.title}</p>
                    <span
                      className={styles.deadlineType}
                      style={{ color: d.color, borderColor: `${d.color}55` }}
                    >
                      {d.type}
                    </span>
                  </div>
                  <p className={styles.deadlineClass}>{d.className}</p>
                  <span className={styles.deadlineDays}>{d.daysLeft}</span>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.panelFooterLink}>
            View calendar ›
          </button>
        </div>
      </div>
    </div>
  );
};
