import React, { useState } from 'react';
import styles from '../students.module.css';
import { useTeachers } from './useTeachers';
import { TeachersHeader } from './TeachersHeader';
import { TeachersMetrics } from './TeachersMetrics';
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
    <div className={styles.container}>
      <TeachersHeader />
      <TeachersMetrics />
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
