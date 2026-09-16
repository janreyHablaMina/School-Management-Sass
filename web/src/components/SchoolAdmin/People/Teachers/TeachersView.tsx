import React, { useState } from 'react';
import { useTeachers, type SortKey } from './useTeachers';
import { PageHeader } from '../../shared/PageHeader';
import { MetricsGrid } from '../../shared/MetricsGrid';
import { TEACHERS_METRICS } from '@/lib/mock/teachers.mock';
import layoutStyles from '../../shared/layout.module.css';
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
    toast,
    dismissToast,
    showToast
  } = useTeachers();

  const [selectedTeacherForDetails, setSelectedTeacherForDetails] = useState<any | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [teacherToMessage, setTeacherToMessage] = useState<string | null>(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [teachersToArchive, setTeachersToArchive] = useState<string[]>([]);

  // Pagination logic mock
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  if (selectedTeacherForDetails) {
    return <TeacherProfileView teacher={selectedTeacherForDetails} onBack={() => setSelectedTeacherForDetails(null)} />;
  }

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader 
        title="Teachers" 
        subtitle="Management panel for Teachers" 
        actionButton={{ label: "Add Teacher", onClick: () => console.log('add teacher') }} 
        secondaryButton={{ 
          label: "Export", 
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
          onClick: () => console.log('export') 
        }}
      />
      <MetricsGrid metrics={TEACHERS_METRICS} columns={4} />
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
            setTeachersToArchive(ids);
            setIsArchiveModalOpen(true);
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

      <PaginationBar
        rangeStart={sortedTeachers.length > 0 ? 1 : 0}
        rangeEnd={sortedTeachers.length}
        total={totalCount}
        page={currentPage}
        totalPages={totalPages}
        itemLabel="teachers"
        onPageChange={setCurrentPage}
      />

      {isArchiveModalOpen && (
        <ConfirmActionModal
          title={teachersToArchive.length === 1 ? "Archive Teacher" : "Archive Teachers"}
          itemLabel="teacher"
          count={teachersToArchive.length}
          actionType="archive"
          onCancel={() => setIsArchiveModalOpen(false)}
          onConfirm={() => {
            console.log('Archiving teachers:', teachersToArchive);
            if (teachersToArchive.length === 1) {
              const teacher = sortedTeachers.find(t => t.id === teachersToArchive[0]);
              showToast({ title: `${teacher?.name || 'Teacher'} archived` });
            } else {
              showToast({ title: `${teachersToArchive.length} teachers archived` });
            }
            setIsArchiveModalOpen(false);
            setTeachersToArchive([]);
          }}
        />
      )}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </div>
  );
};
