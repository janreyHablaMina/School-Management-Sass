import React from 'react';
import { ChalkBadge, DataTable, listStyles, ResourceBulkBar, RowActionsMenu, RowSelectCell, SelectAllCheckbox, type DataTableColumn } from '@/components/ui/shared';
import peopleStyles from '../../People/Students/students.module.css';
import type { AnnouncementRecord, AnnouncementSortKey } from './types';
import { statusAccent, typeAccent } from './utils';

interface AnnouncementsTableProps {
  announcements: AnnouncementRecord[];
  selectedAnnouncements: string[];
  sortKey: AnnouncementSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectAnnouncement: (id: string) => void;
  onSort: (key: AnnouncementSortKey) => void;
  onViewAnnouncement: (announcement: AnnouncementRecord) => void;
  onDuplicateItem: (id: string) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Announcement', sortable: true },
  { id: 'audience', label: 'Audience', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'publishedSortKey', label: 'Publish Date', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '👁', label: 'View Announcement' },
  { icon: '📧', label: 'Message Audience' },
  { icon: '📋', label: 'Duplicate' },
] as const;



export const AnnouncementsTable: React.FC<AnnouncementsTableProps> = ({
  announcements,
  selectedAnnouncements,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectAnnouncement,
  onSort,
  onViewAnnouncement,
  onDuplicateItem,
}) => {
  const allVisibleSelected =
    selectedAnnouncements.length === announcements.length && announcements.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedAnnouncements.length}
        itemLabel="announcement"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Publish',
            onClick: () => alert('Publish announcements functionality not implemented yet.'),
          },
          {
            label: 'Archive',
            onClick: () => alert('Archive announcements functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={900}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AnnouncementSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible announcements"
          />
        }
      >
        {announcements.map((announcement) => (
            <tr
              key={announcement.id}
              className={`${listStyles.clickableRow} ${
                selectedAnnouncements.includes(announcement.id) ? listStyles.rowSelected : ''
              }`}
              onClick={() => onViewAnnouncement(announcement)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onViewAnnouncement(announcement);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View announcement ${announcement.title}`}
            >
            <RowSelectCell
              selected={selectedAnnouncements.includes(announcement.id)}
              onToggle={() => onSelectAnnouncement(announcement.id)}
              label={`Select ${announcement.title}`}
            />
            <td>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px 0' }}>
                <span className={peopleStyles.studentName} style={{ whiteSpace: 'normal', display: 'block' }}>{announcement.title}</span>
                <div>
                  <ChalkBadge label={announcement.type} accent={typeAccent(announcement.type)} />
                </div>
              </div>
            </td>
            <td>{announcement.audience}</td>
            <td>
              <ChalkBadge label={announcement.status} accent={statusAccent(announcement.status)} />
            </td>
            <td>{announcement.publishedAt}</td>
            <td
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <RowActionsMenu
                label={`More actions for ${announcement.title}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Announcement') {
                    onViewAnnouncement(announcement);
                  }
                  if (label === 'Message Audience') {
                    alert('Message audience functionality not implemented yet.');
                  }
                  if (label === 'Duplicate') {
                    onDuplicateItem(announcement.id);
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
