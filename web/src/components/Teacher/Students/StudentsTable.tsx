import { DataTable } from '../shared';
import { StudentRow } from './components/StudentRow';
import { StudentsBulkBar } from './components/StudentsBulkBar';
import type { TeacherStudentRow } from '@/types/teacherStudents';
import styles from './students.module.css';

interface StudentsTableProps {
  students: TeacherStudentRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  selectedActiveCount: number;
  selectedInactiveCount: number;
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

const COLUMNS = [
  'Student',
  'ID Number',
  'Class',
  'Contact',
  'Attendance',
  'Average Grade',
  'Status',
  'Actions',
] as const;

export function StudentsTable({
  students,
  selectedIds,
  allVisibleSelected,
  selectedActiveCount,
  selectedInactiveCount,
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
