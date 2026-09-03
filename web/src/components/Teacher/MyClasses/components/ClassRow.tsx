'use client';

import { listStyles, RowActionsMenu, RowSelectCell } from '../../shared';
import type { MyClassRow } from '@/types/myClasses';
import { AttendanceRing } from './AttendanceRing';
import styles from '../myClasses.module.css';

const ACTIVE_ACTIONS = [
  { icon: '🚪', label: 'Open Class' },
  { icon: '✏️', label: 'Edit Class' },
  { icon: '📨', label: 'Invite Students' },
  { icon: '📄', label: 'Duplicate Class' },
  { icon: '📅', label: 'View Schedule' },
] as const;

const ARCHIVED_ACTIONS = [
  { icon: '🚪', label: 'Open Class' },
  { icon: '📄', label: 'Duplicate Class' },
  { icon: '📅', label: 'View Schedule' },
  { icon: '♻️', label: 'Restore Class' },
] as const;

interface ClassRowProps {
  cls: MyClassRow;
  selected: boolean;
  onToggleSelect: (id: number) => void;
  onOpen: (id: number) => void;
  onEdit: (id: number) => void;
  onInvite: (id: number) => void;
  onDuplicate: (id: number) => void;
  onViewSchedule: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  isHighlighted?: boolean;
}

export function ClassRow({
  cls,
  selected,
  onToggleSelect,
  onOpen,
  onEdit,
  onInvite,
  onDuplicate,
  onViewSchedule,
  onArchive,
  onRestore,
  isHighlighted,
}: ClassRowProps) {
  const isArchived = cls.status === 'Archived';

  return (
    <tr
      className={`${styles.clickableRow}${selected ? ` ${listStyles.rowSelected}` : ''}${isHighlighted ? ` ${styles.highlightedRow}` : ''}`}
      onClick={() => onOpen(cls.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(cls.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${cls.subject}, ${cls.gradeSection}`}
    >
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggleSelect(cls.id)}
        label={`Select ${cls.subject}, ${cls.gradeSection}`}
      />
      <td>
        <div className={styles.classCell}>
          <div
            className={styles.classIcon}
            style={
              cls.coverImage
                ? {
                    backgroundImage: `url(${cls.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: 'none',
                  }
                : {
                    background: `${cls.accent}22`,
                    color: cls.accent,
                    borderColor: `${cls.accent}55`,
                  }
            }
          >
            {!cls.coverImage && cls.icon}
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
      <td
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <RowActionsMenu
          label={`More actions for ${cls.subject}`}
          actions={isArchived ? ARCHIVED_ACTIONS : ACTIVE_ACTIONS}
          dangerActions={
            isArchived ? [] : [{ icon: '📦', label: 'Archive Class' }]
          }
          onAction={(label) => {
            if (label === 'Open Class') onOpen(cls.id);
            if (label === 'Edit Class') onEdit(cls.id);
            if (label === 'Invite Students') onInvite(cls.id);
            if (label === 'Duplicate Class') onDuplicate(cls.id);
            if (label === 'View Schedule') onViewSchedule(cls.id);
            if (label === 'Archive Class') onArchive(cls.id);
            if (label === 'Restore Class') onRestore(cls.id);
          }}
        />
      </td>
    </tr>
  );
}
