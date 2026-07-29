import React, { useState } from 'react';
import styles from './studentProfile.module.css';
import { Student } from './shared/types';
import { ProfileHeader } from './layout/ProfileHeader';
import { TabNavigation } from './layout/TabNavigation';
import { OverviewTab } from './tabs/Overview/OverviewTab';
import { IdentificationCard } from './tabs/ID/IdentificationCard';
import { AcademicTab } from './tabs/Academic/AcademicTab';
import { AttendanceTab } from './tabs/Attendance/AttendanceTab';
import { AssessmentsTab } from './tabs/Assessments/AssessmentsTab';
import { GradesTab } from './tabs/Grades/GradesTab';
import { DocumentsTab } from './tabs/Documents/DocumentsTab';
import { ParentGuardianTab } from './tabs/ParentGuardian/ParentGuardianTab';

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
      {activeTab === 'Parent / Guardian' && <ParentGuardianTab />}
    </div>
  );
};
