'use client';

import React from 'react';
import styles from './dashboard.module.css';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import {
  MetricsRow,
  SchedulePanel,
  AnnouncementsPanel,
  DeadlinesPanel,
} from './sections';
import { AlertsPanel } from './sections/AlertsPanel';
import { DashboardHeader } from '@/components/shared/DashboardHeader';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';

interface DashboardViewProps {
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const {
    teacher,
    metrics,
    schedule,
    attentionItems,
    announcements,
    deadlines,
  } = teacherPortalMock;

  const goToCalendar = () => onNavigate?.('Calendar');
  const goToAnnouncements = () => onNavigate?.('Announcements');
  const goToAssignments = () => onNavigate?.('Assignments');
  const goToStudents = () => onNavigate?.('Students');

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader
        name={teacher.shortName}
        description="Here's what's happening in your classes today."
      />

      <MetricsRow metrics={metrics} />

      <div className={styles.topSplit}>
        <SchedulePanel schedule={schedule} onViewAll={goToCalendar} />
        <AlertsPanel
          attentionItems={attentionItems}
          onViewAll={goToStudents}
          onSelectStudent={goToStudents}
        />
      </div>

      <div className={styles.bottomSplit}>
        <DeadlinesPanel
          deadlines={deadlines}
          onViewAll={goToAssignments}
          onSelectDeadline={goToAssignments}
          onViewCalendar={goToCalendar}
        />
        <AnnouncementsPanel
          announcements={announcements}
          onViewAll={goToAnnouncements}
          onSelectAnnouncement={goToAnnouncements}
        />
      </div>
    </div>
  );
}


