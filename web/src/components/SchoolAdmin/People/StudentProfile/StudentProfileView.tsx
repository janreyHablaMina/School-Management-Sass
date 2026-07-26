import React, { useState } from 'react';
import styles from './studentProfile.module.css';
import { Student } from './components/types';
import { ProfileHeader } from './components/ProfileHeader';
import { TabNavigation } from './components/TabNavigation';
import { OverviewTab } from './components/OverviewTab';
import { IdentificationCard } from './components/IdentificationCard';
import { AcademicTab } from './components/AcademicTab';

interface StudentProfileViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'ID', 'Academic', 'Attendance', 'Assignments', 'Grades', 'Documents', 'Parent / Guardian', 'History'];

  return (
    <div className={styles.container}>
      <ProfileHeader onBack={onBack} student={student} />
      
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'Overview' && <OverviewTab student={student} />}
      {activeTab === 'ID' && <IdentificationCard student={student} />}
      {activeTab === 'Academic' && <AcademicTab />}
    </div>
  );
};
