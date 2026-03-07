'use client';

import type { TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, RowActionsMenu } from '../../shared';
import { attendanceBarColor, letterGradeAccent, statusAccent } from '../utils';
import styles from '../students.module.css';
import { StudentAvatar } from './StudentAvatar';

const ROW_ACTIONS = [
  { icon: '👤', label: 'View Profile' },
  { icon: '✏️', label: 'Edit Student' },
  { icon: '📧', label: 'Message Parent' },
  { icon: '📊', label: 'View Grades' },
] as const;

interface StudentRowProps {
  student: TeacherStudentRow;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onEdit?: (id: string) => void;
  onViewGrades?: (id: string) => void;
  onMessage?: (id: string) => void;
  onMarkInactive?: (id: string) => void;
  onRestoreActive?: (id: string) => void;
}

export function StudentRow({
  student,
  selected,
  onToggleSelect,
  onOpen,
  onEdit,
  onViewGrades,
  onMessage,
  onMarkInactive,
  onRestoreActive,
}: StudentRowProps) {
  const letterColor = letterGradeAccent(student.letterGrade);
  const statusColor = statusAccent(student.status);
  const attendanceColor = attendanceBarColor(student.attendanceRate);
  const isInactive = student.status === 'Inactive';

  const dangerActions = isInactive
    ? ([{ icon: '♻️', label: 'Restore Active' }] as const)
    : ([{ icon: '🚫', label: 'Mark Inactive' }] as const);

  return (
    <tr
      className={`${styles.clickableRow}${selected ? ` ${styles.rowSelected}` : ''}`}
      onClick={() => onOpen(student.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(student.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open profile for ${student.fullName}`}
    >
      <td
        className={styles.checkCell}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={selected}
          onChange={() => onToggleSelect(student.id)}
          aria-label={`Select ${student.fullName}`}
        />
      </td>
      <td>
        <div className={styles.studentCell}>
          <StudentAvatar student={student} size="row" />
          <div className={styles.studentMeta}>
            <p className={styles.studentName}>{student.fullName}</p>
            <p className={styles.studentCode}>{student.studentCode}</p>
          </div>
        </div>
      </td>
      <td>
        <span className={styles.idNumber}>{student.idNumber}</span>
      </td>
      <td>
        <div className={styles.classCell}>
          <p className={styles.classLabel}>{student.classLabel}</p>
          <p className={styles.classSubject}>{student.subject}</p>
        </div>
      </td>
      <td>
        <div className={styles.contactCell}>
          <p className={styles.contactPrimary}>{student.phone}</p>
          <p className={styles.contactSecondary}>{student.email}</p>
        </div>
      </td>
      <td>
        <div className={styles.attendanceCell}>
          <span className={styles.attendancePct}>{student.attendanceRate}%</span>
          <div className={listStyles.progressTrack}>
            <div
              className={listStyles.progressFill}
              style={{ width: `${student.attendanceRate}%`, background: attendanceColor }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className={styles.gradeCell}>
          <span className={styles.gradeValue}>{student.averageGrade.toFixed(1)}</span>
          <span
            className={styles.letterBadge}
            style={{
              color: letterColor,
              borderColor: `${letterColor}88`,
              background: `${letterColor}18`,
            }}
          >
            {student.letterGrade}
          </span>
        </div>
      </td>
      <td>
        <span
          className={styles.statusBadge}
          style={{
            color: statusColor,
            borderColor: `${statusColor}88`,
            background: `${statusColor}18`,
          }}
        >
          {student.status}
        </span>
      </td>
      <td
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <RowActionsMenu
          label={`More actions for ${student.fullName}`}
          actions={ROW_ACTIONS}
          dangerActions={dangerActions}
          onAction={(label) => {
            if (label === 'View Profile') onOpen(student.id);
            if (label === 'Edit Student') onEdit?.(student.id);
            if (label === 'View Grades') onViewGrades?.(student.id);
            if (label === 'Message Parent') onMessage?.(student.id);
            if (label === 'Mark Inactive') onMarkInactive?.(student.id);
            if (label === 'Restore Active') onRestoreActive?.(student.id);
          }}
        />
      </td>
    </tr>
  );
}
