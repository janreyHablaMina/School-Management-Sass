import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ResourceTitle,
  RowActionsMenu,
} from '../../shared';
import { attemptBarColor, quizStatusAccent } from '../utils';
import styles from '../quizzes.module.css';
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
  const attemptRate = Math.round((quiz.attemptCount / quiz.totalStudents) * 100);
  const barColor = attemptBarColor(attemptRate);

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
        <div className={styles.questionsCell}>
          <p className={styles.questionsCount}>{quiz.questionCount} Questions</p>
          <p className={styles.questionsFormat}>{quiz.questionFormat}</p>
        </div>
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{quiz.dueDate}</p>
          <p className={listStyles.stackMetaSecondary}>{quiz.dueTime}</p>
        </div>
      </td>
      <td>
        <div className={styles.attemptsCell}>
          <div className={styles.attemptsTop}>
            <span className={styles.attemptsCount}>
              {quiz.attemptCount} / {quiz.totalStudents}
            </span>
            <span className={styles.attemptsPct}>{attemptRate}%</span>
          </div>
          <div className={listStyles.progressTrack}>
            <div
              className={listStyles.progressFill}
              style={{ width: `${attemptRate}%`, background: barColor }}
            />
          </div>
        </div>
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
