'use client';

import type { MyClassRow } from '@/types/myClasses';
import { classHubStyles } from '../../shared';
import styles from '../myClasses.module.css';

interface ClassSpotlightProps {
  cls: MyClassRow;
}

export function ClassSpotlight({ cls }: ClassSpotlightProps) {
  const progress = Math.max(0, Math.min(100, cls.courseProgress));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (progress / 100) * circumference;
  const nextLesson = Math.min(cls.lessonsCompleted + 1, cls.lessonsTotal);

  return (
    <section className={styles.spotlight} aria-label="Class at a glance">
      <div className={styles.spotlightGlow} aria-hidden />
      <div className={styles.spotlightGrain} aria-hidden />

      <div className={styles.spotlightMain}>
        <p className={styles.spotlightEyebrow}>{cls.gradeSection}</p>
        <h2 className={styles.spotlightSchedule}>{cls.schedule}</h2>
        <p className={styles.spotlightMeta}>
          {cls.room}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.gradeLevel}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.academicYear}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.studentCount} students
        </p>
        <p className={styles.spotlightHint}>
          Next on deck — Lesson {nextLesson} of {cls.lessonsTotal}
        </p>
      </div>

      <div className={styles.spotlightProgress}>
        <div className={styles.progressRing} aria-hidden>
          <svg viewBox="0 0 100 100" className={styles.progressSvg}>
            <circle className={styles.progressTrackRing} cx="50" cy="50" r="42" />
            <circle
              className={styles.progressValueRing}
              cx="50"
              cy="50"
              r="42"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className={styles.progressCenter}>
            <span className={styles.progressBig}>{progress}%</span>
            <span className={styles.progressSmall}>done</span>
          </div>
        </div>
        <p className={styles.progressCaption}>{cls.attendanceRate}% attendance</p>
      </div>
    </section>
  );
}
