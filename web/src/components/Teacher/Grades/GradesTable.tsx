import {
  DataTable,
  ResourceBulkBar,
  SelectAllCheckbox,
  type DataTableColumn,
} from '../shared';
import { GradeRow } from './components/GradeRow';
import type { TeacherGradeRow } from '@/types/teacherGrades';
import type { GradeSortKey } from './useGrades';

interface GradesTableProps {
  grades: TeacherGradeRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: GradeSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: GradeSortKey) => void;
  onToggleStudent: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onFlagForReview: () => void;
  onOpen?: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'fullName', label: 'Student', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'term', label: 'Term', sortable: true },
  { id: 'overallScore', label: 'Overall', sortable: true },
  { id: 'letterGrade', label: 'Letter', sortable: true },
  { id: 'breakdown', label: 'Breakdown' },
  { id: 'trend', label: 'Trend', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function GradesTable({
  grades,
  selectedIds,
  allVisibleSelected,
  sortKey,
  sortDirection,
  onSort,
  onToggleStudent,
  onToggleAllVisible,
  onClearSelection,
  onFlagForReview,
  onOpen,
}: GradesTableProps) {
  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="student"
        onClearSelection={onClearSelection}
        actions={[{ label: 'Flag for review', onClick: onFlagForReview }]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1080}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as GradeSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible students"
          />
        }
      >
        {grades.map((grade) => (
          <GradeRow
            key={grade.id}
            grade={grade}
            selected={selectedIds.includes(grade.id)}
            onToggleSelect={onToggleStudent}
            onOpen={onOpen}
          />
        ))}
      </DataTable>
    </div>
  );
}
