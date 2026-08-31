'use client';

import React from 'react';
import styles from './dashboard.module.css';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import {
  DashboardHeader,
  MetricsRow,
  SchedulePanel,
  AiAssistantPanel,
  AnnouncementsPanel,
  StudentOverviewPanel,
  MyClassesPanel,
  DeadlinesPanel,
} from './sections';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';

interface DashboardViewProps {
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
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

  const goToAi = () => onNavigate?.({ tab: 'AI Assistant' });
  const goToCalendar = () => onNavigate?.('Calendar');
  const goToGrades = () => onNavigate?.('Grades');
  const goToAnnouncements = () => onNavigate?.('Announcements');
  const goToMyClasses = () => onNavigate?.('My Classes');
  const goToAssignments = () => onNavigate?.('Assignments');

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader shortName={teacher.shortName} onAskAi={goToAi} />
      <MetricsRow metrics={metrics} />

      <div className={styles.middleSection}>
        <SchedulePanel schedule={schedule} onViewAll={goToCalendar} />
        <AiAssistantPanel
          aiCredits={aiCredits}
          aiUsage={aiUsage}
          aiTools={aiTools}
          onOpenAssistant={goToAi}
        />
        <AnnouncementsPanel
          announcements={announcements}
          onViewAll={goToAnnouncements}
          onSelectAnnouncement={goToAnnouncements}
        />
        <StudentOverviewPanel
          classPerformance={classPerformance}
          attentionItems={attentionItems}
          onViewReport={goToGrades}
        />
      </div>

      <div className={styles.bottomGrid}>
        <MyClassesPanel
          myClasses={myClasses}
          classActivity={classActivity}
          onViewAll={goToMyClasses}
        />
        <DeadlinesPanel deadlines={deadlines} onViewAll={goToAssignments} />
      </div>
    </div>
  );
}
