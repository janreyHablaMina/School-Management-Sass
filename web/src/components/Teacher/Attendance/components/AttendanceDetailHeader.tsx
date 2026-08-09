'use client';

import type { AttendanceClassSection } from '@/types/teacherAttendance';
import { ClassHubHeader, classHubStyles, listStyles } from '../../shared';

interface AttendanceDetailHeaderProps {
  cls: AttendanceClassSection;
  onBack: () => void;
  sessionActive: boolean;
  onStartAttendance: () => void;
}

export function AttendanceDetailHeader({
  cls,
  onBack,
  sessionActive,
  onStartAttendance,
}: AttendanceDetailHeaderProps) {
  return (
    <ClassHubHeader
      subject={cls.subject}
      icon={cls.icon}
      accent={cls.accent}
      onBack={onBack}
      meta={
        <>
          {cls.gradeSection}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.room}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.schedule}
        </>
      }
      actions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export
          </button>
          <button
            type="button"
            className={listStyles.primaryBtn}
            onClick={onStartAttendance}
            disabled={sessionActive}
            title={sessionActive ? 'A live session is already running' : 'Start location attendance'}
          >
            {sessionActive ? '● Session active' : '📍 Start Attendance'}
          </button>
        </>
      }
    />
  );
}
