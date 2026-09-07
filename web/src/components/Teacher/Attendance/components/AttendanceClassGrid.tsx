'use client';

import React from 'react';
import type { AttendanceClassSection } from '@/types/teacherAttendance';
import {
  DataTable,
  listStyles,
  ProgressStatCell,
  rateBarColor,
  ResourceBulkBar,
  RowActionsMenu,
  RowSelectCell,
  SelectAllCheckbox,
  type DataTableColumn,
} from '../../shared';
import styles from '../attendance.module.css';

interface AttendanceClassGridProps {
  classes: AttendanceClassSection[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  onToggleClass: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onExportSelected: () => void;
  onExportClass: (id: string) => void;
  onOpen: (id: string) => void;
}

const ROW_ACTIONS = [
  { icon: '📝', label: 'Take Attendance' },
  { icon: '📊', label: 'View Summary' },
  { icon: '⬇', label: 'Export Report' },
] as const;

const COLUMNS: DataTableColumn[] = [
  { id: 'class', label: 'Class' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'students', label: 'Students' },
  { id: 'today', label: 'Today' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'actions', label: 'Actions' },
];

export function AttendanceClassGrid({
  classes,
  selectedIds,
  allVisibleSelected,
  onToggleClass,
  onToggleAllVisible,
  onClearSelection,
  onExportSelected,
  onExportClass,
  onOpen,
}: AttendanceClassGridProps) {
  const selectedCount = selectedIds.length;

  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedCount}
        itemLabel="class"
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
        minWidth={980}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible attendance classes"
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
            aria-label={`Open attendance for ${cls.subject}, ${cls.gradeSection}`}
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
              <div className={styles.classListStats}>
                <span className={styles.statPresent}>{cls.presentToday} Present</span>
                <span className={styles.statAbsent}>{cls.absentToday} Absent</span>
                <span className={styles.statLate}>{cls.lateToday} Late</span>
              </div>
            </td>
            <td>
              <ProgressStatCell
                current={cls.attendanceRate}
                total={100}
                barColor={rateBarColor(cls.attendanceRate)}
              />
            </td>
            <td
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <RowActionsMenu
                label={`More actions for ${cls.subject}, ${cls.gradeSection}`}
                actions={ROW_ACTIONS}
                onAction={(actionLabel) => {
                  if (actionLabel === 'Take Attendance') onOpen(cls.id);
                  if (actionLabel === 'View Summary') onOpen(cls.id);
                  if (actionLabel === 'Export Report') onExportClass(cls.id);
                }}
              />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
