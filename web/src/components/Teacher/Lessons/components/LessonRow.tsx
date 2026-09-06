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
  { icon: '➕', label: 'Assign Lesson' },
  { icon: '⬇', label: 'Download Lesson' },
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
  onDuplicate: (id: string) => void;
  onViewLesson: (lesson: TeacherLessonRow) => void;
}

export function LessonRow({
  lesson,
  selected,
  highlighted = false,
  onToggleSelect,
  onArchive,
  onDelete,
  onDuplicate,
  onViewLesson,
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
          title={lesson.title}
          footer={
            <div style={{ marginTop: '0.2rem' }}>
              <ChalkBadge label={lessonTypeLabel(lesson.type)} accent={lessonTypeAccent(lesson.type)} />
            </div>
          }
        />
      </td>
      <td>
        <ClassMeta
          classLabel={lesson.classLabel}
          classLabels={lesson.classLabels}
          subject={lesson.subject}
        />
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
        <RowActionsMenu
          label={`More actions for ${lesson.title}`}
          actions={ROW_ACTIONS}
          dangerActions={DANGER_ACTIONS}
          onAction={(actionLabel) => {
            if (actionLabel === 'View Lesson') {
              if (['PDF', 'Document', 'Presentation'].includes(lesson.type)) {
                window.open(`/preview/document/${lesson.id}`, '_blank');
              } else {
                onViewLesson(lesson);
              }
            }
            if (actionLabel === 'Download Lesson') {
              alert(`Downloading lesson: ${lesson.title}`);
            }
            if (actionLabel === 'Duplicate Lesson') onDuplicate(lesson.id);
            if (actionLabel === 'Archive Lesson') onArchive(lesson.id);
            if (actionLabel === 'Delete Lesson') onDelete(lesson.id);
          }}
        />
      </td>
    </tr>
  );
}
