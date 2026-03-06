import {
  DataTable,
  type DataTableColumn,
  ResourceBulkBar,
  SelectAllCheckbox,
} from '../shared';
import { ExamRow } from './components/ExamRow';
import type { TeacherExamRow } from '@/types/teacherExams';
import type { ExamSortKey } from './useExams';

interface ExamsTableProps {
  exams: TeacherExamRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: ExamSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: ExamSortKey) => void;
  onToggle: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  onArchiveItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Exam', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'dueSortKey', label: 'Date / Schedule', sortable: true },
  { id: 'duration', label: 'Duration', sortable: true },
  { id: 'completedCount', label: 'Students', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function ExamsTable({
  exams,
  selectedIds,
  allVisibleSelected,
  sortKey,
  sortDirection,
  onSort,
  onToggle,
  onToggleAllVisible,
  onClearSelection,
  onArchiveSelected,
  onDeleteSelected,
  onArchiveItem,
  onDeleteItem,
}: ExamsTableProps) {
  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="exam"
        onClearSelection={onClearSelection}
        actions={[
          { label: 'Archive', onClick: onArchiveSelected, tone: 'danger' },
          { label: 'Delete', onClick: onDeleteSelected, tone: 'danger' },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1080}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as ExamSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible exams"
          />
        }
      >
        {exams.map((exam) => (
          <ExamRow
            key={exam.id}
            exam={exam}
            selected={selectedIds.includes(exam.id)}
            onToggleSelect={onToggle}
            onArchive={onArchiveItem}
            onDelete={onDeleteItem}
          />
        ))}
      </DataTable>
    </div>
  );
}
