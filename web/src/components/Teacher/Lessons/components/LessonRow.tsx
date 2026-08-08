import React from 'react';
import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ResourceTitle,
  RowActionsMenu,
} from '../../shared';
import { lessonStatusAccent, lessonTypeAccent } from '../utils';
import type { TeacherLessonRow } from '@/types/teacherLessons';

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Lesson' },
  { icon: '✎', label: 'Edit Lesson' },
  { icon: '📋', label: 'Duplicate Lesson' },
  { icon: '📤', label: 'Share Lesson' },
] as const;

const DANGER_ACTIONS = [
  { icon: '📦', label: 'Archive Lesson' },
  { icon: '🗑', label: 'Delete Lesson' },
] as const;


interface LessonRowProps {
  lesson: TeacherLessonRow;
}

export function LessonRow({ lesson }: LessonRowProps) {
  return (
    <tr>
      <td>
        <ResourceTitle
          icon={lesson.icon}
          accent={lesson.accent}
          title={lesson.title}
          description={lesson.description}
          footer={`⏱ ${lesson.durationMins} mins`}
        />
      </td>
      <td>
        <ClassMeta classLabel={lesson.classLabel} subject={lesson.subject} />
      </td>
      <td>
        <ChalkBadge label={lesson.type} accent={lessonTypeAccent(lesson.type)} />
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p
            className={listStyles.stackMetaPrimary}
            style={{ color: lessonStatusAccent(lesson.status) }}
          >
            {lesson.status}
          </p>
          <p className={listStyles.stackMetaSecondary}>{lesson.statusDate}</p>
        </div>
      </td>
      <td>
        <div className={listStyles.stackMeta}>
          <p className={listStyles.stackMetaPrimary}>{lesson.updatedAt}</p>
          <p className={listStyles.stackMetaSecondary}>by {lesson.updatedBy}</p>
        </div>
      </td>
      <td>
        <RowActionsMenu
          label={`More actions for ${lesson.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
        />
      </td>
    </tr>
  );
}
