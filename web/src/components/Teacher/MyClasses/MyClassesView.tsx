'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, ResourceListPage, TeacherToast } from '../shared';
import { ArchiveClassModal } from './components/ArchiveClassModal';
import { ClassDetailView } from './components/ClassDetailView';
import { ClassFormModal } from './components/ClassFormModal';
import { ClassScheduleModal } from './components/ClassScheduleModal';
import { CreateClassModal } from './components/CreateClassModal';
import { InviteStudentModal } from './components/InviteStudentModal';
import { ClassesTable } from './ClassesTable';
import { MyClassesFilters } from './MyClassesFilters';
import { classToFormValues } from './utils';
import { useMyClasses } from './useMyClasses';

interface MyClassesViewProps {
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function MyClassesView({ onNavigate }: MyClassesViewProps) {
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    filteredCount,
    paginatedClasses,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    selectedClass,
    openClass,
    backToClasses,
    isCreateOpen,
    openCreate,
    closeCreate,
    createClass,
    editingClass,
    openEdit,
    closeEdit,
    updateClass,
    duplicateClass,
    scheduleClass,
    openSchedule,
    closeSchedule,
    inviteClass,
    openInvite,
    closeInvite,
    notifyInviteCopied,
    archiveTarget,
    openArchive,
    closeArchive,
    confirmArchive,
    restoreClass,
    selectedIds,
    selectedActiveCount,
    selectedArchivedCount,
    allVisibleSelected,
    toggleClass,
    toggleAllVisible,
    clearSelection,
    bulkArchiveOpen,
    openBulkArchive,
    closeBulkArchive,
    confirmBulkArchive,
    restoreSelected,
    sortKey,
    sortDirection,
    handleSort,
    toast,
    dismissToast,
  } = useMyClasses();

  return (
    <>
      {selectedClass ? (
        <ClassDetailView
          cls={selectedClass}
          onBack={backToClasses}
          onEdit={
            selectedClass.status === 'Active'
              ? () => openEdit(selectedClass.id)
              : undefined
          }
          onInvite={
            selectedClass.status === 'Active'
              ? () => openInvite(selectedClass.id)
              : undefined
          }
          onNavigate={onNavigate}
        />
      ) : (
        <ResourceListPage
          title="My Classes"
          subtitle="View and manage all your classes in one place."
          headerActions={
            <button type="button" className={listStyles.primaryBtn} onClick={openCreate}>
              + Create New Class
            </button>
          }
          metrics={metrics}
          metricsColumns={4}
          filters={
            <MyClassesFilters
              filters={filters}
              onFilterChange={setFilter}
              academicYears={filterOptions.academicYears}
              gradeLevels={filterOptions.gradeLevels}
              subjects={filterOptions.subjects}
              statuses={filterOptions.statuses}
              onClear={clearFilters}
            />
          }
          itemsCount={paginatedClasses.length}
          emptyTitle="No classes found"
          emptyDescription="Try adjusting your search or filters."
          table={
            <ClassesTable
              classes={paginatedClasses}
              selectedIds={selectedIds}
              allVisibleSelected={allVisibleSelected}
              selectedActiveCount={selectedActiveCount}
              selectedArchivedCount={selectedArchivedCount}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              onToggleClass={toggleClass}
              onToggleAllVisible={toggleAllVisible}
              onClearSelection={clearSelection}
              onBulkArchive={openBulkArchive}
              onBulkRestore={restoreSelected}
              onOpen={openClass}
              onEdit={openEdit}
              onInvite={openInvite}
              onDuplicate={duplicateClass}
              onViewSchedule={openSchedule}
              onArchive={openArchive}
              onRestore={restoreClass}
            />
          }
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          total={filteredCount}
          page={page}
          totalPages={totalPages}
          itemLabel="classes"
          onPageChange={setPage}
        />
      )}

      {isCreateOpen ? (
        <CreateClassModal
          subjects={filterOptions.subjects}
          gradeLevels={filterOptions.gradeLevels}
          academicYears={filterOptions.academicYears}
          onCancel={closeCreate}
          onCreate={createClass}
        />
      ) : null}

      {editingClass ? (
        <ClassFormModal
          mode="edit"
          subjects={filterOptions.subjects}
          gradeLevels={filterOptions.gradeLevels}
          academicYears={filterOptions.academicYears}
          initialValues={classToFormValues(editingClass)}
          onCancel={closeEdit}
          onSubmit={updateClass}
        />
      ) : null}

      {scheduleClass ? (
        <ClassScheduleModal
          cls={scheduleClass}
          onClose={closeSchedule}
          onEdit={
            scheduleClass.status === 'Active'
              ? () => openEdit(scheduleClass.id)
              : undefined
          }
          onOpenCalendar={() => {
            closeSchedule();
            onNavigate?.('Calendar');
          }}
        />
      ) : null}

      {inviteClass ? (
        <InviteStudentModal
          cls={inviteClass}
          onClose={closeInvite}
          onCopied={notifyInviteCopied}
        />
      ) : null}

      {archiveTarget ? (
        <ArchiveClassModal
          cls={archiveTarget}
          onCancel={closeArchive}
          onConfirm={confirmArchive}
        />
      ) : null}

      {bulkArchiveOpen ? (
        <ArchiveClassModal
          count={selectedActiveCount}
          onCancel={closeBulkArchive}
          onConfirm={confirmBulkArchive}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </>
  );
}
