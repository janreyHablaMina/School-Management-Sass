import {
  DataTable,
  type DataTableColumn,
  ResourceBulkBar,
  SelectAllCheckbox,
} from '../shared';
import { AssignmentRow } from './components/AssignmentRow';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';
import type { AssignmentSortKey } from './useAssignments';

interface AssignmentsTableProps {
  assignments: TeacherAssignmentRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: AssignmentSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: AssignmentSortKey) => void;
  onToggle: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  onArchiveItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onViewAssignment: (id: string, initialTab?: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Assignment', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'dueSortKey', label: 'Due Date', sortable: true },
  { id: 'submittedCount', label: 'Submissions', sortable: true },
  { id: 'averageScore', label: 'Average Score', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function AssignmentsTable({
  assignments,
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
  onDuplicateItem,
  onViewAssignment,
}: AssignmentsTableProps) {
  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="assignment"
        onClearSelection={onClearSelection}
        actions={[
          { label: `Archive selected (${selectedIds.length})`, onClick: onArchiveSelected, tone: 'danger' },
          { label: `Delete selected (${selectedIds.length})`, onClick: onDeleteSelected, tone: 'danger' },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1180}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AssignmentSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible assignments"
          />
        }
      >
        {assignments.map((assignment) => (
          <AssignmentRow
            key={assignment.id}
            assignment={assignment}
            selected={selectedIds.includes(assignment.id)}
            onToggleSelect={onToggle}
            onArchive={onArchiveItem}
            onDelete={onDeleteItem}
            onDuplicate={onDuplicateItem}
            onViewAssignment={onViewAssignment}
          />
        ))}
      </DataTable>
    </div>
  );
}
