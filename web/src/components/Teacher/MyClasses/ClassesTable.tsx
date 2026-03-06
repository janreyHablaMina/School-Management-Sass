import {
  DataTable,
  listStyles,
  ResourceBulkBar,
  type DataTableColumn,
} from '../shared';
import type { MyClassRow } from '@/types/myClasses';
import { ClassRow } from './components/ClassRow';
import type { MyClassSortKey } from './useMyClasses';

interface ClassesTableProps {
  classes: MyClassRow[];
  selectedIds: number[];
  allVisibleSelected: boolean;
  selectedActiveCount: number;
  selectedArchivedCount: number;
  sortKey: MyClassSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: MyClassSortKey) => void;
  onToggleClass: (id: number) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onBulkArchive: () => void;
  onBulkRestore: () => void;
  onOpen: (id: number) => void;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
  onViewSchedule: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'subject', label: 'Class', sortable: true },
  { id: 'schedule', label: 'Schedule', sortable: true },
  { id: 'studentCount', label: 'Students', sortable: true },
  { id: 'attendanceRate', label: 'Attendance', sortable: true },
  { id: 'courseProgress', label: 'Progress', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function ClassesTable({
  classes,
  selectedIds,
  allVisibleSelected,
  selectedActiveCount,
  selectedArchivedCount,
  sortKey,
  sortDirection,
  onSort,
  onToggleClass,
  onToggleAllVisible,
  onClearSelection,
  onBulkArchive,
  onBulkRestore,
  onOpen,
  onEdit,
  onDuplicate,
  onViewSchedule,
  onArchive,
  onRestore,
}: ClassesTableProps) {
  const bulkActions = [
    ...(selectedActiveCount > 0
      ? [
          {
            label: `Archive selected (${selectedActiveCount})`,
            onClick: onBulkArchive,
            tone: 'danger' as const,
          },
        ]
      : []),
    ...(selectedArchivedCount > 0
      ? [
          {
            label: `Restore selected (${selectedArchivedCount})`,
            onClick: onBulkRestore,
            tone: 'restore' as const,
          },
        ]
      : []),
  ];

  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="class"
        actions={bulkActions}
        onClearSelection={onClearSelection}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={980}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as MyClassSortKey)}
        leadingHeader={
          <input
            type="checkbox"
            className={listStyles.checkbox}
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            aria-label="Select all visible classes"
          />
        }
      >
        {classes.map((cls) => (
          <ClassRow
            key={cls.id}
            cls={cls}
            selected={selectedIds.includes(cls.id)}
            onToggleSelect={onToggleClass}
            onOpen={onOpen}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onViewSchedule={onViewSchedule}
            onArchive={onArchive}
            onRestore={onRestore}
          />
        ))}
      </DataTable>
    </div>
  );
}
