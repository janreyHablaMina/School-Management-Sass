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
import type { AnnouncementRecord, AnnouncementSortKey } from './useAnnouncements';

interface AnnouncementsTableProps {
  announcements: AnnouncementRecord[];
  selectedAnnouncements: string[];
  sortKey: AnnouncementSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectAnnouncement: (id: string) => void;
  onSort: (key: AnnouncementSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Announcement', sortable: true },
  { id: 'audience', label: 'Audience', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'delivery', label: 'Delivery', sortable: true },
  { id: 'publishedSortKey', label: 'Publish Date', sortable: true },
  { id: 'recipientCount', label: 'Recipients', sortable: true },
  { id: 'readRate', label: 'Read Rate', sortable: true },
  { id: 'priority', label: 'Priority', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Announcement' },
  { icon: '@', label: 'Message Audience' },
  { icon: '#', label: 'Duplicate' },
] as const;

function statusAccent(status: string) {
  if (status === 'Published') return '#5cc789';
  if (status === 'Scheduled') return '#84a9ff';
  if (status === 'Draft') return '#f5c842';
  return '#8a9a90';
}

function priorityAccent(priority: string) {
  if (priority === 'Urgent') return '#ff4f73';
  if (priority === 'High') return '#ff7e93';
  if (priority === 'Medium') return '#f5c842';
  return '#5cc789';
}

function typeAccent(type: string) {
  if (type === 'Urgent') return '#ff7e93';
  if (type === 'Event') return '#b68eff';
  if (type === 'Academic') return '#5cc789';
  if (type === 'Reminder') return '#f5c842';
  return '#84a9ff';
}

function readRateAccent(readRate: number) {
  if (readRate >= 80) return '#5cc789';
  if (readRate >= 60) return '#f5c842';
  return '#ff7e93';
}

export const AnnouncementsTable: React.FC<AnnouncementsTableProps> = ({
  announcements,
  selectedAnnouncements,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectAnnouncement,
  onSort,
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
        minWidth={1480}
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
            className={
              selectedAnnouncements.includes(announcement.id) ? listStyles.rowSelected : ''
            }
          >
            <RowSelectCell
              selected={selectedAnnouncements.includes(announcement.id)}
              onToggle={() => onSelectAnnouncement(announcement.id)}
              label={`Select ${announcement.title}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: announcement.accent }}>
                  {announcement.title.slice(0, 2).toUpperCase()}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{announcement.title}</span>
                  <span className={peopleStyles.studentEmail}>{announcement.description}</span>
                </div>
              </div>
            </td>
            <td>{announcement.audience}</td>
            <td>
              <ChalkBadge label={announcement.type} accent={typeAccent(announcement.type)} />
            </td>
            <td>
              <ChalkBadge label={announcement.status} accent={statusAccent(announcement.status)} />
            </td>
            <td>{announcement.delivery}</td>
            <td>{announcement.publishedAt}</td>
            <td>{announcement.recipientCount.toLocaleString()}</td>
            <td>
              <ProgressStatCell
                current={announcement.readRate}
                total={100}
                barColor={readRateAccent(announcement.readRate)}
              />
            </td>
            <td>
              <ChalkBadge
                label={announcement.priority}
                accent={priorityAccent(announcement.priority)}
              />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${announcement.title}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Announcement') {
                    alert('Announcement detail functionality not implemented yet.');
                  }
                  if (label === 'Message Audience') {
                    alert('Message audience functionality not implemented yet.');
                  }
                  if (label === 'Duplicate') {
                    alert('Duplicate announcement functionality not implemented yet.');
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
