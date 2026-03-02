'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  ConfirmActionModal,
  listStyles,
  ResourceListPage,
  TeacherToast,
} from '../shared';
import type { TeacherAnnouncementRow } from '@/types/teacherAnnouncements';
import { AnnouncementsFilters } from './AnnouncementsFilters';
import { AnnouncementsTable } from './AnnouncementsTable';
import { CreateAnnouncementModal } from './components/CreateAnnouncementModal';
import { useAnnouncements } from './useAnnouncements';

const AnnouncementDetailView = dynamic(() =>
  import('./components/AnnouncementDetailView').then((mod) => mod.AnnouncementDetailView),
);

export function AnnouncementsView() {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    React.useState<TeacherAnnouncementRow | null>(null);
  const [confirmAction, setConfirmAction] = React.useState<{
    type: 'archive_bulk' | 'delete_bulk' | 'archive_single' | 'delete_single';
    id?: string;
  } | null>(null);
  const {
    metrics,
    filterOptions,
    classroomOptions,
    filters,
    setFilter,
    clearFilters,
    isDirty,
    filteredCount,
    paginatedAnnouncements,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    isCreateOpen,
    openCreate,
    closeCreate,
    createAnnouncement,
    selectedIds,
    allVisibleSelected,
    sortKey,
    sortDirection,
    handleSort,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
    duplicateItem,
    toast,
    dismissToast,
  } = useAnnouncements();
  const confirmAnnouncement = confirmAction?.id
    ? paginatedAnnouncements.find((announcement) => announcement.id === confirmAction.id) ?? null
    : null;
  const confirmCount = confirmAction?.type.includes('bulk') ? selectedIds.length : 1;
  const confirmActionType = confirmAction?.type.includes('archive') ? 'archive' : 'delete';

  if (selectedAnnouncement) {
    return (
      <AnnouncementDetailView
        announcement={selectedAnnouncement}
        onBack={() => setSelectedAnnouncement(null)}
      />
    );
  }

  return (
    <>
      <ResourceListPage
        title="Announcements"
        subtitle="Create and manage updates for your classes and parents."
        headerActions={
          <>
            <button type="button" className={listStyles.secondaryBtn}>
              ⬇ Export
            </button>
            <button type="button" className={listStyles.primaryBtn} onClick={openCreate}>
              + New Announcement
            </button>
          </>
        }
        metrics={metrics}
        metricsColumns={5}
        filters={
          <AnnouncementsFilters
            filters={filters}
            onFilterChange={setFilter}
            audiences={filterOptions.audiences}
            statuses={filterOptions.statuses}
            types={filterOptions.types}
            onClearFilters={clearFilters}
            isDirty={isDirty}
          />
        }
        itemsCount={paginatedAnnouncements.length}
        emptyTitle="No announcements found"
        emptyDescription="Try adjusting your search or filters."
        table={
          <AnnouncementsTable
            announcements={paginatedAnnouncements}
            selectedIds={selectedIds}
            allVisibleSelected={allVisibleSelected}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            onToggle={toggle}
            onToggleAllVisible={toggleAllVisible}
            onClearSelection={clearSelection}
            onViewAnnouncement={setSelectedAnnouncement}
            onDuplicateItem={duplicateItem}
            onArchiveSelected={() => setConfirmAction({ type: 'archive_bulk' })}
            onDeleteSelected={() => setConfirmAction({ type: 'delete_bulk' })}
            onArchiveItem={(id) => setConfirmAction({ type: 'archive_single', id })}
            onDeleteItem={(id) => setConfirmAction({ type: 'delete_single', id })}
          />
        }
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="announcements"
        onPageChange={setPage}
      />

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}

      {confirmAction ? (
        <ConfirmActionModal
          title={
            confirmAction.type.includes('bulk')
              ? `${confirmCount} ${confirmCount === 1 ? 'announcement' : 'announcements'}`
              : confirmAnnouncement?.title ?? 'Announcement'
          }
          copy={
            confirmAction.type.includes('bulk')
              ? 'Selected from your announcements list'
              : confirmAnnouncement?.audience ?? ''
          }
          itemLabel="announcement"
          count={confirmCount}
          actionType={confirmActionType}
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            if (confirmAction.type === 'archive_bulk') archiveSelected();
            if (confirmAction.type === 'delete_bulk') deleteSelected();
            if (confirmAction.type === 'archive_single' && confirmAction.id) {
              archiveItem(confirmAction.id);
            }
            if (confirmAction.type === 'delete_single' && confirmAction.id) {
              deleteItem(confirmAction.id);
            }
            setConfirmAction(null);
          }}
        />
      ) : null}

      {isCreateOpen ? (
        <CreateAnnouncementModal
          classrooms={classroomOptions}
          onCancel={closeCreate}
          onCreate={createAnnouncement}
        />
      ) : null}
    </>
  );
}
