import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { AnnouncementsFilters } from './AnnouncementsFilters';
import { AnnouncementsTable } from './AnnouncementsTable';
import { useAnnouncements } from './useAnnouncements';

const ANNOUNCEMENT_METRICS: Metric[] = [
  {
    title: 'Total Announcements',
    value: '8',
    subtitle: 'Across all audiences',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Published',
    value: '5',
    subtitle: 'Visible to recipients',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Scheduled',
    value: '1',
    subtitle: 'Queued for release',
    iconBg: 'rgba(182, 142, 255, 0.1)',
    iconColor: '#b68eff',
  },
  {
    title: 'Average Read Rate',
    value: '71%',
    subtitle: 'Published announcements',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
];

export const AnnouncementsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    selectedAnnouncements,
    handleSelectAll,
    handleSelectAnnouncement,
    handleSort,
    sortKey,
    sortDirection,
    announcements,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useAnnouncements();

  return (
    <SchoolAdminDirectoryPage
      title="Announcements"
      subtitle="Manage school-wide notices, audience delivery, schedules, and read progress"
      actionButton={{
        label: 'New Announcement',
        onClick: () => console.log('create announcement'),
      }}
      metrics={ANNOUNCEMENT_METRICS}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'announcements',
        onPageChange: setCurrentPage,
      }}
    >
      <AnnouncementsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <AnnouncementsTable
        announcements={announcements}
        selectedAnnouncements={selectedAnnouncements}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectAnnouncement={handleSelectAnnouncement}
        onSort={handleSort}
      />
    </SchoolAdminDirectoryPage>
  );
};
