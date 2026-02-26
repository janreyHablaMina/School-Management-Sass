'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { studentMenuGroups } from '@/lib/constants/navigation';
import { useWorkspaceScroll } from '@/hooks/useWorkspaceScroll';
import { useGreeting } from '@/lib/utils/greeting';

import { StudentDashboardView } from '@/components/Student/Dashboard/StudentDashboardView';
import { StudentSubjectsView } from '@/components/Student/Subjects/StudentSubjectsView';
import { StudentScheduleView } from '@/components/Student/Schedule/StudentScheduleView';
import { StudentAssignmentsView } from '@/components/Student/Assignments/StudentAssignmentsView';

// Temporary placeholder for settings
const StudentPlaceholder = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem', color: '#f0efed' }}>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>{title}</h2>
    <div style={{ 
      background: 'rgba(10, 25, 17, 0.4)', 
      border: '1px solid rgba(240, 239, 237, 0.1)', 
      borderRadius: '12px', 
      padding: '3rem',
      textAlign: 'center',
      color: 'rgba(240, 239, 237, 0.5)'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
      <p style={{ fontSize: '1.1rem' }}>This module is currently under construction.</p>
      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>We're building something awesome here.</p>
    </div>
  </div>
);

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isScrolled = useWorkspaceScroll(workspaceRef);
  const greeting = useGreeting();

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'Dashboard') return <StudentDashboardView />;
    if (activeTab === 'My Subjects') return <StudentSubjectsView />;
    if (activeTab === 'Class Schedule') return <StudentScheduleView />;
    if (activeTab === 'Assignments') return <StudentAssignmentsView />;
    return <StudentPlaceholder title={activeTab} />;
  };

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleSetActiveTab} 
        menuGroups={studentMenuGroups}
        roleTitle="Student Portal"
        showCredits={false}
      />
      
      <section ref={workspaceRef} className={styles.mainWorkspace}>
        <TopBar
          activeTab={activeTab}
          selectedSchool={null}
          isScrolled={isScrolled}
          onSchoolsClick={() => {}}
          userName="Alex Johnson"
          userInitials="AJ"
          welcomeText={`${greeting}, Alex!`}
          notificationCount={3}
          searchPlaceholder="Search subjects, assignments..."
          hideTitle
          showMessages
          aiCredits={0}
        />
        {renderContent()}
      </section>
    </div>
  );
}
