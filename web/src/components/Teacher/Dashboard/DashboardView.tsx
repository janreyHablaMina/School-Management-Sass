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

interface DashboardViewProps {
  onNavigate?: (tab: string) => void;
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

  const goToAi = () => onNavigate?.('AI Assistant');

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader shortName={teacher.shortName} onAskAi={goToAi} />
      <MetricsRow metrics={metrics} />

      <div className={styles.middleSection}>
        <SchedulePanel schedule={schedule} />
        <AiAssistantPanel
          aiCredits={aiCredits}
          aiUsage={aiUsage}
          aiTools={aiTools}
          onOpenAssistant={goToAi}
        />
        <AnnouncementsPanel announcements={announcements} />
        <StudentOverviewPanel
          studentOverview={studentOverview}
          classPerformance={classPerformance}
          attentionItems={attentionItems}
        />
      </div>

      <div className={styles.bottomGrid}>
        <MyClassesPanel myClasses={myClasses} classActivity={classActivity} />
        <DeadlinesPanel deadlines={deadlines} />
      </div>
    </div>
  );
}
