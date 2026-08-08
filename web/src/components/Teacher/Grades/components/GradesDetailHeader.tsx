'use client';

import React from 'react';
import { listStyles } from '../../shared';
import type { GradeClassSection } from '@/types/teacherGrades';
import styles from '../grades.module.css';

interface GradesDetailHeaderProps {
  cls: GradeClassSection;
  onBack: () => void;
}

export function GradesDetailHeader({ cls, onBack }: GradesDetailHeaderProps) {
  return (
    <header className={styles.detailHeader}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        ← All classes
      </button>

      <div className={styles.detailHeaderRow}>
        <div className={styles.detailIdentity}>
          <div
            className={styles.detailIcon}
            style={{
              background: `${cls.accent}22`,
              color: cls.accent,
              borderColor: `${cls.accent}66`,
            }}
          >
            {cls.icon}
          </div>
          <div>
            <h1 className={styles.detailTitle}>{cls.subject}</h1>
            <p className={styles.detailMeta}>
              {cls.gradeSection}
              <span className={styles.metaDot}>·</span>
              {cls.room}
              <span className={styles.metaDot}>·</span>
              Avg {cls.classAverage.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className={styles.detailActions}>
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export Grades
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Enter Grades
          </button>
        </div>
      </div>
    </header>
  );
}
