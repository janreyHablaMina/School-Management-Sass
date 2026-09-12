import React from 'react';
import {
  ChalkBadge,
  DataTable,
  listStyles,
  ProgressStatCell,
  ResourceBulkBar,
  RowActionsMenu,
  RowSelectCell,
  SelectAllCheckbox,
  type DataTableColumn,
} from '@/components/Teacher/shared';
import peopleStyles from '../../People/students.module.css';
import type { AssignmentRecord, AssignmentSortKey } from './useAssignments';

interface AssignmentsTableProps {
  assignments: AssignmentRecord[];
  selectedAssignments: string[];
  sortKey: AssignmentSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectAssignment: (id: string) => void;
  onSort: (key: AssignmentSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Assignment', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'teacher', label: 'Teacher', sortable: true },
  { id: 'dueSortKey', label: 'Due Date', sortable: true },
  { id: 'submittedCount', label: 'Submissions', sortable: true },
  { id: 'averageScore', label: 'Average', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'riskLevel', label: 'Risk', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Assignment' },
  { icon: '@', label: 'Message Teacher' },
  { icon: '#', label: 'Export Submissions' },
] as const;

function statusAccent(status: string) {
  if (status === 'Completed') return '#5cc789';
  if (status === 'Due Soon') return '#f5c842';
  if (status === 'Draft' || status === 'Archived') return '#8a9a90';
  return '#84a9ff';
}

function riskAccent(risk: string) {
  if (risk === 'Low') return '#5cc789';
  if (risk === 'Medium') return '#f5c842';
  return '#ff7e93';
}

function assignmentInitials(title: string) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  selectedAssignments,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectAssignment,
  onSort,
}) => {
  const allVisibleSelected =
    selectedAssignments.length === assignments.length && assignments.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedAssignments.length}
        itemLabel="assignment"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export assignments functionality not implemented yet.'),
          },
          {
            label: 'Notify Teachers',
            onClick: () => alert('Notify teachers functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1420}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AssignmentSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible assignments"
          />
        }
      >
        {assignments.map((assignment) => (
          <tr
            key={assignment.id}
            className={selectedAssignments.includes(assignment.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedAssignments.includes(assignment.id)}
              onToggle={() => onSelectAssignment(assignment.id)}
              label={`Select ${assignment.title}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: assignment.accent }}>
                  {assignmentInitials(assignment.title)}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{assignment.title}</span>
                  <span className={peopleStyles.studentEmail}>
                    {assignment.subject} | {assignment.type}
                  </span>
                </div>
              </div>
            </td>
            <td>{assignment.classLabel}</td>
            <td>{assignment.teacher}</td>
            <td>{assignment.dueDate}</td>
            <td>
              <ProgressStatCell
                current={assignment.submittedCount}
                total={assignment.totalStudents}
                barColor={assignment.accent}
              />
            </td>
            <td>{assignment.averageScore === null ? '-' : `${assignment.averageScore}%`}</td>
            <td>
              <ChalkBadge label={assignment.status} accent={statusAccent(assignment.status)} />
            </td>
            <td>
              <ChalkBadge label={assignment.riskLevel} accent={riskAccent(assignment.riskLevel)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${assignment.title}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Assignment') {
                    alert('Assignment detail functionality not implemented yet.');
                  }
                  if (label === 'Message Teacher') {
                    alert('Message teacher functionality not implemented yet.');
                  }
                  if (label === 'Export Submissions') {
                    alert('Export submissions functionality not implemented yet.');
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
