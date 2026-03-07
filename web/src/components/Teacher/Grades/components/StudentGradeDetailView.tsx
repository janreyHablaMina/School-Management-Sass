'use client';

import type { TeacherGradeRow } from '@/types/teacherGrades';
import { ChalkBadge, listStyles } from '../../shared';
import {
  gradeLetterAccent,
  gradeScoreBarColor,
  gradeStatusAccent,
  gradeTrendAccent,
  gradeTrendLabel,
} from '../utils';
import styles from '../grades.module.css';

interface StudentGradeDetailViewProps {
  grade: TeacherGradeRow;
  onBack: () => void;
}

export function StudentGradeDetailView({ grade, onBack }: StudentGradeDetailViewProps) {
  const letterColor = gradeLetterAccent(grade.letterGrade);
  const statusColor = gradeStatusAccent(grade.status);
  const scoreColor = gradeScoreBarColor(grade.overallScore);
  const trendColor = gradeTrendAccent(grade.trend);

  return (
    <div className={styles.gradeDetail}>
      <header className={styles.gradeDetailHero}>
        <div className={styles.gradeDetailTopBar}>
          <button type="button" className={styles.gradeDetailBack} onClick={onBack}>
            ← Back to gradebook
          </button>
          <div className={styles.gradeDetailActions}>
            <button type="button" className={listStyles.secondaryBtn}>
              Progress Report
            </button>
            <button type="button" className={listStyles.primaryBtn}>
              Edit Scores
            </button>
          </div>
        </div>

        <div className={styles.gradeDetailIdentity}>
          <div
            className={styles.gradeDetailAvatar}
            style={{
              background: `${grade.avatarAccent}22`,
              color: grade.avatarAccent,
              borderColor: `${grade.avatarAccent}77`,
            }}
          >
            {grade.initials}
          </div>
          <div className={styles.gradeDetailIdentityBody}>
            <div className={styles.gradeDetailTitleRow}>
              <h1 className={styles.gradeDetailName}>{grade.fullName}</h1>
              <ChalkBadge label={grade.status} accent={statusColor} />
            </div>
            <p className={styles.gradeDetailMeta}>
              {grade.classLabel}
              <span aria-hidden> · </span>
              {grade.subject}
              <span aria-hidden> · </span>
              {grade.studentCode}
            </p>
          </div>
        </div>

        <div className={styles.gradeDetailStatRow}>
          <div className={styles.gradeDetailStat}>
            <span className={styles.gradeDetailStatLabel}>Overall</span>
            <strong style={{ color: scoreColor }}>{grade.overallScore.toFixed(1)}%</strong>
          </div>
          <div className={styles.gradeDetailStat}>
            <span className={styles.gradeDetailStatLabel}>Letter</span>
            <strong style={{ color: letterColor }}>{grade.letterGrade}</strong>
          </div>
          <div className={styles.gradeDetailStat}>
            <span className={styles.gradeDetailStatLabel}>Trend</span>
            <strong style={{ color: trendColor }}>{gradeTrendLabel(grade.trend)}</strong>
          </div>
          <div className={styles.gradeDetailStat}>
            <span className={styles.gradeDetailStatLabel}>Term</span>
            <strong className={styles.gradeDetailStatSmall}>{grade.term}</strong>
          </div>
        </div>
      </header>

      <section className={styles.gradeDetailBody}>
        <div className={styles.gradeDetailBlock}>
          <p className={styles.gradeDetailEyebrow}>Breakdown</p>
          <h2 className={styles.gradeDetailBlockTitle}>Category averages</h2>
          <div className={styles.gradeBreakdownGrid}>
            <div className={styles.gradeBreakdownCard}>
              <span>Assignments</span>
              <strong style={{ color: gradeScoreBarColor(grade.assignmentsAvg) }}>
                {grade.assignmentsAvg}%
              </strong>
              <div className={listStyles.progressTrack}>
                <div
                  className={listStyles.progressFill}
                  style={{
                    width: `${Math.min(grade.assignmentsAvg, 100)}%`,
                    background: gradeScoreBarColor(grade.assignmentsAvg),
                  }}
                />
              </div>
            </div>
            <div className={styles.gradeBreakdownCard}>
              <span>Quizzes</span>
              <strong style={{ color: gradeScoreBarColor(grade.quizzesAvg) }}>
                {grade.quizzesAvg}%
              </strong>
              <div className={listStyles.progressTrack}>
                <div
                  className={listStyles.progressFill}
                  style={{
                    width: `${Math.min(grade.quizzesAvg, 100)}%`,
                    background: gradeScoreBarColor(grade.quizzesAvg),
                  }}
                />
              </div>
            </div>
            <div className={styles.gradeBreakdownCard}>
              <span>Exams</span>
              <strong
                style={{
                  color:
                    grade.examsAvg == null
                      ? 'rgba(240, 239, 237, 0.45)'
                      : gradeScoreBarColor(grade.examsAvg),
                }}
              >
                {grade.examsAvg == null ? '—' : `${grade.examsAvg}%`}
              </strong>
              <div className={listStyles.progressTrack}>
                <div
                  className={listStyles.progressFill}
                  style={{
                    width: `${Math.min(grade.examsAvg ?? 0, 100)}%`,
                    background:
                      grade.examsAvg == null
                        ? 'rgba(240, 239, 237, 0.2)'
                        : gradeScoreBarColor(grade.examsAvg),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.gradeDetailSide}>
          <div className={styles.gradeDetailBlock}>
            <p className={styles.gradeDetailEyebrow}>Record</p>
            <h2 className={styles.gradeDetailBlockTitle}>Standing</h2>
            <div className={styles.gradeFactList}>
              <div className={styles.gradeFact}>
                <span>Overall score</span>
                <strong>{grade.overallScore.toFixed(1)}%</strong>
              </div>
              <div className={styles.gradeFact}>
                <span>Letter grade</span>
                <strong>{grade.letterGrade}</strong>
              </div>
              <div className={styles.gradeFact}>
                <span>Status</span>
                <strong>{grade.status}</strong>
              </div>
              <div className={styles.gradeFact}>
                <span>Last updated</span>
                <strong>{grade.lastUpdated}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
