import React, { useState } from 'react';
import { PaginationBar } from '@/components/ui/shared';
import { MetricsGrid, type Metric } from '../../shared/MetricsGrid';
import { PageHeader } from '../../shared/PageHeader';
import layoutStyles from '../../shared/layout.module.css';
import { MessageModal, type MessageData } from '@/components/ui/MessageModal';
import { ParentsFilters } from './ParentsFilters';
import { ConfirmActionModal, Toast, EmptyState } from '@/components/ui/shared';
import { ParentsTable } from './ParentsTable';
import { ParentProfileView } from './ParentProfileView';
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
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageRecipients, setMessageRecipients] = useState<string[]>([]);
  const [actionModal, setActionModal] = useState<{
    id?: string;
    ids?: string[];
    title: string;
    name?: string;
    count?: number;
    actionType: 'archive' | 'delete' | 'deactivate';
    onConfirm: () => void;
  } | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    relationshipFilter,
    setRelationshipFilter,
    gradeFilter,
    setGradeFilter,
    sectionFilter,
    setSectionFilter,
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
    toast,
    showToast,
    dismissToast,
  } = useParents();

  if (selectedParentId) {
    const parent = parents.find((p) => p.id === selectedParentId) || null;
    if (parent) {
      return (
        <ParentProfileView 
          parent={parent} 
          onBack={() => setSelectedParentId(null)} 
        />
      );
    }
  }

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
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />
      {parents.length === 0 ? (
        <EmptyState
          title="No parents found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <ParentsTable
          parents={parents}
          selectedParents={selectedParents}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSelectAll={handleSelectAll}
          onSelectParent={handleSelectParent}
          onSort={handleSort}
          onViewDetails={(parent) => setSelectedParentId(parent.id)}
          onMessage={(ids) => {
            setMessageRecipients(ids);
            setIsMessageModalOpen(true);
          }}
          onEditParent={(parent) => alert(`Edit parent functionality not implemented yet for ${parent.name}.`)}
          onArchive={(ids) => {
            setActionModal({
              ids,
              title: ids.length === 1 ? 'Archive Parent' : 'Archive Parents',
              count: ids.length,
              actionType: 'archive',
              onConfirm: () => {
                if (ids.length === 1) {
                  const parent = parents.find(p => p.id === ids[0]);
                  showToast({ title: `${parent?.name || 'Parent'} archived` });
                } else {
                  showToast({ title: `${ids.length} parents archived` });
                }
                setActionModal(null);
              }
            });
          }}
          onDeactivate={(ids) => {
            setActionModal({
              ids,
              title: ids.length === 1 ? 'Deactivate Account' : 'Deactivate Accounts',
              count: ids.length,
              actionType: 'delete',
              onConfirm: () => {
                if (ids.length === 1) {
                  const parent = parents.find(p => p.id === ids[0]);
                  showToast({ title: `${parent?.name || 'Account'} deactivated` });
                } else {
                  showToast({ title: `${ids.length} accounts deactivated` });
                }
                setActionModal(null);
              }
            });
          }}
        />
      )}
      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={totalCount}
        page={currentPage}
        totalPages={totalPages}
        itemLabel="parents"
        onPageChange={setCurrentPage}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientCount={messageRecipients.length}
        hideTargets
        onSend={(data: MessageData) => {
          console.log('Sending message to parents:', messageRecipients, data);
          setIsMessageModalOpen(false);
        }}
      />

      {actionModal && (
        <ConfirmActionModal
          title={actionModal.title}
          itemLabel={actionModal.count === 1 ? 'account' : 'accounts'}
          count={actionModal.count || 1}
          actionType={actionModal.actionType}
          onCancel={() => setActionModal(null)}
          onConfirm={actionModal.onConfirm}
        />
      )}

      {toast ? (
        <Toast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </div>
  );
};
