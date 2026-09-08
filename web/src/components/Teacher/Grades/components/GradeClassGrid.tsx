'use client';

import React from 'react';
import type { GradeClassSection } from '@/types/teacherGrades';
import {
  DataTable,
  listStyles,
  ResourceBulkBar,
  RowActionsMenu,
  RowSelectCell,
  SelectAllCheckbox,
  type DataTableColumn,
} from '../../shared';
import styles from '../grades.module.css';

interface GradeClassGridProps {
  classes: GradeClassSection[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  onToggleClass: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onExportSelected: () => void;
  onOpen: (id: string) => void;
  onEnterGrades: (id: string) => void;
  onExportClass: (id: string) => void;
  onViewSummary: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'class', label: 'Class' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'students', label: 'Students' },
  { id: 'average', label: 'Average' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const ROW_ACTIONS = [
  { icon: '🚪', label: 'Open Gradebook' },
  { icon: '✏️', label: 'Enter Grades' },
  { icon: '⬇️', label: 'Export Grades' },
  { icon: '📊', label: 'View Summary' },
] as const;

export function GradeClassGrid({
  classes,
  selectedIds,
  allVisibleSelected,
  onToggleClass,
  onToggleAllVisible,
  onClearSelection,
  onExportSelected,
  onOpen,
  onEnterGrades,
  onExportClass,
  onViewSummary,
}: GradeClassGridProps) {
  const selectedCount = selectedIds.length;

  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedCount}
        itemLabel="gradebook"
        onClearSelection={onClearSelection}
        actions={[
          {
            label: `Export selected (${selectedCount})`,
            onClick: onExportSelected,
            tone: 'default',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={940}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible gradebooks"
          />
        }
      >
        {classes.map((cls) => (
          <tr
            key={cls.id}
            className={`${listStyles.clickableRow}${
              selectedIds.includes(cls.id) ? ` ${listStyles.rowSelected}` : ''
            }`}
            onClick={() => onOpen(cls.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpen(cls.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open gradebook for ${cls.subject}, ${cls.gradeSection}`}
          >
            <RowSelectCell
              selected={selectedIds.includes(cls.id)}
              onToggle={() => onToggleClass(cls.id)}
              label={`Select ${cls.subject}, ${cls.gradeSection}`}
            />
            <td>
              <div className={styles.classListTitle}>
                <span className={styles.classListSubject}>{cls.subject}</span>
                <span className={styles.classListSection}>{cls.gradeSection}</span>
              </div>
            </td>
            <td>
              <div className={listStyles.stackMeta}>
                <p className={listStyles.stackMetaPrimary}>{cls.schedule}</p>
                <p className={listStyles.stackMetaSecondary}>{cls.room}</p>
              </div>
            </td>
            <td>
              <span className={listStyles.scoreValue}>{cls.studentCount}</span>
            </td>
            <td>
              <div className={styles.averageCell}>
                <span className={styles.averageValue} style={{ color: cls.accent }}>
                  {cls.classAverage.toFixed(1)}%
                </span>
                <div className={styles.averageTrack} aria-hidden>
                  <span
                    className={styles.averageFill}
                    style={{
                      width: `${Math.max(0, Math.min(100, cls.classAverage))}%`,
                      background: cls.accent,
                    }}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.classListStats}>
                <span className={styles.statPass}>{cls.passingRate}% Passing</span>
                <span className={styles.statAttention}>{cls.needsAttention} At risk</span>
                <span className={styles.statIncomplete}>{cls.incomplete} Incomplete</span>
              </div>
            </td>
            <td
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <RowActionsMenu
                label={`More actions for ${cls.subject}, ${cls.gradeSection}`}
              actions={ROW_ACTIONS}
              onAction={(actionLabel) => {
                if (actionLabel === 'Open Gradebook') onOpen(cls.id);
                if (actionLabel === 'Enter Grades') onEnterGrades(cls.id);
                if (actionLabel === 'Export Grades') onExportClass(cls.id);
                if (actionLabel === 'View Summary') onViewSummary(cls.id);
              }}
            />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
