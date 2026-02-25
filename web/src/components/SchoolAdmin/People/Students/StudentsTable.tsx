import React from 'react';
import { ChalkBadge, DataTable, listStyles, ResourceBulkBar, RowActionsMenu, RowSelectCell, SelectAllCheckbox, type DataTableColumn } from '@/components/ui/shared';
import { SortKey } from './useStudents';
import styles from './students.module.css';
import { Student } from './types';

interface StudentsTableProps {
  students: Student[];
  selectedStudents: string[];
  sortKey: SortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectStudent: (id: string) => void;
  onSort: (key: SortKey) => void;
  onViewDetails: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onMessage?: (studentIds: string[]) => void;
  onArchiveStudent: (id: string) => void;
  onArchiveSelected: () => void;
  onRestoreStudent: (id: string) => void;
  onRestoreSelected: () => void;
  onMarkInactive: (id: string) => void;
  onRestoreActive: (id: string) => void;
  onBulkMarkInactive: () => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Student', sortable: true },
  { id: 'grade', label: 'Grade', sortable: true },
  { id: 'section', label: 'Section', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

const ROW_ACTIONS = [
  { icon: '👤', label: 'View Profile' },
  { icon: '✏️', label: 'Edit Student' },
  { icon: '📧', label: 'Send Message' },
] as const;

const ARCHIVED_ACTIONS = [
  { icon: '↩', label: 'Restore Student' },
] as const;

const DANGER_ACTIONS_ACTIVE = [
  { icon: '🚫', label: 'Mark Inactive' },
  { icon: '🗃️', label: 'Archive Student' },
] as const;

const DANGER_ACTIONS_INACTIVE = [
  { icon: '♻️', label: 'Restore Active' },
  { icon: '🗃️', label: 'Archive Student' },
] as const;

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function statusAccent(status?: string) {
  if (status === 'Archived') return '#f5c842';
  return status === 'Active' ? '#5cc789' : '#ff7e93';
}

function splitGradeSection(gradeSection: string) {
  const [grade, section] = gradeSection.split(' - ');
  return {
    grade: grade || gradeSection,
    section: section || 'Unassigned',
  };
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  selectedStudents,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectStudent,
  onSort,
  onViewDetails,
  onEditStudent,
  onMessage,
  onArchiveStudent,
  onArchiveSelected,
  onRestoreStudent,
  onRestoreSelected,
  onMarkInactive,
  onRestoreActive,
  onBulkMarkInactive,
}) => {
  const allVisibleSelected = selectedStudents.length === students.length && students.length > 0;
  const showingArchivedOnly = students.length > 0 && students.every((student) => student.status === 'Archived');

  return (
    <div className={styles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedStudents.length}
        itemLabel="student"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Send Message',
            onClick: () => onMessage?.(selectedStudents),
          },
          {
            label: 'Mark Inactive',
            onClick: onBulkMarkInactive,
            tone: 'danger',
          },
          {
            label: showingArchivedOnly ? 'Restore' : 'Archive',
            onClick: showingArchivedOnly ? onRestoreSelected : onArchiveSelected,
            tone: showingArchivedOnly ? 'restore' : 'danger',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={980}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as SortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible students"
          />
        }
      >
        {students.map((student) => {
          const classParts = splitGradeSection(student.gradeSection);
          const isInactive = student.status === 'Inactive';
          const dangerActions = isInactive ? DANGER_ACTIONS_INACTIVE : DANGER_ACTIONS_ACTIVE;

          return (
            <tr
              key={student.id}
              className={`${listStyles.clickableRow}${selectedStudents.includes(student.id) ? ` ${listStyles.rowSelected}` : ''}`}
              onClick={() => onViewDetails(student)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onViewDetails(student);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open profile for ${student.name}`}
            >
              <RowSelectCell
                selected={selectedStudents.includes(student.id)}
                onToggle={() => onSelectStudent(student.id)}
                label={`Select ${student.name}`}
              />
              <td>
                <div className={styles.studentCell}>
                  <div className={styles.avatar} style={{ background: student.avatarColor ?? '#f5c842' }}>
                    {getInitials(student.name)}
                  </div>
                  <div className={styles.studentInfo}>
                    <span className={styles.studentName}>{student.name}</span>
                    <span className={styles.studentEmail}>ID: {student.studentId}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.classCell}>
                  <p className={styles.classLabel}>{classParts.grade}</p>
                </div>
              </td>
              <td>
                <div className={styles.classCell}>
                  <p className={styles.classLabel}>{classParts.section}</p>
                  <p className={styles.classSubject}>Homeroom</p>
                </div>
              </td>
              <td>
                <ChalkBadge label={student.status ?? 'Unknown'} accent={statusAccent(student.status)} />
              </td>
              <td
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <RowActionsMenu
                  label={`More actions for ${student.name}`}
                  actions={student.status === 'Archived' ? ARCHIVED_ACTIONS : ROW_ACTIONS}
                  dangerActions={student.status === 'Archived' ? [] : dangerActions}
                  onAction={(label) => {
                    if (label === 'View Profile') onViewDetails(student);
                    if (label === 'Edit Student') {
                      onEditStudent(student);
                    }
                    if (label === 'Send Message') {
                      onMessage?.([student.id]);
                    }
                    if (label === 'Mark Inactive') {
                      onMarkInactive(student.id);
                    }
                    if (label === 'Restore Active') {
                      onRestoreActive(student.id);
                    }
                    if (label === 'Archive Student') {
                      onArchiveStudent(student.id);
                    }
                    if (label === 'Restore Student') {
                      onRestoreStudent(student.id);
                    }
                  }}
                />
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
};
