import React, { useState } from 'react';
import styles from './students.module.css';
import { useStudents } from './useStudents';
import { StudentsHeader } from './StudentsHeader';
import { StudentsMetrics } from './StudentsMetrics';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { StudentDetailPanel } from './StudentDetailPanel';

export const StudentsView: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedStudents,
    handleSelectAll,
    handleSelectStudent,
    handleSort,
    getSortIcon,
    sortedStudents,
    totalCount
  } = useStudents();

  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<any | null>(null);

  return (
    <div className={styles.container}>
      <StudentsHeader />
      <StudentsMetrics />
      <StudentsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <StudentsTable 
        students={sortedStudents}
        totalCount={totalCount}
        selectedStudents={selectedStudents}
        onSelectAll={handleSelectAll}
        onSelectStudent={handleSelectStudent}
        onSort={handleSort}
        getSortIcon={getSortIcon}
        onViewDetails={setSelectedStudentForDetails}
      />

      {selectedStudentForDetails && (
        <StudentDetailPanel 
          student={selectedStudentForDetails} 
          onClose={() => setSelectedStudentForDetails(null)} 
        />
      )}
    </div>
  );
};
