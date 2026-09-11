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
  onSort: (key: SortKey) => void;
  onViewDetails: (student: Student) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Student', sortable: true },
  { id: 'grade', label: 'Grade', sortable: true },
  { id: 'section', label: 'Section', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'dateEnrolled', label: 'Date Enrolled', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: 'i', label: 'View Details' },
  { icon: 'E', label: 'Edit Student' },
  { icon: 'G', label: 'Manage Grades' },
  { icon: 'A', label: 'View Attendance' },
  { icon: 'P', label: 'Contact Parent' },
] as const;

const DANGER_ACTIONS = [{ icon: '!', label: 'Delete Student' }] as const;

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
            label: 'Delete',
            onClick: () => alert('Delete students functionality not implemented yet.'),
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
            <td>{student.gradeSection.split(' - ')[0] || student.gradeSection}</td>
            <td>{student.gradeSection.split(' - ')[1]?.replace('Section ', '') || ''}</td>
            <td>
              <ChalkBadge label={student.status ?? 'Unknown'} accent={statusAccent(student.status)} />
            </td>
            <td>{student.dateEnrolled}</td>
            <td
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <RowActionsMenu
                label={`More actions for ${student.name}`}
                actions={ROW_ACTIONS}
                dangerActions={DANGER_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Details') onViewDetails(student);
                  if (label === 'Delete Student') {
                    alert('Delete student functionality not implemented yet.');
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
