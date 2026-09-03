'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { lessonsForClass } from '../utils';
import styles from '../myClasses.module.css';

interface ClassCurriculumProps {
  cls: MyClassRow;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function ClassCurriculum({ cls, onNavigate }: ClassCurriculumProps) {
  const lessons = lessonsForClass(cls, 4);
  const classFocus = toClassFocus(cls);

  return (
    <section className={styles.pulsePanel} aria-label="Class curriculum">
      <div className={styles.pulseHead}>
        <div>
          <p className={styles.pulseEyebrow}>Curriculum</p>
          <h3 className={styles.pulseTitle}>Upcoming Lessons</h3>
        </div>
        <button
          type="button"
          className={styles.pulseLink}
          onClick={() => onNavigate?.({ tab: 'Lessons', classFocus })}
        >
          View all ›
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className={styles.pulseEmptyBox}>
          <p className={styles.pulseEmpty}>No lessons yet.</p>
          <button type="button" className={styles.emptyActionBtn} onClick={() => onNavigate?.({ tab: 'Lessons', classFocus })}>
            Create your first lesson
          </button>
        </div>
      ) : (
        <ol className={styles.lessonRail}>
          {lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              className={
                index === 0
                  ? `${styles.lessonRailItem} ${styles.lessonRailNext}`
                  : styles.lessonRailItem
              }
            >
              <span className={styles.lessonRailNum} style={{ color: cls.accent }}>
                {index === 0 ? '→' : String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.lessonRailBody}>
                <span className={styles.lessonRailTitle}>
                  {index === 0 ? <em className={styles.upNext}>Up next</em> : null}
                  {lesson.title}
                </span>
                <span className={styles.pulseMuted}>
                  {lesson.type} · {lesson.durationMins} min
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
