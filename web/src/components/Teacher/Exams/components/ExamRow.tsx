import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ProgressStatCell,
  rateBarColor,
  ResourceTitle,
  RowActionsMenu,
  RowSelectCell,
} from '../../shared';
import { examStatusAccent, examTypeAccent } from '../utils';
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
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onViewExam: (exam: TeacherExamRow) => void;
}

export function ExamRow({
  exam,
  selected,
  onToggleSelect,
  onArchive,
  onDelete,
  onDuplicate,
  onViewExam,
}: ExamRowProps) {
  const completionRate = Math.round(
    (exam.completedCount / Math.max(exam.totalStudents, 1)) * 100
  );

  return (
    <tr
      className={`${listStyles.clickableRow}${selected ? ` ${listStyles.rowSelected}` : ''}`}
      onClick={() => onViewExam(exam)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onViewExam(exam);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${exam.title}`}
    >
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggleSelect(exam.id)}
        label={`Select ${exam.title}`}
      />
      <td>
        <ResourceTitle
          title={exam.title}
          footer={<ChalkBadge label={exam.type} accent={examTypeAccent(exam.type)} />}
        />
      </td>
      <td>
        <ClassMeta classLabel={exam.classLabel} subject={exam.subject} />
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
          barColor={rateBarColor(completionRate)}
        />
      </td>
      <td>
        <ChalkBadge label={exam.status} accent={examStatusAccent(exam.status)} />
      </td>
      <td
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <RowActionsMenu
          label={`More actions for ${exam.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
          onAction={(actionLabel) => {
            if (actionLabel === 'View Exam') onViewExam(exam);
            if (actionLabel === 'View Results') onViewExam(exam);
            if (actionLabel === 'Duplicate Exam') onDuplicate(exam.id);
            if (actionLabel === 'Archive Exam') onArchive(exam.id);
            if (actionLabel === 'Delete Exam') onDelete(exam.id);
          }}
        />
      </td>
    </tr>
  );
}
