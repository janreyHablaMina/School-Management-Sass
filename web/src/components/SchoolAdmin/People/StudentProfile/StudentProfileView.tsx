import React, { useState } from 'react';
import styles from './studentProfile.module.css';
import { Student } from './components/types';
import { ProfileHeader } from './components/ProfileHeader';
import { TabNavigation } from './components/TabNavigation';
import { OverviewTab } from './components/OverviewTab';
import { IdentificationCard } from './components/IdentificationCard';
import { AcademicTab } from './components/AcademicTab';
import { AttendanceTab } from './components/AttendanceTab';
import { AssessmentsTab } from './components/AssessmentsTab';
import { GradesTab } from './components/GradesTab';
import { DocumentsTab } from './components/DocumentsTab';

interface StudentProfileViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'ID', 'Academic', 'Attendance', 'Assessments', 'Grades', 'Documents', 'Parent / Guardian', 'History'];

  return (
    <div className={styles.container}>
      <ProfileHeader onBack={onBack} student={student} />
      
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'Overview' && <OverviewTab student={student} />}
      {activeTab === 'ID' && <IdentificationCard student={student} />}
      {activeTab === 'Academic' && <AcademicTab />}
      {activeTab === 'Attendance' && <AttendanceTab />}
      {activeTab === 'Assessments' && <AssessmentsTab />}
      {activeTab === 'Grades' && <GradesTab />}
      {activeTab === 'Documents' && <DocumentsTab />}
    </div>
  );
};
