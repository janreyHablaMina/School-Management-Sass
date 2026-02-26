'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { studentMenuGroups } from '@/lib/constants/navigation';
import { useWorkspaceScroll } from '@/hooks/useWorkspaceScroll';
import { useGreeting } from '@/lib/utils/greeting';

// Temporary placeholder for settings
const StudentPlaceholder = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem', color: '#f0efed' }}>
    <h1>{title}</h1>
    <p>This module is currently under construction.</p>
  </div>
);

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isScrolled = useWorkspaceScroll(workspaceRef);
  const greeting = useGreeting();

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
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
