'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { lessonsForClass, rosterForClass } from '../utils';
import styles from '../myClasses.module.css';

interface ClassPulseProps {
  cls: MyClassRow;
  onNavigate?: (request: TeacherNavRequest | string) => void;
  onInvite?: () => void;
}

export function ClassPulse({ cls, onNavigate, onInvite }: ClassPulseProps) {
  const roster = rosterForClass(cls, 4);
  const lessons = lessonsForClass(cls, 3);
  const remaining = Math.max(0, cls.studentCount - roster.length);
  const classFocus = toClassFocus(cls);

  return (
    <section className={styles.pulse} aria-label="Class pulse">
      <div className={styles.pulsePanel}>
        <div className={styles.pulseHead}>
          <div>
            <p className={styles.pulseEyebrow}>People</p>
            <h3 className={styles.pulseTitle}>Roster</h3>
          </div>
          <div className={styles.pulseActions}>
            {onInvite ? (
              <button type="button" className={styles.pulseLink} onClick={onInvite}>
                Invite
              </button>
            ) : null}
            <button
              type="button"
              className={styles.pulseLink}
              onClick={() => onNavigate?.({ tab: 'Students', classFocus })}
            >
              View all ›
            </button>
          </div>
        </div>

        <div className={styles.avatarStack}>
          {roster.map((student, index) => (
            <span
              key={student.id}
              className={styles.stackAvatar}
              style={{
                zIndex: roster.length - index,
                background: student.avatarAccent,
                marginLeft: index === 0 ? 0 : -12,
              }}
              title={student.fullName}
            >
              {student.initials}
            </span>
          ))}
          {remaining > 0 ? (
            <span className={styles.stackMore} style={{ marginLeft: -12 }}>
              +{remaining}
            </span>
          ) : null}
        </div>

        <ul className={styles.pulseList}>
          {roster.map((student) => (
            <li key={student.id} className={styles.pulseListRow}>
              <span
                className={styles.pulseDot}
                style={{ background: student.avatarAccent }}
                aria-hidden
              />
              <span className={styles.pulseListPrimary}>{student.fullName}</span>
              <span className={styles.pulseMuted}>{student.attendanceRate}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.pulsePanel}>
        <div className={styles.pulseHead}>
          <div>
            <p className={styles.pulseEyebrow}>Curriculum</p>
            <h3 className={styles.pulseTitle}>Lessons</h3>
          </div>
          <button
            type="button"
            className={styles.pulseLink}
            onClick={() => onNavigate?.({ tab: 'Lessons', classFocus })}
          >
            Open ›
          </button>
        </div>

        {lessons.length === 0 ? (
          <p className={styles.pulseEmpty}>No lessons yet — generate one above.</p>
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
      </div>
    </section>
  );
}
