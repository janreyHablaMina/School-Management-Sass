'use client';

import React from 'react';
import type { GradeClassSection } from '@/types/teacherGrades';
import styles from '../grades.module.css';

interface GradeClassCardProps {
  cls: GradeClassSection;
  onOpen: (id: string) => void;
}

export function GradeClassCard({ cls, onOpen }: GradeClassCardProps) {
  return (
    <button
      type="button"
      className={styles.classCard}
      onClick={() => onOpen(cls.id)}
      style={{ borderColor: `${cls.accent}55` }}
    >
      <div className={styles.classCardTop}>
        <div
          className={styles.classIcon}
          style={{
            background: `${cls.accent}22`,
            color: cls.accent,
            borderColor: `${cls.accent}66`,
          }}
        >
          {cls.icon}
        </div>
        <div className={styles.classCardRate}>
          <span className={styles.classCardRateValue} style={{ color: cls.accent }}>
            {cls.classAverage.toFixed(1)}%
          </span>
          <span className={styles.classCardRateLabel}>Average</span>
        </div>
      </div>

      <div className={styles.classCardBody}>
        <h3 className={styles.classCardTitle}>{cls.subject}</h3>
        <p className={styles.classCardSection}>{cls.gradeSection}</p>
        <p className={styles.classCardMeta}>
          {cls.room} · {cls.schedule}
        </p>
      </div>

      <div className={styles.classCardStats}>
        <span className={styles.statPass}>{cls.passingRate}% Passing</span>
        <span className={styles.statAttention}>{cls.needsAttention} At risk</span>
        <span className={styles.statIncomplete}>{cls.incomplete} Incomplete</span>
      </div>

      <div className={styles.classCardFooter}>
        <span>{cls.studentCount} students</span>
        <span className={styles.classCardCta}>Open gradebook →</span>
      </div>
    </button>
  );
}
