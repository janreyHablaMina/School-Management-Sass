import React, { useState } from 'react';
import styles from './students.module.css';
import { useStudents } from './useStudents';
import { PageHeader } from '../shared/PageHeader';
import { MetricsGrid, Metric } from '../shared/MetricsGrid';
import layoutStyles from '../shared/layout.module.css';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { StudentProfileView } from './StudentProfile/StudentProfileView';

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

  if (selectedStudentForDetails) {
    return <StudentProfileView student={selectedStudentForDetails} onBack={() => setSelectedStudentForDetails(null)} />;
  }

  const STUDENTS_METRICS: Metric[] = [
    { title: 'Total Students', value: '1,245', subtitle: '8.6% vs last month', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
    { title: 'Male Students', value: '642', subtitle: '51.6% of total', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
    { title: 'Female Students', value: '603', subtitle: '48.4% of total', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93' },
    { title: 'New Enrollments', value: '56', subtitle: '12.0% vs last month', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b' },
    { title: 'Promoted Students', value: '1,180', subtitle: '95.7% of total', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
    { title: 'With Incomplete Info', value: '18', subtitle: 'View list', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
  ];

  return (
    <div className={layoutStyles.studentsContainer}>
      <PageHeader 
        title="Students" 
        subtitle="Management panel for Students" 
        actionButton={{ label: "Add Student", onClick: () => console.log('add') }} 
      />
      <MetricsGrid metrics={STUDENTS_METRICS} columns={6} />
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
    </div>
  );
};
