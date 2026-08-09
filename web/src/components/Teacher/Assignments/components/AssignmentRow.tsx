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
import { assignmentStatusAccent, assignmentTypeAccent } from '../utils';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Assignment' },
  { icon: '✎', label: 'Edit Assignment' },
  { icon: '📊', label: 'View Submissions' },
  { icon: '📋', label: 'Duplicate Assignment' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive Assignment' },
  { icon: '🗑', label: 'Delete Assignment' },
] as const;

interface AssignmentRowProps {
  assignment: TeacherAssignmentRow;
}

export function AssignmentRow({ assignment }: AssignmentRowProps) {
  const submissionRate = Math.round(
    (assignment.submittedCount / Math.max(assignment.totalStudents, 1)) * 100
  );

  return (
    <tr>
      <td>
        <ResourceTitle
          icon={assignment.icon}
          accent={assignment.accent}
          title={assignment.title}
          description={assignment.description}
        />
      </td>
      <td>
        <ClassMeta classLabel={assignment.classLabel} subject={assignment.subject} />
      </td>
      <td>
        <ChalkBadge label={assignment.type} accent={assignmentTypeAccent(assignment.type)} />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{assignment.dueDate}</p>
          <p className={listStyles.stackMetaSecondary}>{assignment.dueTime}</p>
        </div>
      </td>
      <td>
        <ProgressStatCell
          current={assignment.submittedCount}
          total={assignment.totalStudents}
          barColor={rateBarColor(submissionRate)}
        />
      </td>
      <td>
        {assignment.averageScore == null ? (
          <span className={listStyles.scoreEmpty}>—</span>
        ) : (
          <span className={listStyles.scoreValue}>{assignment.averageScore.toFixed(1)}%</span>
        )}
      </td>
      <td>
        <ChalkBadge
          label={assignment.status}
          accent={assignmentStatusAccent(assignment.status)}
        />
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${assignment.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
