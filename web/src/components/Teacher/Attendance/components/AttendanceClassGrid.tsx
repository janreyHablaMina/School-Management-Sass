'use client';

import React from 'react';
import type { AttendanceClassSection } from '@/types/teacherAttendance';
import {
  DataTable,
  listStyles,
  ProgressStatCell,
  rateBarColor,
  type DataTableColumn,
} from '../../shared';
import styles from '../attendance.module.css';

interface AttendanceClassGridProps {
  classes: AttendanceClassSection[];
  onOpen: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'class', label: 'Class' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'students', label: 'Students' },
  { id: 'today', label: 'Today' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'actions', label: 'Actions' },
];

export function AttendanceClassGrid({ classes, onOpen }: AttendanceClassGridProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={920}>
      {classes.map((cls) => (
        <tr
          key={cls.id}
          className={listStyles.clickableRow}
          onClick={() => onOpen(cls.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onOpen(cls.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Open attendance for ${cls.subject}, ${cls.gradeSection}`}
        >
          <td>
            <div className={styles.classListTitle}>
              <span className={styles.classListSubject}>{cls.subject}</span>
              <span className={styles.classListSection}>{cls.gradeSection}</span>
            </div>
          </td>
          <td>
            <div className={listStyles.stackMeta}>
              <p className={listStyles.stackMetaPrimary}>{cls.schedule}</p>
              <p className={listStyles.stackMetaSecondary}>{cls.room}</p>
            </div>
          </td>
          <td>
            <span className={listStyles.scoreValue}>{cls.studentCount}</span>
          </td>
          <td>
            <div className={styles.classListStats}>
              <span className={styles.statPresent}>{cls.presentToday} Present</span>
              <span className={styles.statAbsent}>{cls.absentToday} Absent</span>
              <span className={styles.statLate}>{cls.lateToday} Late</span>
            </div>
          </td>
          <td>
            <ProgressStatCell
              current={cls.attendanceRate}
              total={100}
              barColor={rateBarColor(cls.attendanceRate)}
            />
          </td>
          <td>
            <span className={styles.classListCta}>Take attendance</span>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
