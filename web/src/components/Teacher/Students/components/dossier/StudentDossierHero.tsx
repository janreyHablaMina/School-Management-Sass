'use client';

import type { TeacherStudentRow } from '@/types/teacherStudents';
import { ChalkBadge, listStyles } from '../../../shared';
import {
  attendanceBarColor,
  letterGradeAccent,
  statusAccent,
} from '../../utils';
import styles from '../../students.module.css';

interface StudentDossierHeroProps {
  student: TeacherStudentRow;
  onBack: () => void;
  onContact?: () => void;
  onViewGrades?: () => void;
}

export function StudentDossierHero({
  student,
  onBack,
  onContact,
  onViewGrades,
}: StudentDossierHeroProps) {
  const statusColor = statusAccent(student.status);
  const letterColor = letterGradeAccent(student.letterGrade);
  const attendColor = attendanceBarColor(student.attendanceRate);

  return (
    <header className={styles.dossierHero}>
      <div className={styles.dossierTopBar}>
        <button type="button" className={styles.dossierBack} onClick={onBack}>
          ← All students
        </button>
        <div className={styles.dossierTopActions}>
          {onContact ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onContact}>
              Contact Parent
            </button>
          ) : null}
          {onViewGrades ? (
            <button type="button" className={listStyles.primaryBtn} onClick={onViewGrades}>
              View Grades
            </button>
          ) : null}
        </div>
      </div>

      <div className={styles.dossierIdentity}>
        <div
          className={styles.dossierAvatar}
          style={{
            background: `${student.avatarAccent}22`,
            color: student.avatarAccent,
            borderColor: `${student.avatarAccent}77`,
          }}
        >
          {student.initials}
        </div>

        <div className={styles.dossierIdentityBody}>
          <div className={styles.dossierTitleRow}>
            <h1 className={styles.dossierName}>{student.fullName}</h1>
            <ChalkBadge label={student.status} accent={statusColor} />
          </div>
          <p className={styles.dossierMeta}>
            {student.classLabel}
            <span aria-hidden> · </span>
            {student.subject}
            <span aria-hidden> · </span>
            {student.studentCode}
          </p>
        </div>
      </div>

      <div className={styles.dossierStatRow}>
        <div className={styles.dossierStat}>
          <span className={styles.dossierStatLabel}>Average</span>
          <strong style={{ color: letterColor }}>
            {student.averageGrade.toFixed(1)}
            <span className={styles.dossierStatSuffix}>{student.letterGrade}</span>
          </strong>
        </div>
        <div className={styles.dossierStat}>
          <span className={styles.dossierStatLabel}>Attendance</span>
          <strong style={{ color: attendColor }}>{student.attendanceRate}%</strong>
        </div>
        <div className={styles.dossierStat}>
          <span className={styles.dossierStatLabel}>Age</span>
          <strong>{student.details.age}</strong>
        </div>
        <div className={styles.dossierStat}>
          <span className={styles.dossierStatLabel}>Enrolled</span>
          <strong className={styles.dossierStatSmall}>{student.details.enrollmentDate}</strong>
        </div>
      </div>
    </header>
  );
}
