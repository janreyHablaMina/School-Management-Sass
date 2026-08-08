import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ProgressStatCell,
  ResourceTitle,
  RowActionsMenu,
} from '../../shared';
import { attemptBarColor, quizStatusAccent } from '../utils';
import type { TeacherQuizRow } from '@/types/teacherQuizzes';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Quiz' },
  { icon: '✎', label: 'Edit Quiz' },
  { icon: '📊', label: 'View Results' },
  { icon: '📋', label: 'Duplicate Quiz' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive Quiz' },
  { icon: '🗑', label: 'Delete Quiz' },
] as const;

interface QuizRowProps {
  quiz: TeacherQuizRow;
}

export function QuizRow({ quiz }: QuizRowProps) {
  const attemptRate = Math.round(
    (quiz.attemptCount / Math.max(quiz.totalStudents, 1)) * 100
  );

  return (
    <tr>
      <td>
        <ResourceTitle
          icon={quiz.icon}
          accent={quiz.accent}
          title={quiz.title}
          description={quiz.description}
        />
      </td>
      <td>
        <ClassMeta classLabel={quiz.classLabel} subject={quiz.subject} />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{quiz.questionCount} Questions</p>
          <p className={listStyles.stackMetaSecondary}>{quiz.questionFormat}</p>
        </div>
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{quiz.dueDate}</p>
          <p className={listStyles.stackMetaSecondary}>{quiz.dueTime}</p>
        </div>
      </td>
      <td>
        <ProgressStatCell
          current={quiz.attemptCount}
          total={quiz.totalStudents}
          barColor={attemptBarColor(attemptRate)}
        />
      </td>
      <td>
        <ChalkBadge label={quiz.status} accent={quizStatusAccent(quiz.status)} />
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${quiz.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
