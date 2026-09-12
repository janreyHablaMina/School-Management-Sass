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
import parentStyles from '../students.module.css';
import type { ParentRecord, ParentSortKey } from './useParents';

interface ParentsTableProps {
  parents: ParentRecord[];
  selectedParents: string[];
  sortKey: ParentSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectParent: (id: string) => void;
  onSort: (key: ParentSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Parent', sortable: true },
  { id: 'relationship', label: 'Relationship', sortable: true },
  { id: 'studentName', label: 'Linked Student', sortable: true },
  { id: 'grade', label: 'Grade / Section', sortable: true },
  { id: 'status', label: 'Portal Status', sortable: true },
  { id: 'lastLogin', label: 'Last Login', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Parent' },
  { icon: '@', label: 'Message Parent' },
  { icon: '+', label: 'Link Student' },
] as const;

const DANGER_ACTIONS = [{ icon: '!', label: 'Deactivate Account' }] as const;

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function statusAccent(status: string) {
  if (status === 'Active') return '#5cc789';
  if (status === 'Pending Invite') return '#f5c842';
  return '#ff7e93';
}

export const ParentsTable: React.FC<ParentsTableProps> = ({
  parents,
  selectedParents,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectParent,
  onSort,
}) => {
  const allVisibleSelected = selectedParents.length === parents.length && parents.length > 0;

  return (
    <div className={parentStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedParents.length}
        itemLabel="parent"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Send Invite',
            onClick: () => alert('Send invite functionality not implemented yet.'),
          },
          {
            label: 'Deactivate',
            onClick: () => alert('Deactivate parent functionality not implemented yet.'),
            tone: 'danger',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1240}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as ParentSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible parents"
          />
        }
      >
        {parents.map((parent) => (
          <tr
            key={parent.id}
            className={selectedParents.includes(parent.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedParents.includes(parent.id)}
              onToggle={() => onSelectParent(parent.id)}
              label={`Select ${parent.name}`}
            />
            <td>
              <div className={parentStyles.studentCell}>
                <div className={parentStyles.avatar} style={{ background: parent.avatarColor }}>
                  {getInitials(parent.name)}
                </div>
                <div className={parentStyles.studentInfo}>
                  <span className={parentStyles.studentName}>{parent.name}</span>
                  <span className={parentStyles.studentEmail}>{parent.email}</span>
                </div>
              </div>
            </td>
            <td>{parent.relationship}</td>
            <td>
              <div className={listStyles.stackMeta}>
                <span className={listStyles.stackMetaPrimary}>{parent.studentName}</span>
                <span className={listStyles.stackMetaSecondary}>ID: {parent.studentId}</span>
              </div>
            </td>
            <td>{parent.gradeSection}</td>
            <td>
              <ChalkBadge label={parent.status} accent={statusAccent(parent.status)} />
            </td>
            <td>{parent.lastLogin}</td>
            <td>
              <RowActionsMenu
                label={`More actions for ${parent.name}`}
                actions={ROW_ACTIONS}
                dangerActions={DANGER_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Parent') {
                    alert('Parent profile functionality not implemented yet.');
                  }
                  if (label === 'Message Parent') {
                    alert('Message parent functionality not implemented yet.');
                  }
                  if (label === 'Link Student') {
                    alert('Link student functionality not implemented yet.');
                  }
                  if (label === 'Deactivate Account') {
                    alert('Deactivate account functionality not implemented yet.');
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
