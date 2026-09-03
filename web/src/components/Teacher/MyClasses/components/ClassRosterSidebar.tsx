'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { rosterForClass } from '../utils';
import styles from '../myClasses.module.css';

interface ClassRosterSidebarProps {
  cls: MyClassRow;
  onNavigate?: (request: TeacherNavRequest | string) => void;
  onInvite?: () => void;
}

export function ClassRosterSidebar({ cls, onNavigate, onInvite }: ClassRosterSidebarProps) {
  const roster = rosterForClass(cls, 6);
  const remaining = Math.max(0, cls.studentCount - roster.length);
  const classFocus = toClassFocus(cls);

  return (
    <aside className={styles.pulsePanel} aria-label="Class roster">
      <div className={styles.pulseHead}>
        <div>
          <p className={styles.pulseEyebrow}>People</p>
          <h3 className={styles.pulseTitle}>Roster</h3>
        </div>
        <div className={styles.pulseActions}>
          <button
            type="button"
            className={styles.pulseLink}
            onClick={() => onNavigate?.({ tab: 'Students', classFocus })}
          >
            View all ›
          </button>
        </div>
      </div>

      <div className={styles.avatarStack}>
        {roster.map((student, index) => (
          <span
            key={student.id}
            className={styles.stackAvatar}
            style={{
              zIndex: roster.length - index,
              background: student.avatarAccent,
              marginLeft: index === 0 ? 0 : -12,
            }}
            title={student.fullName}
          >
            {student.initials}
          </span>
        ))}
        {remaining > 0 ? (
          <span className={styles.stackMore} style={{ marginLeft: -12 }}>
            +{remaining}
          </span>
        ) : null}
      </div>

      <ul className={styles.pulseList}>
        {roster.slice(0, 4).map((student) => (
          <li key={student.id} className={styles.pulseListRow}>
            <span
              className={styles.pulseDot}
              style={{ background: student.avatarAccent }}
              aria-hidden
            />
            <span className={styles.pulseListPrimary}>{student.fullName}</span>
            <span className={styles.pulseMuted}>{student.attendanceRate}%</span>
          </li>
        ))}
      </ul>
      
      {onInvite && (
        <button 
          type="button" 
          className={styles.sidebarPrimaryBtn} 
          onClick={onInvite}
        >
          + Invite Student
        </button>
      )}
    </aside>
  );
}
