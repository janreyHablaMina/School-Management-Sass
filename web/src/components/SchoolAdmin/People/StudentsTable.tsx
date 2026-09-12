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
import { SortKey } from './useStudents';
import styles from './students.module.css';
import { Student } from './StudentProfile/shared/types';

interface StudentsTableProps {
  students: Student[];
  selectedStudents: string[];
  sortKey: SortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectStudent: (id: string) => void;
  onSort: (key: string) => void;
  onViewDetails: (student: Student) => void;
  onMessage?: (studentIds: string[]) => void;
}

import { attendanceBarColor, letterGradeAccent } from '@/components/Teacher/Students/studentDisplay';

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Student', sortable: true },
  { id: 'grade', label: 'Class', sortable: true },
  { id: 'attendanceRate', label: 'Attendance', sortable: true },
  { id: 'averageGrade', label: 'Average Grade', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

const ROW_ACTIONS = [
  { icon: '👤', label: 'View Profile' },
  { icon: '✏️', label: 'Edit Student' },
  { icon: '📧', label: 'Send Message' },
] as const;

const DANGER_ACTIONS = [
  { icon: '🚫', label: 'Mark Inactive' },
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
  return status === 'Active' ? '#5cc789' : '#ff7e93';
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
  onMessage,
}) => {
  const allVisibleSelected = selectedStudents.length === students.length && students.length > 0;

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
            onClick: () => alert('Bulk mark inactive functionality not implemented yet.'),
            tone: 'danger',
          },
          {
            label: 'Archive',
            onClick: () => alert('Bulk archive functionality not implemented yet.'),
            tone: 'danger',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1180}
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
        {students.map((student) => (
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
                <p className={styles.classLabel}>{student.gradeSection}</p>
                <p className={styles.classSubject}>Homeroom</p>
              </div>
            </td>
            <td>
              <div className={styles.attendanceCell}>
                <span className={styles.attendancePct}>{student.attendanceRate ?? 0}%</span>
                <div className={listStyles.progressTrack}>
                  <div
                    className={listStyles.progressFill}
                    style={{ width: `${student.attendanceRate ?? 0}%`, background: attendanceBarColor(student.attendanceRate ?? 0) }}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.gradeCell}>
                <span className={styles.gradeValue}>{(student.averageGrade ?? 0).toFixed(1)}</span>
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
                actions={ROW_ACTIONS}
                dangerActions={DANGER_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Profile') onViewDetails(student);
                  if (label === 'Edit Student') {
                    alert('Edit student functionality not implemented yet.');
                  }
                  if (label === 'Send Message') {
                    onMessage?.([student.id]);
                  }
                  if (label === 'Mark Inactive') {
                    alert('Mark inactive functionality not implemented yet.');
                  }
                  if (label === 'Archive Student') {
                    alert('Archive student functionality not implemented yet.');
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
