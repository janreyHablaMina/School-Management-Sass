'use client';

import React from 'react';
import { listStyles, ResourceListPage } from '../shared';
import { AnnouncementsFilters } from './AnnouncementsFilters';
import { AnnouncementsTable } from './AnnouncementsTable';
import { useAnnouncements } from './useAnnouncements';

export function AnnouncementsView() {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedAnnouncements,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useAnnouncements();

  return (
    <ResourceListPage
      title="Announcements"
      subtitle="Create and manage updates for your classes and parents."
      headerActions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export
          </button>
          <button type="button" className={listStyles.primaryBtn}>
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
          tabs={tabs}
          audiences={filterOptions.audiences}
          statuses={filterOptions.statuses}
          types={filterOptions.types}
          sorts={filterOptions.sorts}
        />
      }
      itemsCount={paginatedAnnouncements.length}
      emptyTitle="No announcements found"
      emptyDescription="Try adjusting your search or filters."
      table={<AnnouncementsTable announcements={paginatedAnnouncements} />}
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      total={filteredCount}
      page={page}
      totalPages={totalPages}
      itemLabel="announcements"
      onPageChange={setPage}
    />
  );
}
