import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ProgressStatCell,
  ResourceTitle,
  RowActionsMenu,
} from '../../shared';
import { examStatusAccent, examStudentsBarColor, examTypeAccent } from '../utils';
import type { TeacherExamRow } from '@/types/teacherExams';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Exam' },
  { icon: '✎', label: 'Edit Exam' },
  { icon: '📊', label: 'View Results' },
  { icon: '📋', label: 'Duplicate Exam' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive Exam' },
  { icon: '🗑', label: 'Delete Exam' },
] as const;

interface ExamRowProps {
  exam: TeacherExamRow;
}

export function ExamRow({ exam }: ExamRowProps) {
  const completionRate = Math.round(
    (exam.completedCount / Math.max(exam.totalStudents, 1)) * 100
  );

  return (
    <tr>
      <td>
        <ResourceTitle
          icon={exam.icon}
          accent={exam.accent}
          title={exam.title}
          description={exam.description}
        />
      </td>
      <td>
        <ClassMeta classLabel={exam.classLabel} subject={exam.subject} />
      </td>
      <td>
        <ChalkBadge label={exam.type} accent={examTypeAccent(exam.type)} />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{exam.examDate}</p>
          <p className={listStyles.stackMetaSecondary}>{exam.examTime}</p>
        </div>
      </td>
      <td>
        <span className={listStyles.scoreValue}>{exam.duration}</span>
      </td>
      <td>
        <ProgressStatCell
          current={exam.completedCount}
          total={exam.totalStudents}
          barColor={examStudentsBarColor(completionRate)}
        />
      </td>
      <td>
        {exam.averageScore == null ? (
          <span className={listStyles.scoreEmpty}>—</span>
        ) : (
          <span className={listStyles.scoreValue}>{exam.averageScore.toFixed(1)}%</span>
        )}
      </td>
      <td>
        <ChalkBadge label={exam.status} accent={examStatusAccent(exam.status)} />
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${exam.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
