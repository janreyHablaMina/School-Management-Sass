'use client';

import type { TeacherQuizRow } from '@/types/teacherQuizzes';
import {
  AssessmentDetailPage,
  ASSESSMENT_RESULT_COLUMNS,
  ASSESSMENT_STUDENTS,
  assessmentDetailStyles as styles,
  assessmentResultStatusAccent,
  ChalkBadge,
  mockScoreFromAverage,
  type AssessmentDetailStat,
  visibleAssessmentResultCount,
} from '../../shared';
import { attemptBarColor, quizStatusAccent } from '../utils';

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

function quizDurationMins(quiz: TeacherQuizRow) {
  return Math.max(10, quiz.questionCount * 2);
}

function generateTakers(quiz: TeacherQuizRow): QuizTakerRow[] {
  const visibleCount = visibleAssessmentResultCount(quiz.totalStudents);
  return Array.from({ length: visibleCount }, (_, index) => {
    const completed = index < Math.min(quiz.attemptCount, visibleCount);
    const inProgress = !completed && quiz.status === 'Active' && index === Math.min(quiz.attemptCount, visibleCount);

    return {
      id: `${quiz.id}-${index}`,
      studentName: ASSESSMENT_STUDENTS[index] ?? `Student ${index + 1}`,
      status: completed ? 'Completed' : inProgress ? 'In Progress' : 'Not Taken',
      score: completed ? mockScoreFromAverage(quiz.averageScore, index) : null,
      durationMins: completed ? Math.max(8, quizDurationMins(quiz) - 5 + (index % 6)) : null,
      submittedAt: completed ? `${quiz.dueDate}, ${quiz.dueTime}` : null,
    };
  });
}

export function QuizDetailView({ quiz, onBack }: QuizDetailViewProps) {
  const attemptRate = Math.round((quiz.attemptCount / Math.max(quiz.totalStudents, 1)) * 100);
  const takers = generateTakers(quiz);
  const averageScore = quiz.averageScore == null ? 'No scores yet' : `${quiz.averageScore.toFixed(1)}%`;
  const duration = quizDurationMins(quiz);
  const stats: AssessmentDetailStat[] = [
    {
      label: 'Average Score',
      value: averageScore,
      subText: 'Across submitted attempts',
    },
    {
      label: 'Taken',
      value: `${quiz.attemptCount} / ${quiz.totalStudents}`,
      subText: 'Submitted attempts',
      progress: {
        current: quiz.attemptCount,
        total: quiz.totalStudents,
        barColor: attemptBarColor(attemptRate),
      },
    },
    {
      label: 'Duration',
      value: `${duration} min`,
      subText: 'Estimated quiz time',
    },
    {
      label: 'Questions',
      value: quiz.questionCount,
      subText: quiz.questionFormat,
    },
  ];

  return (
    <AssessmentDetailPage
      backLabel="Back to Quizzes"
      onBack={onBack}
      title={quiz.title}
      statusBadge={<ChalkBadge label={quiz.status} accent={quizStatusAccent(quiz.status)} />}
      description={quiz.description}
      badges={
        <>
          <ChalkBadge label={quiz.classLabel} accent="#f0efed" />
          <ChalkBadge label={quiz.subject} accent="#84a9ff" />
          <ChalkBadge label={quiz.type} accent={quiz.accent} />
        </>
      }
      scheduleDate={quiz.dueDate}
      scheduleTime={quiz.dueTime}
      stats={stats}
      resultsTitle="Quiz Takers"
      resultsSummary={`${quiz.attemptCount} submitted`}
      columns={ASSESSMENT_RESULT_COLUMNS}
    >
      {takers.map((row) => (
        <tr key={row.id}>
          <td>
            <span className={styles.studentName}>{row.studentName}</span>
          </td>
          <td>
            <ChalkBadge label={row.status} accent={assessmentResultStatusAccent(row.status)} />
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
    </AssessmentDetailPage>
  );
}
