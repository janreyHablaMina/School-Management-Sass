import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { AnnouncementsFilters } from './AnnouncementsFilters';
import { AnnouncementsTable } from './AnnouncementsTable';
import { useAnnouncements } from './useAnnouncements';
import type { AnnouncementRecord } from './types';
import { EmptyState, Toast } from '@/components/ui/shared';
import { AnnouncementDetailView } from '@/components/Teacher/Announcements/components/AnnouncementDetailView';
import { CreateAnnouncementModal } from '@/components/Teacher/Announcements/components/CreateAnnouncementModal';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import type { CreateAnnouncementInput } from '@/types/teacherAnnouncements';
import { buildAnnouncementFromInput, mapToTeacherRow } from './utils';

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
    isCreateOpen,
    openCreate,
    closeCreate,
    addAnnouncement,
    duplicateItem,
    toast,
    dismissToast,
    setToast,
  } = useAnnouncements();

  const [selectedAnnouncementForDetails, setSelectedAnnouncementForDetails] = React.useState<AnnouncementRecord | null>(null);

  const handleCreate = (input: CreateAnnouncementInput) => {
    const newAnnouncement = buildAnnouncementFromInput(input);
    addAnnouncement(newAnnouncement);
    closeCreate();
    
    setToast({
      title:
        newAnnouncement.status === 'Published'
          ? 'Announcement published'
          : newAnnouncement.status === 'Scheduled'
            ? 'Announcement scheduled'
            : 'Draft saved',
      message:
        newAnnouncement.status === 'Scheduled' && input.scheduledAt
          ? `${newAnnouncement.title} will auto-send on ${new Date(input.scheduledAt).toLocaleDateString()}.`
          : `${newAnnouncement.title} was added to your announcements.`,
    });
  };

  if (selectedAnnouncementForDetails) {
    const teacherRow = mapToTeacherRow(selectedAnnouncementForDetails);
    
    return (
      <AnnouncementDetailView
        announcement={teacherRow}
        onBack={() => setSelectedAnnouncementForDetails(null)}
      />
    );
  }

  return (
    <>
      <SchoolAdminDirectoryPage
        title="Announcements"
        subtitle="Manage school-wide notices, audience delivery, schedules, and read progress"
        actionButton={{
          label: 'New Announcement',
          onClick: openCreate,
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
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
        />
        {announcements.length === 0 ? (
          <EmptyState
            title="No announcements found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <AnnouncementsTable
            announcements={announcements}
            selectedAnnouncements={selectedAnnouncements}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSelectAll={handleSelectAll}
            onSelectAnnouncement={handleSelectAnnouncement}
            onSort={handleSort}
            onViewAnnouncement={(announcement) => setSelectedAnnouncementForDetails(announcement)}
            onDuplicateItem={duplicateItem}
          />
        )}
      </SchoolAdminDirectoryPage>
      
      {isCreateOpen ? (
        <CreateAnnouncementModal
          classrooms={schoolAdminMockData.classesSections.map(c => c.name)}
          onCancel={closeCreate}
          onCreate={handleCreate}
        />
      ) : null}

      {toast ? (
        <Toast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </>
  );
};
