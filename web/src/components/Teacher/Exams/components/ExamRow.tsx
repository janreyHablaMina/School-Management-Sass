import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ProgressStatCell,
  rateBarColor,
  ResourceTitle,
  RowActionsMenu,
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
}

export function ExamRow({
  exam,
  selected,
  onToggleSelect,
  onArchive,
  onDelete,
}: ExamRowProps) {
  const completionRate = Math.round(
    (exam.completedCount / Math.max(exam.totalStudents, 1)) * 100
  );

  return (
    <tr className={selected ? listStyles.rowSelected : undefined}>
      <td
        className={listStyles.checkCell}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className={listStyles.checkbox}
          checked={selected}
          onChange={() => onToggleSelect(exam.id)}
          aria-label={`Select ${exam.title}`}
        />
      </td>
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
          barColor={rateBarColor(completionRate)}
        />
      </td>
      <td>
        <ChalkBadge label={exam.status} accent={examStatusAccent(exam.status)} />
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${exam.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
          onAction={(actionLabel) => {
            if (actionLabel === 'Archive Exam') onArchive(exam.id);
            if (actionLabel === 'Delete Exam') onDelete(exam.id);
          }}
        />
      </td>
    </tr>
  );
}
