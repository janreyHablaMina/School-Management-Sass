import React from 'react';
import { PaginationBar } from '@/components/Teacher/shared';
import { MetricsGrid, type Metric } from '../../shared/MetricsGrid';
import { PageHeader } from '../../shared/PageHeader';
import layoutStyles from '../../shared/layout.module.css';
import { ParentsFilters } from './ParentsFilters';
import { ParentsTable } from './ParentsTable';
import { useParents } from './useParents';

const PARENTS_METRICS: Metric[] = [
  {
    title: 'Total Parents',
    value: '1,018',
    subtitle: 'Connected guardian accounts',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
  },
  {
    title: 'Active Accounts',
    value: '892',
    subtitle: '87.6% portal adoption',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
  },
  {
    title: 'Pending Invites',
    value: '84',
    subtitle: 'Needs follow-up',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
  },
  {
    title: 'Inactive Accounts',
    value: '42',
    subtitle: 'No login this month',
    iconBg: 'rgba(255, 126, 147, 0.1)',
    iconColor: '#ff7e93',
  },
];

export const ParentsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    relationshipFilter,
    setRelationshipFilter,
    currentPage,
    setCurrentPage,
    selectedParents,
    handleSelectAll,
    handleSelectParent,
    handleSort,
    sortKey,
    sortDirection,
    parents,
    totalCount,
    totalPages,
    rangeStart,
    rangeEnd,
    resetFilters,
    hasActiveFilters,
  } = useParents();

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader
        title="Parents"
        subtitle="Manage parent and guardian portal access"
        actionButton={{ label: 'Add Parent', onClick: () => console.log('add parent') }}
      />
      <MetricsGrid metrics={PARENTS_METRICS} columns={4} />
      <ParentsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        relationshipFilter={relationshipFilter}
        setRelationshipFilter={setRelationshipFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      <ParentsTable
        parents={parents}
        selectedParents={selectedParents}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSelectAll={handleSelectAll}
        onSelectParent={handleSelectParent}
        onSort={handleSort}
      />
      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={totalCount}
        page={currentPage}
        totalPages={totalPages}
        itemLabel="parents"
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
