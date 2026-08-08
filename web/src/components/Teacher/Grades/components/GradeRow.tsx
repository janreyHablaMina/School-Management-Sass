'use client';

import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  RowActionsMenu,
} from '../../shared';
import type { TeacherGradeRow } from '@/types/teacherGrades';
import {
  gradeLetterAccent,
  gradeScoreBarColor,
  gradeStatusAccent,
  gradeTrendAccent,
  gradeTrendLabel,
} from '../utils';
import styles from '../grades.module.css';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Gradebook' },
  { icon: '✎', label: 'Edit Scores' },
  { icon: '📄', label: 'Progress Report' },
  { icon: '📧', label: 'Message Parent' },
] as const;

const DANGER_ACTIONS = [{ icon: '🚩', label: 'Flag for Review' }] as const;

interface GradeRowProps {
  grade: TeacherGradeRow;
}

export function GradeRow({ grade }: GradeRowProps) {
  const letterColor = gradeLetterAccent(grade.letterGrade);
  const statusColor = gradeStatusAccent(grade.status);
  const scoreColor = gradeScoreBarColor(grade.overallScore);
  const trendColor = gradeTrendAccent(grade.trend);

  return (
    <tr>
      <td>
        <div className={styles.studentCell}>
          <div
            className={styles.avatar}
            style={{
              background: `${grade.avatarAccent}22`,
              color: grade.avatarAccent,
              borderColor: `${grade.avatarAccent}66`,
            }}
          >
            {grade.initials}
          </div>
          <div className={styles.studentMeta}>
            <p className={styles.studentName}>{grade.fullName}</p>
            <p className={styles.studentCode}>{grade.studentCode}</p>
          </div>
        </div>
      </td>
      <td>
        <ClassMeta classLabel={grade.classLabel} subject={grade.subject} />
      </td>
      <td>
        <span className={styles.termText}>{grade.term}</span>
      </td>
      <td>
        <div className={styles.scoreCell}>
          <span className={styles.scoreValue} style={{ color: scoreColor }}>
            {grade.overallScore.toFixed(1)}%
          </span>
          <div className={listStyles.progressTrack}>
            <div
              className={listStyles.progressFill}
              style={{ width: `${Math.min(grade.overallScore, 100)}%`, background: scoreColor }}
            />
          </div>
        </div>
      </td>
      <td>
        <span
          className={styles.letterBadge}
          style={{
            color: letterColor,
            borderColor: `${letterColor}88`,
            background: `${letterColor}18`,
          }}
        >
          {grade.letterGrade}
        </span>
      </td>
      <td>
        <div className={styles.breakdown}>
          <span>A {grade.assignmentsAvg}%</span>
          <span>Q {grade.quizzesAvg}%</span>
          <span>E {grade.examsAvg == null ? '—' : `${grade.examsAvg}%`}</span>
        </div>
      </td>
      <td>
        <span className={styles.trendText} style={{ color: trendColor }}>
          {gradeTrendLabel(grade.trend)}
        </span>
      </td>
      <td>
        <ChalkBadge label={grade.status} accent={statusColor} />
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${grade.fullName}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
