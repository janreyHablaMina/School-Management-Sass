'use client';

import { ChalkBadge, listStyles } from '../../shared';
import type { MyClassRow } from '@/types/myClasses';
import styles from '../myClasses.module.css';

interface ClassDetailHeaderProps {
  cls: MyClassRow;
  onBack: () => void;
  onAddLesson?: () => void;
}

export function ClassDetailHeader({ cls, onBack, onAddLesson }: ClassDetailHeaderProps) {
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
            <div className={styles.detailTitleRow}>
              <h1 className={styles.detailTitle}>{cls.subject}</h1>
              <ChalkBadge
                label={cls.status}
                accent={cls.status === 'Active' ? '#5cc789' : '#8a9a90'}
              />
            </div>
            <p className={styles.detailMeta}>
              {cls.gradeSection}
              <span className={styles.metaDot}>·</span>
              {cls.room}
              <span className={styles.metaDot}>·</span>
              {cls.academicYear}
            </p>
          </div>
        </div>

        <div className={styles.detailActions}>
          <button type="button" className={listStyles.secondaryBtn}>
            Edit Class
          </button>
          <button type="button" className={listStyles.primaryBtn} onClick={onAddLesson}>
            + Add Lesson
          </button>
        </div>
      </div>
    </header>
  );
}
