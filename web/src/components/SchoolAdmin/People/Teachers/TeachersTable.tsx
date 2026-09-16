import React from 'react';
import { ChalkBadge, DataTable, listStyles, ResourceBulkBar, RowActionsMenu, RowSelectCell, SelectAllCheckbox, type DataTableColumn } from '@/components/ui/shared';
import { SortKey } from './useTeachers';
import styles from './teachers.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeachersTableProps {
  teachers: Teacher[];
  totalCount: number;
  selectedTeachers: string[];
  sortKey?: SortKey | null;
  sortDirection?: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectTeacher: (id: string) => void;
  onSort: (key: SortKey) => void;
  onViewDetails: (teacher: Teacher) => void;
  onMessage?: (ids: string[]) => void;
  onArchive?: (ids: string[]) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Teacher', sortable: true },
  { id: 'department', label: 'Department', sortable: true },
  { id: 'subjects', label: 'Subjects', sortable: true },
  { id: 'classes', label: 'Classes', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

const ROW_ACTIONS = [
  { icon: '👁️', label: 'View Profile' },
  { icon: '✏️', label: 'Edit Teacher' },
  { icon: '✉️', label: 'Send Message' },
] as const;

const DANGER_ACTIONS = [
  { icon: '🗑️', label: 'Archive Teacher' },
] as const;

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  teachers,
  selectedTeachers,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectTeacher,
  onSort,
  onViewDetails,
  onMessage,
  onArchive
}) => {
  const allVisibleSelected = selectedTeachers.length === teachers.length && teachers.length > 0;

  return (
    <div className={styles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedTeachers.length}
        itemLabel="teacher"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Send Message',
            onClick: () => onMessage?.(selectedTeachers),
          },
          {
            label: 'Archive',
            onClick: () => onArchive?.(selectedTeachers),
            tone: 'danger',
          }
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1100}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as SortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible teachers"
          />
        }
      >
        {teachers.map((teacher) => {
          return (
            <tr
              key={teacher.id}
              className={`${listStyles.clickableRow}${selectedTeachers.includes(teacher.id) ? ` ${listStyles.rowSelected}` : ''}`}
              onClick={() => onViewDetails(teacher)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onViewDetails(teacher);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open profile for ${teacher.name}`}
            >
              <RowSelectCell
                selected={selectedTeachers.includes(teacher.id)}
                onToggle={() => onSelectTeacher(teacher.id)}
                label={`Select ${teacher.name}`}
              />
              <td>
                <div className={styles.teacherCell}>
                  <div className={styles.avatar} style={{ background: teacher.departmentColor, color: '#fff' }}>
                    {teacher.avatar ? (
                      <img src={teacher.avatar} alt={teacher.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      getInitials(teacher.name)
                    )}
                  </div>
                  <div className={styles.teacherInfo}>
                    <span className={styles.teacherName}>{teacher.name}</span>
                    <span className={styles.teacherId}>ID: {teacher.employeeId}</span>
                  </div>
                </div>
              </td>
              <td>
                <span style={{ color: teacher.departmentColor, fontWeight: 500 }}>
                  {teacher.department}
                </span>
              </td>
              <td>{teacher.subjects}</td>
              <td>{teacher.classes}</td>
              <td>
                <ChalkBadge label={teacher.status} accent={teacher.statusColor} />
              </td>
              <td
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <RowActionsMenu
                  label={`More actions for ${teacher.name}`}
                  actions={ROW_ACTIONS}
                  dangerActions={DANGER_ACTIONS}
                  onAction={(label) => {
                    if (label === 'View Profile') onViewDetails(teacher);
                    if (label === 'Edit Teacher') alert('Edit not implemented');
                    if (label === 'Send Message') onMessage?.([teacher.id]);
                    if (label === 'Archive Teacher') onArchive?.([teacher.id]);
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
