'use client';

import type { TeacherExamRow } from '@/types/teacherExams';
import {
  AssessmentDetailPage,
  ASSESSMENT_RESULT_COLUMNS,
  ASSESSMENT_STUDENTS,
  assessmentDetailStyles as styles,
  assessmentResultStatusAccent,
  ChalkBadge,
  mockScoreFromAverage,
  rateBarColor,
  type AssessmentDetailStat,
  visibleAssessmentResultCount,
} from '../../shared';
import { examStatusAccent, examTypeAccent } from '../utils';

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

function generateTakers(exam: TeacherExamRow): ExamTakerRow[] {
  const visibleCount = visibleAssessmentResultCount(exam.totalStudents);
  return Array.from({ length: visibleCount }, (_, index) => {
    const completed = index < Math.min(exam.completedCount, visibleCount);
    const taking = !completed && exam.status === 'Ongoing' && index === Math.min(exam.completedCount, visibleCount);

    return {
      id: `${exam.id}-${index}`,
      studentName: ASSESSMENT_STUDENTS[index] ?? `Student ${index + 1}`,
      status: completed ? 'Completed' : taking ? 'Taking' : 'Not Taken',
      score: completed ? mockScoreFromAverage(exam.averageScore, index) : null,
      duration: completed ? exam.duration : null,
      submittedAt: completed ? `${exam.examDate}, ${exam.examTime}` : null,
    };
  });
}

export function ExamDetailView({ exam, onBack }: ExamDetailViewProps) {
  const completionRate = Math.round((exam.completedCount / Math.max(exam.totalStudents, 1)) * 100);
  const takers = generateTakers(exam);
  const averageScore = exam.averageScore == null ? 'No scores yet' : `${exam.averageScore.toFixed(1)}%`;
  const stats: AssessmentDetailStat[] = [
    {
      label: 'Average Score',
      value: averageScore,
      subText: 'Across submitted exams',
    },
    {
      label: 'Completed',
      value: `${exam.completedCount} / ${exam.totalStudents}`,
      subText: 'Submitted exams',
      progress: {
        current: exam.completedCount,
        total: exam.totalStudents,
        barColor: rateBarColor(completionRate),
      },
    },
    {
      label: 'Duration',
      value: exam.duration,
      subText: 'Exam window',
    },
    {
      label: 'Type',
      value: exam.type,
      subText: exam.subject,
    },
  ];

  return (
    <AssessmentDetailPage
      backLabel="Back to Exams"
      onBack={onBack}
      title={exam.title}
      statusBadge={<ChalkBadge label={exam.status} accent={examStatusAccent(exam.status)} />}
      description={exam.description}
      badges={
        <>
          <ChalkBadge label={exam.classLabel} accent="#f0efed" />
          <ChalkBadge label={exam.subject} accent="#84a9ff" />
          <ChalkBadge label={exam.type} accent={examTypeAccent(exam.type)} />
        </>
      }
      scheduleDate={exam.examDate}
      scheduleTime={exam.examTime}
      stats={stats}
      resultsTitle="Exam Takers"
      resultsSummary={`${exam.completedCount} submitted`}
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
            <span className={styles.muted}>{row.duration ?? '-'}</span>
          </td>
          <td>
            <span className={styles.muted}>{row.submittedAt ?? '-'}</span>
          </td>
        </tr>
      ))}
    </AssessmentDetailPage>
  );
}
