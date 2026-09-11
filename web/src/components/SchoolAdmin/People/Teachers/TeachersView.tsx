import React, { useState } from 'react';
import styles from '../students.module.css';
import { useTeachers } from './useTeachers';
import { PageHeader } from '../../shared/PageHeader';
import { MetricsGrid } from '../../shared/MetricsGrid';
import { TEACHERS_METRICS } from '@/lib/mock/teachers.mock';
import layoutStyles from '../../shared/layout.module.css';
import { TeachersFilters } from './TeachersFilters';
import { TeachersTable } from './TeachersTable';
import { TeacherProfileView } from './TeacherProfileView';

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
    getSortIcon,
    sortedTeachers,
    totalCount
  } = useTeachers();

  const [selectedTeacherForDetails, setSelectedTeacherForDetails] = useState<any | null>(null);

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
      
      <TeachersTable 
        teachers={sortedTeachers}
        totalCount={totalCount}
        selectedTeachers={selectedTeachers}
        onSelectAll={handleSelectAll}
        onSelectTeacher={handleSelectTeacher}
        onSort={handleSort}
        getSortIcon={getSortIcon}
        onViewDetails={setSelectedTeacherForDetails}
      />
    </div>
  );
};
