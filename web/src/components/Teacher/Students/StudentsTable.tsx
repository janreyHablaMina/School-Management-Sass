import { DataTable, type DataTableColumn } from '../shared';
import { StudentRow } from './components/StudentRow';
import { StudentsBulkBar } from './components/StudentsBulkBar';
import type { TeacherStudentRow } from '@/types/teacherStudents';
import type { StudentSortKey } from './useStudents';
import styles from './students.module.css';

interface StudentsTableProps {
  students: TeacherStudentRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  selectedActiveCount: number;
  selectedInactiveCount: number;
  sortKey: StudentSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: StudentSortKey) => void;
  onToggleStudent: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onBulkMarkInactive: () => void;
  onBulkRestoreActive: () => void;
  onOpen: (id: string) => void;
  onEdit?: (id: string) => void;
  onViewGrades?: (id: string) => void;
  onMessage?: (id: string) => void;
  onMarkInactive?: (id: string) => void;
  onRestoreActive?: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'fullName', label: 'Student', sortable: true },
  { id: 'idNumber', label: 'ID Number', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'phone', label: 'Contact', sortable: true },
  { id: 'attendanceRate', label: 'Attendance', sortable: true },
  { id: 'averageGrade', label: 'Average Grade', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function StudentsTable({
  students,
  selectedIds,
  allVisibleSelected,
  selectedActiveCount,
  selectedInactiveCount,
  sortKey,
  sortDirection,
  onSort,
  onToggleStudent,
  onToggleAllVisible,
  onClearSelection,
  onBulkMarkInactive,
  onBulkRestoreActive,
  onOpen,
  onEdit,
  onViewGrades,
  onMessage,
  onMarkInactive,
  onRestoreActive,
}: StudentsTableProps) {
  return (
    <div>
      <StudentsBulkBar
        selectedCount={selectedIds.length}
        selectedActiveCount={selectedActiveCount}
        selectedInactiveCount={selectedInactiveCount}
        onMarkInactive={onBulkMarkInactive}
        onRestoreActive={onBulkRestoreActive}
        onClearSelection={onClearSelection}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1140}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as StudentSortKey)}
        leadingHeader={
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            aria-label="Select all visible students"
          />
        }
      >
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            selected={selectedIds.includes(student.id)}
            onToggleSelect={onToggleStudent}
            onOpen={onOpen}
            onEdit={onEdit}
            onViewGrades={onViewGrades}
            onMessage={onMessage}
            onMarkInactive={onMarkInactive}
            onRestoreActive={onRestoreActive}
          />
        ))}
      </DataTable>
    </div>
  );
}
