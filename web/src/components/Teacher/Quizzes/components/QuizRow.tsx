import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ProgressStatCell,
  ResourceTitle,
  RowActionsMenu,
  RowSelectCell,
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
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onViewQuiz: (quiz: TeacherQuizRow) => void;
}

export function QuizRow({
  quiz,
  selected,
  onToggleSelect,
  onArchive,
  onDelete,
  onDuplicate,
  onViewQuiz,
}: QuizRowProps) {
  const attemptRate = Math.round(
    (quiz.attemptCount / Math.max(quiz.totalStudents, 1)) * 100
  );

  return (
    <tr className={selected ? listStyles.rowSelected : undefined}>
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggleSelect(quiz.id)}
        label={`Select ${quiz.title}`}
      />
      <td>
        <ResourceTitle
          title={quiz.title}
          footer={<ChalkBadge label={quiz.status} accent={quizStatusAccent(quiz.status)} />}
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
        <RowActionsMenu
          label={`More actions for ${quiz.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
          onAction={(actionLabel) => {
            if (actionLabel === 'View Quiz') onViewQuiz(quiz);
            if (actionLabel === 'View Results') onViewQuiz(quiz);
            if (actionLabel === 'Duplicate Quiz') onDuplicate(quiz.id);
            if (actionLabel === 'Archive Quiz') onArchive(quiz.id);
            if (actionLabel === 'Delete Quiz') onDelete(quiz.id);
          }}
        />
      </td>
    </tr>
  );
}
