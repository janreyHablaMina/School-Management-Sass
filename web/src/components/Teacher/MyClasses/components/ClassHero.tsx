'use client';

import type { MyClassRow } from '@/types/myClasses';
import { ChalkBadge, listStyles } from '../../shared';
import styles from '../myClasses.module.css';

interface ClassHeroProps {
  cls: MyClassRow;
  onBack: () => void;
  onEdit?: () => void;
  onInvite?: () => void;
  onAddLesson?: () => void;
}

export function ClassHero({
  cls,
  onBack,
  onEdit,
  onInvite,
  onAddLesson,
}: ClassHeroProps) {
  const progress = Math.max(0, Math.min(100, cls.courseProgress));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (progress / 100) * circumference;
  const nextLesson = Math.min(cls.lessonsCompleted + 1, cls.lessonsTotal);

  return (
    <section 
      className={styles.heroBanner}
      aria-label="Class hero"
      style={cls.coverImage ? { backgroundImage: `url(${cls.coverImage})` } : {}}
    >
      <div 
        className={styles.heroOverlay} 
        aria-hidden 
        style={{ backgroundColor: cls.coverImage ? 'rgba(11, 22, 16, 0.65)' : undefined }} 
      />
      
      {!cls.coverImage && (
        <div 
          className={styles.heroGlow} 
          aria-hidden 
          style={{ background: `radial-gradient(circle at 0% 0%, ${cls.accent}30, transparent 70%)` }} 
        />
      )}
      <div className={styles.heroGrain} aria-hidden />

      <div className={styles.heroTopNav}>
        <button type="button" className={listStyles.backBtn} onClick={onBack}>
          <span aria-hidden>‹</span> My Classes
        </button>
        <div className={styles.heroActions}>
          {onEdit && (
            <button type="button" className={listStyles.secondaryBtn} onClick={onEdit}>
              Edit Class
            </button>
          )}
          {onInvite && (
            <button type="button" className={listStyles.secondaryBtn} onClick={onInvite}>
              Invite Student
            </button>
          )}
          <button type="button" className={listStyles.primaryBtn} onClick={onAddLesson}>
            + Add Lesson
          </button>
        </div>
      </div>

      <div className={styles.heroMain}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitleRow}>
            <span className={styles.heroIcon}>{cls.icon}</span>
            <h1 className={styles.heroSubject}>{cls.subject}</h1>
            <ChalkBadge
              label={cls.status}
              accent={cls.status === 'Active' ? '#5cc789' : '#8a9a90'}
            />
          </div>
          
          <p className={styles.heroEyebrow} style={{ color: cls.accent }}>
            {cls.gradeSection}
          </p>
          <h2 className={styles.heroSchedule}>{cls.schedule}</h2>
          
          <div className={styles.heroFooter}>
            <p className={styles.heroMeta}>
              <span className={styles.metaBadge}>{cls.room}</span>
              <span className={styles.metaBadge}>{cls.gradeLevel}</span>
              <span className={styles.metaBadge}>{cls.academicYear}</span>
              <span className={styles.metaBadge}>{cls.studentCount} students</span>
            </p>
            <p className={styles.heroHint}>
              Next on deck — Lesson {nextLesson} of {cls.lessonsTotal}
            </p>
          </div>
        </div>

        <div className={styles.heroProgress}>
          <div className={styles.progressGlassCard}>
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
                  stroke={cls.accent}
                />
              </svg>
              <div className={styles.progressCenter}>
                <span className={styles.progressBig}>{progress}%</span>
                <span className={styles.progressSmall}>done</span>
              </div>
            </div>
            <p className={styles.progressCaption}>{cls.attendanceRate}% attendance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
