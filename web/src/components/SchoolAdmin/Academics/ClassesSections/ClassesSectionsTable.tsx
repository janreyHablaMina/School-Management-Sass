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
import type { ClassSectionRecord, ClassSectionSortKey } from './useClassesSections';

interface ClassesSectionsTableProps {
  classSections: ClassSectionRecord[];
  selectedClassSections: string[];
  sortKey: ClassSectionSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectClassSection: (id: string) => void;
  onSort: (key: ClassSectionSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'name', label: 'Class / Section', sortable: true },
  { id: 'adviser', label: 'Adviser', sortable: true },
  { id: 'studentCount', label: 'Enrollment', sortable: true },
  { id: 'attendanceRate', label: 'Attendance', sortable: true },
  { id: 'subjects', label: 'Subjects', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Section' },
  { icon: '+', label: 'Assign Adviser' },
  { icon: '#', label: 'Manage Subjects' },
] as const;

const DANGER_ACTIONS = [{ icon: '!', label: 'Archive Section' }] as const;

function statusAccent(status: string) {
  if (status === 'Active') return '#5cc789';
  if (status === 'Needs Adviser') return '#f5c842';
  return '#8a9a90';
}

function attendanceAccent(rate: number) {
  if (rate >= 94) return '#5cc789';
  if (rate >= 90) return '#f5c842';
  return '#ff7e93';
}

export const ClassesSectionsTable: React.FC<ClassesSectionsTableProps> = ({
  classSections,
  selectedClassSections,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectClassSection,
  onSort,
}) => {
  const allVisibleSelected =
    selectedClassSections.length === classSections.length && classSections.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedClassSections.length}
        itemLabel="section"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Assign Adviser',
            onClick: () => alert('Assign adviser functionality not implemented yet.'),
          },
          {
            label: 'Archive',
            onClick: () => alert('Archive section functionality not implemented yet.'),
            tone: 'danger',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1260}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as ClassSectionSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible classes and sections"
          />
        }
      >
        {classSections.map((item) => (
          <tr
            key={item.id}
            className={selectedClassSections.includes(item.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedClassSections.includes(item.id)}
              onToggle={() => onSelectClassSection(item.id)}
              label={`Select ${item.name}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: item.accent }}>
                  {item.gradeLevel.replace('Grade ', 'G')}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{item.name}</span>
                  <span className={peopleStyles.studentEmail}>
                    {item.room} | {item.academicYear}
                  </span>
                </div>
              </div>
            </td>
            <td>{item.adviser}</td>
            <td>
              <ProgressStatCell
                current={item.studentCount}
                total={item.capacity}
                barColor={item.accent}
              />
            </td>
            <td>
              <ChalkBadge
                label={item.attendanceRate === 0 ? 'No data' : `${item.attendanceRate}%`}
                accent={attendanceAccent(item.attendanceRate)}
              />
            </td>
            <td>{item.subjects}</td>
            <td>
              <ChalkBadge label={item.status} accent={statusAccent(item.status)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${item.name}`}
                actions={ROW_ACTIONS}
                dangerActions={DANGER_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Section') {
                    alert('Section detail functionality not implemented yet.');
                  }
                  if (label === 'Assign Adviser') {
                    alert('Assign adviser functionality not implemented yet.');
                  }
                  if (label === 'Manage Subjects') {
                    alert('Manage subjects functionality not implemented yet.');
                  }
                  if (label === 'Archive Section') {
                    alert('Archive section functionality not implemented yet.');
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
