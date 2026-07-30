import React, { useState } from 'react';
import styles from './TeacherProfile/teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';
import { TeacherProfileHeader } from './TeacherProfile/layout/TeacherProfileHeader';
import { TeacherTabNavigation } from './TeacherProfile/layout/TeacherTabNavigation';
import { TeacherOverviewTab } from './TeacherProfile/tabs/TeacherOverviewTab';

interface TeacherProfileViewProps {
  teacher: Teacher;
  onBack: () => void;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ teacher, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Classes', 'Schedule', 'Subjects', 'Attendance', 'Performance', 'Documents', 'History'];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink} onClick={onBack}>Teachers</span>
            <span>&gt;</span>
            <span className={styles.breadcrumbActive}>Teacher Profile</span>
          </div>
          <h1 className={styles.pageTitle}>Teacher Profile</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.backBtn} onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Teachers
          </button>
          <button className={styles.editBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            Edit Teacher
          </button>
          <button className={styles.moreBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>
      
      <TeacherProfileHeader teacher={teacher} />
      
      <TeacherTabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'Overview' && <TeacherOverviewTab teacher={teacher} />}
      
      {activeTab !== 'Overview' && (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240, 239, 237, 0.5)', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed rgba(240,239,237,0.1)' }}>
          {activeTab} tab content will be implemented here.
        </div>
      )}
    </div>
  );
};
