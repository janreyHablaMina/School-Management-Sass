'use client';

import type { TeacherExamRow } from '@/types/teacherExams';
import {
  ChalkBadge,
  DataTable,
  listStyles,
  ProgressStatCell,
  rateBarColor,
  type DataTableColumn,
} from '../../shared';
import { examStatusAccent, examTypeAccent } from '../utils';
import styles from './examDetail.module.css';

interface ExamDetailViewProps {
  exam: TeacherExamRow;
  onBack: () => void;
}

interface ExamTakerRow {
  id: string;
  studentName: string;
  status: 'Completed' | 'Taking' | 'Not Taken';
  score: number | null;
  duration: string | null;
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

function generateTakers(exam: TeacherExamRow): ExamTakerRow[] {
  const visibleCount = Math.min(STUDENTS.length, Math.max(exam.totalStudents, 5));
  return Array.from({ length: visibleCount }, (_, index) => {
    const completed = index < Math.min(exam.completedCount, visibleCount);
    const taking = !completed && exam.status === 'Ongoing' && index === Math.min(exam.completedCount, visibleCount);
    const score = completed
      ? Math.min(100, Math.max(60, Math.round((exam.averageScore ?? 78) + ((index % 5) - 2) * 4)))
      : null;

    return {
      id: `${exam.id}-${index}`,
      studentName: STUDENTS[index] ?? `Student ${index + 1}`,
      status: completed ? 'Completed' : taking ? 'Taking' : 'Not Taken',
      score,
      duration: completed ? exam.duration : null,
      submittedAt: completed ? `${exam.examDate}, ${exam.examTime}` : null,
    };
  });
}

function statusAccent(status: ExamTakerRow['status']) {
  switch (status) {
    case 'Completed':
      return '#5cc789';
    case 'Taking':
      return '#84a9ff';
    default:
      return '#ff8a8a';
  }
}

export function ExamDetailView({ exam, onBack }: ExamDetailViewProps) {
  const completionRate = Math.round((exam.completedCount / Math.max(exam.totalStudents, 1)) * 100);
  const takers = generateTakers(exam);
  const averageScore = exam.averageScore == null ? 'No scores yet' : `${exam.averageScore.toFixed(1)}%`;

  return (
    <div className={listStyles.page}>
      <button type="button" className={listStyles.backBtn} onClick={onBack}>
        <span aria-hidden>&lt;</span> Back to Exams
      </button>

      <section className={styles.header}>
        <div>
          <div className={styles.titleLine}>
            <h1 className={styles.title}>{exam.title}</h1>
            <ChalkBadge label={exam.status} accent={examStatusAccent(exam.status)} />
          </div>
          <p className={styles.description}>{exam.description}</p>
          <div className={styles.badges}>
            <ChalkBadge label={exam.classLabel} />
            <ChalkBadge label={exam.subject} />
            <ChalkBadge label={exam.type} accent={examTypeAccent(exam.type)} />
          </div>
        </div>

        <div className={styles.schedule}>
          <span>Scheduled</span>
          <strong>{exam.examDate}</strong>
          <span>{exam.examTime}</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Average Score</span>
          <strong>{averageScore}</strong>
          <span>Across submitted exams</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Completed</span>
          <strong>{exam.completedCount} / {exam.totalStudents}</strong>
          <ProgressStatCell
            current={exam.completedCount}
            total={exam.totalStudents}
            barColor={rateBarColor(completionRate)}
          />
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Duration</span>
          <strong>{exam.duration}</strong>
          <span>Exam window</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Type</span>
          <strong>{exam.type}</strong>
          <span>{exam.subject}</span>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.sectionHeader}>
          <h2>Exam Takers</h2>
          <span>{exam.completedCount} submitted</span>
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
                <span className={styles.muted}>{row.duration ?? '-'}</span>
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
