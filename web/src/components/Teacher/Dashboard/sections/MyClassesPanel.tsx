import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import type { ClassActivity, TeacherClass } from '@/types/teacherPortal';

interface MyClassesPanelProps {
  myClasses: TeacherClass[];
  classActivity: ClassActivity[];
}

export function MyClassesPanel({ myClasses, classActivity }: MyClassesPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.classesPanel}`}>
      <PanelHeader
        title="My Classes"
        right={
          <div className={styles.classesHeaderRight}>
            <span className={styles.classesCount}>{myClasses.length} active</span>
            <button type="button" className={styles.panelLink}>
              View all
            </button>
          </div>
        }
      />
      <div className={styles.classesGrid}>
        {myClasses.map((cls) => (
          <div key={cls.id} className={styles.classCard}>
            <div className={styles.classAccent} style={{ background: cls.accent }} />
            <div className={styles.classBody}>
              <div className={styles.classTop}>
                <div>
                  <p className={styles.classTitle}>{cls.title}</p>
                  <p className={styles.classSubject}>{cls.subject}</p>
                </div>
                <span
                  className={styles.classGradePill}
                  style={{ color: cls.accent, borderColor: `${cls.accent}66` }}
                >
                  {cls.avgGrade}
                </span>
              </div>

              <div className={styles.classStats}>
                <span className={styles.classStat}>
                  <span className={styles.classStatIcon}>👥</span>
                  {cls.students} Students
                </span>
                <span className={styles.classStat}>
                  <span className={styles.classStatIcon}>📅</span>
                  {cls.attendance}% Attendance
                </span>
              </div>

              <div className={styles.classAttendanceTrack}>
                <div
                  className={styles.classAttendanceFill}
                  style={{ width: `${cls.attendance}%`, background: cls.accent }}
                />
              </div>

              <p className={styles.classNext}>
                <span>Next</span> {cls.next}
              </p>

              <button type="button" className={styles.classOpenBtn}>
                Open Class ›
              </button>
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
              <p className={styles.classActivityText}>{act.text}</p>
              <span className={styles.classActivityTime}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
