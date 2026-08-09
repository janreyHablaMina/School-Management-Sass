'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, ResourceListPage } from '../shared';
import { ClassDetailView } from './components/ClassDetailView';
import { CreateClassModal } from './components/CreateClassModal';
import { ClassesTable } from './ClassesTable';
import { MyClassesFilters } from './MyClassesFilters';
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
  } = useMyClasses();

  return (
    <>
      {selectedClass ? (
        <ClassDetailView
          cls={selectedClass}
          onBack={backToClasses}
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
          table={<ClassesTable classes={paginatedClasses} onOpen={openClass} />}
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
    </>
  );
}
