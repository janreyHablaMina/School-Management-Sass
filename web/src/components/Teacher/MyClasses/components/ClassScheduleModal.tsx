'use client';

import type { MyClassRow } from '@/types/myClasses';
import { listStyles, TeacherModal } from '../../shared';
import { CLASS_WEEKDAYS, parseScheduleParts } from '../utils';
import styles from '../myClasses.module.css';

interface ClassScheduleModalProps {
  cls: MyClassRow;
  onClose: () => void;
  onEdit?: () => void;
  onOpenCalendar?: () => void;
}

function formatInputTime(value: string): string {
  const [hourRaw, minute = '00'] = value.split(':');
  const hour = Number(hourRaw);
  if (Number.isNaN(hour)) return value;
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

export function ClassScheduleModal({
  cls,
  onClose,
  onEdit,
  onOpenCalendar,
}: ClassScheduleModalProps) {
  const isArchived = cls.status === 'Archived' || cls.schedule === 'Archived';
  const parts = parseScheduleParts(cls.schedule);
  const meetingDays = new Set(parts.days);
  const timeLabel = isArchived
    ? 'No active sessions'
    : `${formatInputTime(parts.startTime)} – ${formatInputTime(parts.endTime)}`;

  return (
    <TeacherModal
      titleId="class-schedule-title"
      eyebrow="Class schedule"
      title={cls.subject}
      copy={`${cls.gradeSection} · ${cls.academicYear}`}
      onClose={onClose}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
            Close
          </button>
          {onOpenCalendar ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onOpenCalendar}>
              Open Calendar
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
      <div className={styles.scheduleHero} style={{ borderColor: `${cls.accent}55` }}>
        <div
          className={styles.scheduleHeroIcon}
          style={{
            background: `${cls.accent}22`,
            color: cls.accent,
            borderColor: `${cls.accent}66`,
          }}
        >
          {cls.icon}
        </div>
        <div className={styles.scheduleHeroBody}>
          <p className={styles.scheduleHeroLabel}>Weekly meeting time</p>
          <p className={styles.scheduleHeroTime}>{timeLabel}</p>
          <p className={styles.scheduleHeroMeta}>
            {cls.room}
            <span aria-hidden> · </span>
            {cls.status}
          </p>
        </div>
      </div>

      <div className={styles.scheduleWeek}>
        <p className={styles.scheduleWeekLabel}>This week</p>
        <div className={styles.scheduleDayRow}>
          {CLASS_WEEKDAYS.map((day) => {
            const active = !isArchived && meetingDays.has(day);
            return (
              <div
                key={day}
                className={`${styles.scheduleDay} ${active ? styles.scheduleDayActive : ''}`}
                style={
                  active
                    ? {
                        borderColor: `${cls.accent}88`,
                        background: `${cls.accent}18`,
                        color: cls.accent,
                      }
                    : undefined
                }
              >
                <span className={styles.scheduleDayName}>{day}</span>
                <span className={styles.scheduleDayMark}>{active ? '●' : '–'}</span>
              </div>
            );
          })}
        </div>
      </div>

      <ul className={styles.scheduleFacts}>
        <li>
          <span>Days</span>
          <strong>{isArchived ? 'Archived' : parts.days.join(', ')}</strong>
        </li>
        <li>
          <span>Time</span>
          <strong>{timeLabel}</strong>
        </li>
        <li>
          <span>Room</span>
          <strong>{cls.room}</strong>
        </li>
        <li>
          <span>Section</span>
          <strong>{cls.gradeSection}</strong>
        </li>
      </ul>
    </TeacherModal>
  );
}
