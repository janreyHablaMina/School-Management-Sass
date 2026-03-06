import {
  DataTable,
  type DataTableColumn,
  ResourceBulkBar,
  SelectAllCheckbox,
} from '../shared';
import { AnnouncementRow } from './components/AnnouncementRow';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';
import type { AnnouncementSortKey } from './useAnnouncements';

interface AnnouncementsTableProps {
  announcements: TeacherAnnouncementRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: AnnouncementSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: AnnouncementSortKey) => void;
  onToggle: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  onArchiveItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Announcement', sortable: true },
  { id: 'audience', label: 'Audience', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'createdSortKey', label: 'Date / Views', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function AnnouncementsTable({
  announcements,
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
}: AnnouncementsTableProps) {
  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedIds.length}
        itemLabel="announcement"
        onClearSelection={onClearSelection}
        actions={[
          { label: 'Archive', onClick: onArchiveSelected, tone: 'danger' },
          { label: 'Delete', onClick: onDeleteSelected, tone: 'danger' },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={980}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AnnouncementSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible announcements"
          />
        }
      >
        {announcements.map((announcement) => (
          <AnnouncementRow
            key={announcement.id}
            announcement={announcement}
            selected={selectedIds.includes(announcement.id)}
            onToggleSelect={onToggle}
            onArchive={onArchiveItem}
            onDelete={onDeleteItem}
          />
        ))}
      </DataTable>
    </div>
  );
}
