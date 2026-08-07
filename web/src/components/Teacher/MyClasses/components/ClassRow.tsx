'use client';

import React, { useState } from 'react';
import styles from '../myClasses.module.css';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
} from '@/components/ui/ActionDropdown';
import { AttendanceRing } from './AttendanceRing';
import type { MyClassRow } from '@/types/myClasses';

const ROW_ACTIONS = [
  '🚪 Open Class',
  '✏️ Edit Class',
  '📄 Duplicate Class',
  '📅 View Schedule',
] as const;

interface ClassRowProps {
  cls: MyClassRow;
}

export function ClassRow({ cls }: ClassRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${cls.courseProgress}%`, background: cls.accent }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className={styles.actionsCell}>
          <div className={styles.menuWrap}>
            <button
              type="button"
              className={styles.moreBtn}
              aria-label={`More actions for ${cls.subject}`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              ⋮
            </button>
            <ActionDropdown isOpen={menuOpen} onClose={closeMenu}>
              {ROW_ACTIONS.map((label) => (
                <ActionDropdownItem key={label} onClick={closeMenu}>
                  {label}
                </ActionDropdownItem>
              ))}
              <ActionDropdownSeparator />
              <ActionDropdownItem isDanger onClick={closeMenu}>
                📦 Archive Class
              </ActionDropdownItem>
            </ActionDropdown>
          </div>
        </div>
      </td>
    </tr>
  );
}
