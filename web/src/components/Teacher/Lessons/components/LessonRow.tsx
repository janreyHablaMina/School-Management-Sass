import {
  ChalkBadge,
  ClassMeta,
  listStyles,
  ResourceTitle,
  RowActionsMenu,
  RowSelectCell,
} from '../../shared';
import { lessonStatusAccent, lessonTypeAccent, lessonTypeLabel } from '../utils';
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
  selected: boolean;
  highlighted?: boolean;
  onToggleSelect: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LessonRow({
  lesson,
  selected,
  highlighted = false,
  onToggleSelect,
  onArchive,
  onDelete,
}: LessonRowProps) {
  const rowClass = [
    selected ? listStyles.rowSelected : '',
    highlighted ? listStyles.rowHighlight : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={rowClass || undefined}>
      <RowSelectCell
        selected={selected}
        onToggle={() => onToggleSelect(lesson.id)}
        label={`Select ${lesson.title}`}
      />
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
        <ChalkBadge label={lessonTypeLabel(lesson.type)} accent={lessonTypeAccent(lesson.type)} />
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
          onAction={(actionLabel) => {
            if (actionLabel === 'Archive Lesson') onArchive(lesson.id);
            if (actionLabel === 'Delete Lesson') onDelete(lesson.id);
          }}
        />
      </td>
    </tr>
  );
}
