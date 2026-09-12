import React from 'react';
import {
  ChalkBadge,
  DataTable,
  listStyles,
  ResourceBulkBar,
  RowActionsMenu,
  RowSelectCell,
  SelectAllCheckbox,
  type DataTableColumn,
} from '@/components/Teacher/shared';
import peopleStyles from '../../People/students.module.css';
import type { LessonRecord, LessonSortKey } from './useLessons';

interface LessonsTableProps {
  lessons: LessonRecord[];
  selectedLessons: string[];
  sortKey: LessonSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectLesson: (id: string) => void;
  onSort: (key: LessonSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Lesson', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'teacher', label: 'Teacher', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'durationMins', label: 'Duration', sortable: true },
  { id: 'updatedSortKey', label: 'Updated', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'coverage', label: 'Coverage', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Lesson' },
  { icon: '@', label: 'Message Teacher' },
  { icon: '#', label: 'Audit Coverage' },
] as const;

function statusAccent(status: string) {
  if (status === 'Published') return '#5cc789';
  if (status === 'Draft') return '#f5c842';
  return '#8a9a90';
}

function coverageAccent(coverage: string) {
  if (coverage === 'Complete') return '#5cc789';
  if (coverage === 'Needs Review') return '#f5c842';
  if (coverage === 'Missing Classes') return '#ff7e93';
  return '#8a9a90';
}

function lessonInitials(title: string) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export const LessonsTable: React.FC<LessonsTableProps> = ({
  lessons,
  selectedLessons,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectLesson,
  onSort,
}) => {
  const allVisibleSelected = selectedLessons.length === lessons.length && lessons.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedLessons.length}
        itemLabel="lesson"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export lessons functionality not implemented yet.'),
          },
          {
            label: 'Audit Coverage',
            onClick: () => alert('Audit coverage functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1380}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as LessonSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible lessons"
          />
        }
      >
        {lessons.map((lesson) => (
          <tr
            key={lesson.id}
            className={selectedLessons.includes(lesson.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedLessons.includes(lesson.id)}
              onToggle={() => onSelectLesson(lesson.id)}
              label={`Select ${lesson.title}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: lesson.accent }}>
                  {lessonInitials(lesson.title)}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{lesson.title}</span>
                  <span className={peopleStyles.studentEmail}>
                    {lesson.subject} | {lesson.classLabel}
                  </span>
                </div>
              </div>
            </td>
            <td>{lesson.classLabel}</td>
            <td>{lesson.teacher}</td>
            <td>{lesson.type}</td>
            <td>{lesson.durationMins} mins</td>
            <td>{lesson.updatedAt}</td>
            <td>
              <ChalkBadge label={lesson.status} accent={statusAccent(lesson.status)} />
            </td>
            <td>
              <ChalkBadge label={lesson.coverage} accent={coverageAccent(lesson.coverage)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${lesson.title}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Lesson') {
                    alert('Lesson detail functionality not implemented yet.');
                  }
                  if (label === 'Message Teacher') {
                    alert('Message teacher functionality not implemented yet.');
                  }
                  if (label === 'Audit Coverage') {
                    alert('Audit coverage functionality not implemented yet.');
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};
