'use client';

import React, { useState } from 'react';
import styles from './myClasses.module.css';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
} from '@/components/ui/ActionDropdown';
import type { MyClassRow } from '@/types/myClasses';

interface ClassesTableProps {
  classes: MyClassRow[];
}

function AttendanceRing({ value, color }: { value: number; color: string }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.attendanceCell}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="rgba(240, 239, 237, 0.12)"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span>{value}%</span>
    </div>
  );
}

function ClassRow({ cls }: { cls: MyClassRow }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr>
      <td>
        <div className={styles.classCell}>
          <div
            className={styles.classIcon}
            style={{ background: `${cls.accent}22`, color: cls.accent, borderColor: `${cls.accent}55` }}
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
        <div className={styles.nextCell}>
          <span className={styles.nextType}>{cls.nextActivity.type}</span>
          <p className={styles.nextTitle}>{cls.nextActivity.title}</p>
          <p className={styles.nextWhen}>{cls.nextActivity.when}</p>
        </div>
      </td>
      <td>
        <div className={styles.actionsCell}>
          <button type="button" className={styles.openBtn}>
            Open Class
          </button>
          <div className={styles.menuWrap}>
            <button
              type="button"
              className={styles.moreBtn}
              aria-label={`More actions for ${cls.subject}`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              ⋮
            </button>
            <ActionDropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
              <ActionDropdownItem onClick={() => setMenuOpen(false)}>✏️ Edit Class</ActionDropdownItem>
              <ActionDropdownItem onClick={() => setMenuOpen(false)}>📄 Duplicate Class</ActionDropdownItem>
              <ActionDropdownItem onClick={() => setMenuOpen(false)}>📅 View Schedule</ActionDropdownItem>
              <ActionDropdownSeparator />
              <ActionDropdownItem isDanger onClick={() => setMenuOpen(false)}>
                📦 Archive Class
              </ActionDropdownItem>
            </ActionDropdown>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function ClassesTable({ classes }: ClassesTableProps) {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Schedule</th>
              <th>Students</th>
              <th>Attendance</th>
              <th>Progress</th>
              <th>Next Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <ClassRow key={cls.id} cls={cls} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
