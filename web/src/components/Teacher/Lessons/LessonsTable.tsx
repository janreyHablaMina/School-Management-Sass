import React from 'react';
import {
  DataTable,
  type DataTableColumn,
  listStyles,
  ResourceBulkBar,
} from '../shared';
import { LessonRow } from './components/LessonRow';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import type { LessonSortKey } from './useLessons';

interface LessonsTableProps {
  lessons: TeacherLessonRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: LessonSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: LessonSortKey) => void;
  onToggle: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  onArchiveItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Lesson', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'updatedSortKey', label: 'Last Updated', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function LessonsTable({
  lessons,
  selectedIds,
  allVisibleSelected,
  sortKey,
  sortDirection,
  onSort,
  onToggle,
  onToggleAllVisible,
  onClearSelection,
  onArchiveSelected,
  onDeleteSelected,
  onArchiveItem,
  onDeleteItem,
}: LessonsTableProps) {
  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="lesson"
        onClearSelection={onClearSelection}
        actions={[
          { label: 'Archive', onClick: onArchiveSelected, tone: 'danger' },
          { label: 'Delete', onClick: onDeleteSelected, tone: 'danger' },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1080}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as LessonSortKey)}
        leadingHeader={
          <input
            type="checkbox"
            className={listStyles.checkbox}
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            aria-label="Select all visible lessons"
          />
        }
      >
        {lessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            selected={selectedIds.includes(lesson.id)}
            onToggleSelect={onToggle}
            onArchive={onArchiveItem}
            onDelete={onDeleteItem}
          />
        ))}
      </DataTable>
    </div>
  );
}
