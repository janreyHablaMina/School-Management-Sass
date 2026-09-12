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
import type { AttendanceRecord, AttendanceSortKey } from './useAttendance';

interface AttendanceTableProps {
  attendance: AttendanceRecord[];
  selectedAttendance: string[];
  sortKey: AttendanceSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectAttendance: (id: string) => void;
  onSort: (key: AttendanceSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'gradeSection', label: 'Section', sortable: true },
  { id: 'adviser', label: 'Adviser', sortable: true },
  { id: 'present', label: 'Present', sortable: true },
  { id: 'absent', label: 'Absent', sortable: true },
  { id: 'late', label: 'Late', sortable: true },
  { id: 'rate', label: 'Rate', sortable: true },
  { id: 'status', label: 'Submission', sortable: true },
  { id: 'riskLevel', label: 'Risk', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Attendance' },
  { icon: '@', label: 'Message Adviser' },
  { icon: '#', label: 'Export Section' },
] as const;

function rateAccent(rate: number) {
  if (rate >= 93) return '#5cc789';
  if (rate >= 88) return '#f5c842';
  return '#ff7e93';
}

function riskAccent(risk: string) {
  if (risk === 'Low') return '#5cc789';
  if (risk === 'Medium') return '#f5c842';
  return '#ff7e93';
}

function statusAccent(status: string) {
  return status === 'Submitted' ? '#5cc789' : '#f5c842';
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendance,
  selectedAttendance,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectAttendance,
  onSort,
}) => {
  const allVisibleSelected =
    selectedAttendance.length === attendance.length && attendance.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedAttendance.length}
        itemLabel="section"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export attendance functionality not implemented yet.'),
          },
          {
            label: 'Notify Advisers',
            onClick: () => alert('Notify advisers functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1320}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AttendanceSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible attendance rows"
          />
        }
      >
        {attendance.map((record) => (
          <tr
            key={record.id}
            className={selectedAttendance.includes(record.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedAttendance.includes(record.id)}
              onToggle={() => onSelectAttendance(record.id)}
              label={`Select ${record.gradeSection}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: record.accent }}>
                  {record.gradeSection.replace('Grade ', 'G').split(' ')[0]}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{record.gradeSection}</span>
                  <span className={peopleStyles.studentEmail}>
                    {record.room} | {record.lastSubmitted}
                  </span>
                </div>
              </div>
            </td>
            <td>{record.adviser}</td>
            <td>{record.present}</td>
            <td>{record.absent}</td>
            <td>{record.late}</td>
            <td>
              <ProgressStatCell
                current={record.present}
                total={record.total}
                barColor={rateAccent(record.rate)}
              />
            </td>
            <td>
              <ChalkBadge label={record.status} accent={statusAccent(record.status)} />
            </td>
            <td>
              <ChalkBadge label={record.riskLevel} accent={riskAccent(record.riskLevel)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${record.gradeSection}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Attendance') {
                    alert('Attendance detail functionality not implemented yet.');
                  }
                  if (label === 'Message Adviser') {
                    alert('Message adviser functionality not implemented yet.');
                  }
                  if (label === 'Export Section') {
                    alert('Export section functionality not implemented yet.');
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
