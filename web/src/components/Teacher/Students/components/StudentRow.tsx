'use client';

import React, { useState } from 'react';
import styles from '../students.module.css';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
} from '@/components/ui/ActionDropdown';
import { attendanceBarColor, letterGradeAccent, statusAccent } from '../utils';
import type { TeacherStudentRow } from '@/types/teacherStudents';

const ROW_ACTIONS = [
  '👤 View Profile',
  '✏️ Edit Student',
  '📧 Message Parent',
  '📊 View Grades',
] as const;

interface StudentRowProps {
  student: TeacherStudentRow;
}

export function StudentRow({ student }: StudentRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const letterColor = letterGradeAccent(student.letterGrade);
  const statusColor = statusAccent(student.status);
  const attendanceColor = attendanceBarColor(student.attendanceRate);

  return (
    <tr>
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
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
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
      <td>
        <div className={styles.actionsCell}>
          <div className={styles.menuWrap}>
            <button
              type="button"
              className={styles.moreBtn}
              aria-label={`More actions for ${student.fullName}`}
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
                🚫 Mark Inactive
              </ActionDropdownItem>
            </ActionDropdown>
          </div>
        </div>
      </td>
    </tr>
  );
}
