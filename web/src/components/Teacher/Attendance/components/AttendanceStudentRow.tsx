'use client';

import React from 'react';
import { ChalkBadge, listStyles, RowActionsMenu, RowSelectCell } from '../../shared';
import type { AttendanceStudentRow as AttendanceStudentRowType } from '@/types/teacherAttendance';
import { attendanceStatusAccent } from '../utils';
import styles from '../attendance.module.css';

const ROW_ACTIONS = [
  { icon: '✅', label: 'Mark Present' },
  { icon: '❌', label: 'Mark Absent' },
  { icon: '⏰', label: 'Mark Late' },
  { icon: '📝', label: 'Add Note' },
] as const;

interface AttendanceStudentRowProps {
  student: AttendanceStudentRowType;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function AttendanceStudentRow({
  student,
  selected,
  onToggle,
}: AttendanceStudentRowProps) {
  const statusAccent = attendanceStatusAccent(student.status);

  return (
    <tr className={selected ? listStyles.rowSelected : undefined}>
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggle(student.id)}
        label={`Select ${student.fullName}`}
      />
      <td>
        <div className={styles.studentCell}>
          <div
            className={styles.avatar}
            style={{
              background: `${student.avatarAccent}22`,
              color: student.avatarAccent,
              borderColor: `${student.avatarAccent}66`,
            }}
          >
            {student.initials}
          </div>
          <div className={styles.studentMeta}>
            <p className={styles.studentName}>{student.fullName}</p>
            <p className={styles.studentCode}>{student.studentCode}</p>
          </div>
        </div>
      </td>
      <td>
        <ChalkBadge label={student.status} accent={statusAccent} />
      </td>
      <td>
        <span className={student.time ? styles.timeText : styles.muted}>
          {student.time ?? '—'}
        </span>
      </td>
      <td>
        <span className={student.notes ? styles.notesText : styles.muted}>
          {student.notes ?? '—'}
        </span>
      </td>
      <td>
        <RowActionsMenu label={`Actions for ${student.fullName}`} actions={ROW_ACTIONS} />
      </td>
    </tr>
  );
}
