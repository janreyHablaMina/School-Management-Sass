'use client';

import React from 'react';
import { listStyles, RowActionsMenu } from '../../shared';
import { AttendanceRing } from './AttendanceRing';
import styles from '../myClasses.module.css';
import type { MyClassRow } from '@/types/myClasses';

const ROW_ACTIONS = [
  { icon: '🚪', label: 'Open Class' },
  { icon: '✏️', label: 'Edit Class' },
  { icon: '📄', label: 'Duplicate Class' },
  { icon: '📅', label: 'View Schedule' },
] as const;

const DANGER_ACTIONS = [{ icon: '📦', label: 'Archive Class' }] as const;

interface ClassRowProps {
  cls: MyClassRow;
}

export function ClassRow({ cls }: ClassRowProps) {
  return (
    <tr>
      <td>
        <div className={styles.classCell}>
          <div
            className={styles.classIcon}
            style={{
              background: `${cls.accent}22`,
              color: cls.accent,
              borderColor: `${cls.accent}55`,
            }}
          >
            {cls.icon}
          </div>
          <div className={styles.classMeta}>
            <p className={styles.classSubject}>{cls.subject}</p>
            <p className={styles.classSub}>
              {cls.gradeSection} · {cls.room}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className={styles.scheduleCell}>
          <span className={styles.cellIcon}>📅</span>
          <span>{cls.schedule}</span>
        </div>
      </td>
      <td>
        <div className={styles.studentsCell}>
          <span className={styles.cellIcon}>👤</span>
          <span>{cls.studentCount} Students</span>
        </div>
      </td>
      <td>
        <AttendanceRing value={cls.attendanceRate} color={cls.accent} />
      </td>
      <td>
        <div className={styles.progressCell}>
          <div className={styles.progressTop}>
            <span className={styles.progressPct}>{cls.courseProgress}%</span>
            <span className={styles.progressLabel}>
              Lesson {cls.lessonsCompleted} of {cls.lessonsTotal}
            </span>
          </div>
          <div className={listStyles.progressTrack}>
            <div
              className={listStyles.progressFill}
              style={{ width: `${cls.courseProgress}%`, background: cls.accent }}
            />
          </div>
        </div>
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${cls.subject}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
