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
import type { GradeRecord, GradeSortKey } from './useGrades';

interface GradesTableProps {
  grades: GradeRecord[];
  selectedGrades: string[];
  sortKey: GradeSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectGrade: (id: string) => void;
  onSort: (key: GradeSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'gradeSection', label: 'Gradebook', sortable: true },
  { id: 'teacher', label: 'Teacher', sortable: true },
  { id: 'term', label: 'Term', sortable: true },
  { id: 'classAverage', label: 'Average', sortable: true },
  { id: 'passingRate', label: 'Passing', sortable: true },
  { id: 'gradedStudents', label: 'Completion', sortable: true },
  { id: 'needsAttention', label: 'At Risk', sortable: true },
  { id: 'incomplete', label: 'Incomplete', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'riskLevel', label: 'Risk', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Gradebook' },
  { icon: '@', label: 'Message Teacher' },
  { icon: '#', label: 'Export Grades' },
] as const;

function statusAccent(status: string) {
  if (status === 'Submitted') return '#5cc789';
  if (status === 'Incomplete') return '#f5c842';
  return '#ff7e93';
}

function riskAccent(risk: string) {
  if (risk === 'Low') return '#5cc789';
  if (risk === 'Medium') return '#f5c842';
  return '#ff7e93';
}

function averageAccent(score: number) {
  if (score >= 85) return '#5cc789';
  if (score >= 78) return '#f5c842';
  return '#ff7e93';
}

export const GradesTable: React.FC<GradesTableProps> = ({
  grades,
  selectedGrades,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectGrade,
  onSort,
}) => {
  const allVisibleSelected = selectedGrades.length === grades.length && grades.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedGrades.length}
        itemLabel="gradebook"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export grades functionality not implemented yet.'),
          },
          {
            label: 'Flag Review',
            onClick: () => alert('Flag gradebooks functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1540}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as GradeSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible gradebooks"
          />
        }
      >
        {grades.map((grade) => (
          <tr
            key={grade.id}
            className={selectedGrades.includes(grade.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedGrades.includes(grade.id)}
              onToggle={() => onSelectGrade(grade.id)}
              label={`Select ${grade.gradeSection} ${grade.subject}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: grade.accent }}>
                  {grade.gradeSection.replace('Grade ', 'G').split(' ')[0]}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{grade.gradeSection}</span>
                  <span className={peopleStyles.studentEmail}>
                    {grade.subject} | Updated {grade.lastUpdated}
                  </span>
                </div>
              </div>
            </td>
            <td>{grade.teacher}</td>
            <td>{grade.term}</td>
            <td>
              <ChalkBadge
                label={`${grade.classAverage}%`}
                accent={averageAccent(grade.classAverage)}
              />
            </td>
            <td>{grade.passingRate}%</td>
            <td>
              <ProgressStatCell
                current={grade.gradedStudents}
                total={grade.totalStudents}
                barColor={grade.accent}
              />
            </td>
            <td>{grade.needsAttention}</td>
            <td>{grade.incomplete}</td>
            <td>
              <ChalkBadge label={grade.status} accent={statusAccent(grade.status)} />
            </td>
            <td>
              <ChalkBadge label={grade.riskLevel} accent={riskAccent(grade.riskLevel)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${grade.gradeSection} ${grade.subject}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Gradebook') {
                    alert('Gradebook detail functionality not implemented yet.');
                  }
                  if (label === 'Message Teacher') {
                    alert('Message teacher functionality not implemented yet.');
                  }
                  if (label === 'Export Grades') {
                    alert('Export grades functionality not implemented yet.');
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
