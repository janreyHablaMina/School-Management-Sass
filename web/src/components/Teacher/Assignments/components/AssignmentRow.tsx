'use client';

import React, { useState } from 'react';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
} from '@/components/ui/ActionDropdown';
import { listStyles } from '../../shared';
import {
  assignmentStatusAccent,
  assignmentTypeAccent,
  submissionBarColor,
} from '../utils';
import styles from '../assignments.module.css';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';

const ROW_ACTIONS = [
  '👁 View Assignment',
  '✎ Edit Assignment',
  '📊 View Submissions',
  '📋 Duplicate Assignment',
] as const;

interface AssignmentRowProps {
  assignment: TeacherAssignmentRow;
}

export function AssignmentRow({ assignment }: AssignmentRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const typeColor = assignmentTypeAccent(assignment.type);
  const statusColor = assignmentStatusAccent(assignment.status);
  const submissionRate = Math.round(
    (assignment.submittedCount / assignment.totalStudents) * 100
  );
  const barColor = submissionBarColor(submissionRate);

  return (
    <tr>
      <td>
        <div className={styles.assignmentCell}>
          <div
            className={styles.assignmentIcon}
            style={{
              background: `${assignment.accent}22`,
              color: assignment.accent,
              borderColor: `${assignment.accent}55`,
            }}
          >
            {assignment.icon}
          </div>
          <div className={styles.assignmentMeta}>
            <p className={styles.assignmentTitle}>{assignment.title}</p>
            <p className={styles.assignmentDesc}>{assignment.description}</p>
          </div>
        </div>
      </td>
      <td>
        <div className={styles.classCell}>
          <p className={styles.classLabel}>{assignment.classLabel}</p>
          <p className={styles.classSubject}>{assignment.subject}</p>
        </div>
      </td>
      <td>
        <span
          className={styles.typeBadge}
          style={{
            color: typeColor,
            borderColor: `${typeColor}88`,
            background: `${typeColor}18`,
          }}
        >
          {assignment.type}
        </span>
      </td>
      <td>
        <div className={styles.dueCell}>
          <span className={styles.dueIcon}>📅</span>
          <span>{assignment.dueDate}</span>
        </div>
      </td>
      <td>
        <div className={styles.submissionsCell}>
          <div className={styles.submissionsTop}>
            <span className={styles.submissionsCount}>
              {assignment.submittedCount} / {assignment.totalStudents}
            </span>
            <span className={styles.submissionsPct}>{submissionRate}%</span>
          </div>
          <div className={listStyles.progressTrack}>
            <div
              className={listStyles.progressFill}
              style={{ width: `${submissionRate}%`, background: barColor }}
            />
          </div>
        </div>
      </td>
      <td>
        {assignment.averageScore == null ? (
          <span className={styles.scoreEmpty}>—</span>
        ) : (
          <span className={styles.scoreValue}>{assignment.averageScore.toFixed(1)}%</span>
        )}
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
          {assignment.status}
        </span>
      </td>
      <td>
        <div className={listStyles.actionsCell}>
          <div className={listStyles.menuWrap}>
            <button
              type="button"
              className={listStyles.moreBtn}
              aria-label={`More actions for ${assignment.title}`}
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
                📦 Archive Assignment
              </ActionDropdownItem>
              <ActionDropdownItem isDanger onClick={closeMenu}>
                🗑 Delete Assignment
              </ActionDropdownItem>
            </ActionDropdown>
          </div>
        </div>
      </td>
    </tr>
  );
}
