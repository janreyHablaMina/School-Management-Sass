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
import type { SubjectRecord, SubjectSortKey } from './useSubjects';

interface SubjectsTableProps {
  subjects: SubjectRecord[];
  selectedSubjects: string[];
  sortKey: SubjectSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectSubject: (id: string) => void;
  onSort: (key: SubjectSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Subject', sortable: true },
  { id: 'department', label: 'Department', sortable: true },
  { id: 'assignedTeachers', label: 'Teachers', sortable: true },
  { id: 'classSections', label: 'Sections', sortable: true },
  { id: 'units', label: 'Units', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Subject' },
  { icon: '+', label: 'Assign Teacher' },
  { icon: '#', label: 'Map Sections' },
] as const;

const DANGER_ACTIONS = [{ icon: '!', label: 'Archive Subject' }] as const;

function statusAccent(status: string) {
  if (status === 'Active') return '#5cc789';
  if (status === 'Needs Teacher') return '#f5c842';
  return '#8a9a90';
}

function subjectInitials(name: string) {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export const SubjectsTable: React.FC<SubjectsTableProps> = ({
  subjects,
  selectedSubjects,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectSubject,
  onSort,
}) => {
  const allVisibleSelected = selectedSubjects.length === subjects.length && subjects.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedSubjects.length}
        itemLabel="subject"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Assign Teacher',
            onClick: () => alert('Assign teacher functionality not implemented yet.'),
          },
          {
            label: 'Archive',
            onClick: () => alert('Archive subject functionality not implemented yet.'),
            tone: 'danger',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1240}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as SubjectSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible subjects"
          />
        }
      >
        {subjects.map((subject) => (
          <tr
            key={subject.id}
            className={selectedSubjects.includes(subject.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedSubjects.includes(subject.id)}
              onToggle={() => onSelectSubject(subject.id)}
              label={`Select ${subject.name}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: subject.accent }}>
                  {subjectInitials(subject.name)}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{subject.name}</span>
                  <span className={peopleStyles.studentEmail}>
                    {subject.code} | {subject.gradeLevels}
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className={listStyles.stackMeta}>
                <span className={listStyles.stackMetaPrimary}>{subject.department}</span>
                <span className={listStyles.stackMetaSecondary}>{subject.curriculum}</span>
              </div>
            </td>
            <td>{subject.assignedTeachers}</td>
            <td>{subject.classSections}</td>
            <td>{subject.units}</td>
            <td>
              <ChalkBadge label={subject.status} accent={statusAccent(subject.status)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${subject.name}`}
                actions={ROW_ACTIONS}
                dangerActions={DANGER_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Subject') {
                    alert('Subject detail functionality not implemented yet.');
                  }
                  if (label === 'Assign Teacher') {
                    alert('Assign teacher functionality not implemented yet.');
                  }
                  if (label === 'Map Sections') {
                    alert('Map sections functionality not implemented yet.');
                  }
                  if (label === 'Archive Subject') {
                    alert('Archive subject functionality not implemented yet.');
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
