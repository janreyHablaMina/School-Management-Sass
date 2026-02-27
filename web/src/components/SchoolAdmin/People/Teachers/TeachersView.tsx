import React, { useState } from 'react';
import { useTeachers, type SortKey } from './useTeachers';
import { SchoolAdminDirectoryPage } from '../../shared/SchoolAdminDirectoryPage';
import { TEACHERS_METRICS } from '@/lib/mock/teachers.mock';
import { TeachersFilters } from './TeachersFilters';
import { TeachersTable } from './TeachersTable';
import { TeacherProfileView } from './TeacherProfileView';
import { EmptyState, PaginationBar, ConfirmActionModal, TeacherToast } from '@/components/ui/shared';
import { MessageModal } from '@/components/ui/MessageModal';

export const TeachersView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    selectedTeachers,
    handleSelectAll,
    handleSelectTeacher,
    handleSort,
    sortKey,
    sortDirection,
    sortedTeachers,
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    rangeStart,
    rangeEnd,
    toast,
    dismissToast,
    showToast
  } = useTeachers();

  const [selectedTeacherForDetails, setSelectedTeacherForDetails] = useState<any | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [teacherToMessage, setTeacherToMessage] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    id?: string;
    ids?: string[];
    title: string;
    name?: string;
    count?: number;
    actionType: 'archive' | 'delete' | 'deactivate';
    onConfirm: () => void;
  } | null>(null);


  if (selectedTeacherForDetails) {
    return <TeacherProfileView teacher={selectedTeacherForDetails} onBack={() => setSelectedTeacherForDetails(null)} />;
  }

  return (
    <SchoolAdminDirectoryPage
      title="Teachers"
      subtitle="Management panel for Teachers"
      actionButton={{ label: "Add Teacher", onClick: () => console.log('add teacher') }}
      secondaryButton={{ 
        label: "Export", 
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
        onClick: () => console.log('export') 
      }}
      metrics={TEACHERS_METRICS}
      metricColumns={4}
      pagination={{
        rangeStart,
        rangeEnd,
        total: totalCount,
        page: currentPage,
        totalPages,
        itemLabel: 'teachers',
        onPageChange: setCurrentPage,
      }}
    >
      <TeachersFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {sortedTeachers.length === 0 ? (
        <EmptyState
          title="No teachers found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <TeachersTable 
          teachers={sortedTeachers}
          totalCount={totalCount}
          selectedTeachers={selectedTeachers}
          sortKey={sortKey as SortKey}
          sortDirection={sortDirection}
          onSelectAll={handleSelectAll}
          onSelectTeacher={handleSelectTeacher}
          onSort={handleSort}
          onViewDetails={setSelectedTeacherForDetails}
          onMessage={(ids) => {
            if (ids.length === 1) setTeacherToMessage(ids[0]);
            else setTeacherToMessage(null);
            setIsMessageModalOpen(true);
          }}
          onArchive={(ids) => {
            setActionModal({
              ids,
              title: ids.length === 1 ? 'Archive Teacher' : 'Archive Teachers',
              count: ids.length,
              actionType: 'archive',
              onConfirm: () => {
                if (ids.length === 1) {
                  const teacher = sortedTeachers.find(t => t.id === ids[0]);
                  showToast({ title: `${teacher?.name || 'Teacher'} archived` });
                } else {
                  showToast({ title: `${ids.length} teachers archived` });
                }
                setActionModal(null);
              }
            });
          }}
        />
      )}

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientCount={teacherToMessage ? 1 : selectedTeachers.length}
        hideTargets={true}
        onSend={(data) => {
          console.log('Sending message:', data, 'to', teacherToMessage ? [teacherToMessage] : selectedTeachers);
          setIsMessageModalOpen(false);
        }}
      />

      {actionModal && (
        <ConfirmActionModal
          title={actionModal.title}
          itemLabel={actionModal.count === 1 ? 'teacher' : 'teachers'}
          count={actionModal.count || 1}
          actionType={actionModal.actionType}
          onCancel={() => setActionModal(null)}
          onConfirm={actionModal.onConfirm}
        />
      )}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </SchoolAdminDirectoryPage>
  );
};
