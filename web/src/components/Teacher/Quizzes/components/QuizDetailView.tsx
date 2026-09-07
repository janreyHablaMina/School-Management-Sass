'use client';

import type { TeacherQuizRow } from '@/types/teacherQuizzes';
import {
  ChalkBadge,
  DataTable,
  listStyles,
  ProgressStatCell,
  type DataTableColumn,
} from '../../shared';
import { attemptBarColor, quizStatusAccent } from '../utils';
import styles from './quizDetail.module.css';

interface QuizDetailViewProps {
  quiz: TeacherQuizRow;
  onBack: () => void;
}

interface QuizTakerRow {
  id: string;
  studentName: string;
  status: 'Completed' | 'In Progress' | 'Not Taken';
  score: number | null;
  durationMins: number | null;
  submittedAt: string | null;
}

const STUDENTS = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Davis',
  'Diana Prince',
  'Evan Wright',
  'Fatima Santos',
  'Gabriel Cruz',
  'Hannah Lee',
];

const COLUMNS: DataTableColumn[] = [
  { id: 'student', label: 'Student' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'duration', label: 'Duration' },
  { id: 'submitted', label: 'Submitted' },
];

function quizDurationMins(quiz: TeacherQuizRow) {
  return Math.max(10, quiz.questionCount * 2);
}

function generateTakers(quiz: TeacherQuizRow): QuizTakerRow[] {
  const visibleCount = Math.min(STUDENTS.length, Math.max(quiz.totalStudents, 5));
  return Array.from({ length: visibleCount }, (_, index) => {
    const completed = index < Math.min(quiz.attemptCount, visibleCount);
    const inProgress = !completed && quiz.status === 'Active' && index === Math.min(quiz.attemptCount, visibleCount);
    const score = completed
      ? Math.min(100, Math.max(60, Math.round((quiz.averageScore ?? 78) + ((index % 5) - 2) * 4)))
      : null;

    return {
      id: `${quiz.id}-${index}`,
      studentName: STUDENTS[index] ?? `Student ${index + 1}`,
      status: completed ? 'Completed' : inProgress ? 'In Progress' : 'Not Taken',
      score,
      durationMins: completed ? Math.max(8, quizDurationMins(quiz) - 5 + (index % 6)) : null,
      submittedAt: completed ? `${quiz.dueDate}, ${quiz.dueTime}` : null,
    };
  });
}

function statusAccent(status: QuizTakerRow['status']) {
  switch (status) {
    case 'Completed':
      return '#5cc789';
    case 'In Progress':
      return '#84a9ff';
    default:
      return '#ff8a8a';
  }
}

export function QuizDetailView({ quiz, onBack }: QuizDetailViewProps) {
  const attemptRate = Math.round((quiz.attemptCount / Math.max(quiz.totalStudents, 1)) * 100);
  const takers = generateTakers(quiz);
  const averageScore = quiz.averageScore == null ? 'No scores yet' : `${quiz.averageScore.toFixed(1)}%`;
  const duration = quizDurationMins(quiz);

  return (
    <div className={listStyles.page}>
      <button type="button" className={listStyles.backBtn} onClick={onBack}>
        <span aria-hidden>&lt;</span> Back to Quizzes
      </button>

      <section className={styles.header}>
        <div>
          <div className={styles.titleLine}>
            <h1 className={styles.title}>{quiz.title}</h1>
            <ChalkBadge label={quiz.status} accent={quizStatusAccent(quiz.status)} />
          </div>
          <p className={styles.description}>{quiz.description}</p>
          <div className={styles.badges}>
            <ChalkBadge label={quiz.classLabel} />
            <ChalkBadge label={quiz.subject} />
            <ChalkBadge label={quiz.type} accent={quiz.accent} />
          </div>
        </div>

        <div className={styles.schedule}>
          <span>Scheduled</span>
          <strong>{quiz.dueDate}</strong>
          <span>{quiz.dueTime}</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Average Score</span>
          <strong>{averageScore}</strong>
          <span>Across submitted attempts</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Taken</span>
          <strong>{quiz.attemptCount} / {quiz.totalStudents}</strong>
          <ProgressStatCell
            current={quiz.attemptCount}
            total={quiz.totalStudents}
            barColor={attemptBarColor(attemptRate)}
          />
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Duration</span>
          <strong>{duration} min</strong>
          <span>Estimated quiz time</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Questions</span>
          <strong>{quiz.questionCount}</strong>
          <span>{quiz.questionFormat}</span>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.sectionHeader}>
          <h2>Quiz Takers</h2>
          <span>{quiz.attemptCount} submitted</span>
        </div>

        <DataTable columns={COLUMNS} minWidth={820}>
          {takers.map((row) => (
            <tr key={row.id}>
              <td>
                <span className={styles.studentName}>{row.studentName}</span>
              </td>
              <td>
                <ChalkBadge label={row.status} accent={statusAccent(row.status)} />
              </td>
              <td>
                <span className={row.score == null ? styles.muted : styles.score}>
                  {row.score == null ? 'Pending' : `${row.score}%`}
                </span>
              </td>
              <td>
                <span className={styles.muted}>
                  {row.durationMins == null ? '-' : `${row.durationMins} min`}
                </span>
              </td>
              <td>
                <span className={styles.muted}>{row.submittedAt ?? '-'}</span>
              </td>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
  );
}
