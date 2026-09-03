'use client';

import type { MyClassRow } from '@/types/myClasses';
import { listStyles, TeacherModal } from '../../shared';
import { parseScheduleParts } from '../utils';
import styles from '../myClasses.module.css';
import { WeeklyCalendarGrid } from './WeeklyCalendarGrid';

interface ClassScheduleModalProps {
  cls: MyClassRow;
  onClose: () => void;
  onEdit?: () => void;
  onOpenCalendar?: () => void;
}

export function ClassScheduleModal({
  cls,
  onClose,
  onEdit,
  onOpenCalendar,
}: ClassScheduleModalProps) {
  const isArchived = cls.status === 'Archived' || cls.schedule === 'Archived';
  
  // Build sessions array from flexible data, or fallback to the old string parsing
  let sessions = cls.sessions || [];
  if (sessions.length === 0 && !isArchived) {
    const parts = parseScheduleParts(cls.schedule);
    sessions = parts.days.map(day => ({
      day,
      startTime: parts.startTime,
      endTime: parts.endTime
    }));
  }

  return (
    <TeacherModal
      titleId="class-schedule-title"
      eyebrow="Class schedule"
      title={cls.subject}
      copy={`${cls.gradeSection} · Room ${cls.room}`}
      onClose={onClose}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
            Close
          </button>
          {onOpenCalendar ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onOpenCalendar}>
              Open Full Calendar
            </button>
          ) : null}
          {onEdit && !isArchived ? (
            <button type="button" className={listStyles.primaryBtn} onClick={onEdit}>
              Edit schedule
            </button>
          ) : null}
        </>
      }
    >
      <div style={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
        {isArchived ? (
          <p>This class is archived and has no active sessions.</p>
        ) : (
          <WeeklyCalendarGrid sessions={sessions} accentColor={cls.accent} />
        )}
      </div>
    </TeacherModal>
  );
}
