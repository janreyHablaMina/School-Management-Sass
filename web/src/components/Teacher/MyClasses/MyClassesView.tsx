'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, ResourceListPage, TeacherToast } from '../shared';
import { ClassDetailView } from './components/ClassDetailView';
import { ClassFormModal } from './components/ClassFormModal';
import { CreateClassModal } from './components/CreateClassModal';
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
    toast,
    dismissToast,
  } = useMyClasses();

  return (
    <>
      {selectedClass ? (
        <ClassDetailView
          cls={selectedClass}
          onBack={backToClasses}
          onEdit={() => openEdit(selectedClass.id)}
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
              onOpen={openClass}
              onEdit={openEdit}
              onDuplicate={duplicateClass}
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
