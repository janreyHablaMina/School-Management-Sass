import React from 'react';
import type { Metric } from '../../shared/MetricsGrid';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { AnnouncementsFilters } from './AnnouncementsFilters';
import { AnnouncementsTable } from './AnnouncementsTable';
import { useAnnouncements, AnnouncementRecord } from './useAnnouncements';
import { EmptyState } from '@/components/ui/shared';
import { AnnouncementDetailView } from '@/components/Teacher/Announcements/components/AnnouncementDetailView';
import { CreateAnnouncementModal } from '@/components/Teacher/Announcements/components/CreateAnnouncementModal';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';
import type { CreateAnnouncementInput } from '@/types/teacherAnnouncements';

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
    isCreateOpen,
    openCreate,
    closeCreate,
    addAnnouncement,
  } = useAnnouncements();

  const [selectedAnnouncementForDetails, setSelectedAnnouncementForDetails] = React.useState<AnnouncementRecord | null>(null);

  const handleCreate = (input: CreateAnnouncementInput) => {
    let audience = 'All Users';
    if (!input.allClasses && input.classrooms.length > 0) {
        audience = input.classrooms.join(', ');
        if (input.includeParents) audience += ' and Parents';
    } else if (input.includeParents) {
        audience = 'Parents';
    }

    const newAnnouncement: AnnouncementRecord = {
      id: `ann${Date.now()}`,
      title: input.title,
      description: input.description,
      audience: audience,
      type: input.type,
      status: input.publishMode === 'publish' ? 'Published' : input.publishMode === 'schedule' ? 'Scheduled' : 'Draft',
      delivery: 'Portal',
      author: 'Admin', // Indicates it was created by school admin
      publishedAt: input.publishMode === 'publish' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : input.publishMode === 'schedule' && input.scheduledAt ? new Date(input.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft',
      publishedSortKey: new Date().toISOString().split('T')[0],
      recipientCount: 0,
      readRate: 0,
      priority: input.type === 'Urgent' ? 'High' : 'Medium',
      accent: '#84a9ff',
    };
    addAnnouncement(newAnnouncement);
    closeCreate();
  };

  if (selectedAnnouncementForDetails) {
    const teacherRow = {
      id: selectedAnnouncementForDetails.id,
      title: selectedAnnouncementForDetails.title,
      description: selectedAnnouncementForDetails.description,
      type: selectedAnnouncementForDetails.type as any,
      status: selectedAnnouncementForDetails.status as any,
      audience: selectedAnnouncementForDetails.audience,
      publishedAt: selectedAnnouncementForDetails.publishedAt,
      publishedSortKey: selectedAnnouncementForDetails.publishedSortKey,
      views: selectedAnnouncementForDetails.readRate,
      isPinned: false,
      scheduledFor: selectedAnnouncementForDetails.status === 'Scheduled' ? selectedAnnouncementForDetails.publishedAt : undefined,
    };
    
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
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
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
    </>
  );
};
