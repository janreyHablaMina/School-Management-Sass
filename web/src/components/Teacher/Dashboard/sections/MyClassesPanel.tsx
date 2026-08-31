import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { ClassActivity, TeacherClass } from '@/types/teacherPortal';

interface MyClassesPanelProps {
  myClasses: TeacherClass[];
  classActivity: ClassActivity[];
  onViewAll?: () => void;
}

export function MyClassesPanel({
  myClasses,
  classActivity,
  onViewAll,
}: MyClassesPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.classesPanel}`}>
      <PanelHeader
        title="My Classes"
        right={
          <div className={styles.classesHeaderRight}>
            <span className={styles.classesCount}>{myClasses.length} active</span>
            <button type="button" className={styles.panelLink} onClick={onViewAll}>
              View all
            </button>
          </div>
        }
      />
      <div className={styles.classesList}>
        {myClasses.map((cls) => (
          <div key={cls.id} className={styles.classRow}>
            <div className={styles.classAccentDot} style={{ background: cls.accent, boxShadow: `0 0 8px ${cls.accent}40` }} />
            <div className={styles.classInfo}>
              <p className={styles.classTitle}>{cls.title}</p>
              <p className={styles.classSubject}>{cls.subject}</p>
            </div>
            <div className={styles.classMeta}>
              <span className={styles.classStat}>{cls.students} Students</span>
              <span
                className={styles.classGradePill}
                style={{ color: cls.accent, borderColor: `${cls.accent}40`, background: `${cls.accent}15` }}
              >
                Avg: {cls.avgGrade}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.classActivityBlock}>
        <div className={styles.overviewSubHeader}>
          <span>Recent Class Activity</span>
        </div>
        <div className={styles.classActivityList}>
          {classActivity.map((act) => (
            <div key={act.id} className={styles.classActivityRow}>
              <span className={styles.classActivityDot} style={{ background: act.accent }} />
              <div className={styles.classActivityContent}>
                <p className={styles.classActivitySubject} style={{ color: act.accent }}>{act.subject}</p>
                <p className={styles.classActivityText}>{act.text}</p>
              </div>
              <span className={styles.classActivityTime}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
