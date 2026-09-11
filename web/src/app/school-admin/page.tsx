'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { schoolAdminMenuGroups } from '@/lib/constants/navigation';
import { useWorkspaceScroll } from '@/hooks/useWorkspaceScroll';
import { useGreeting } from '@/lib/utils/greeting';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

// Import views
import { DashboardView } from '@/components/SchoolAdmin/Dashboard/DashboardView';
import { StudentsView } from '@/components/SchoolAdmin/People/StudentsView';
import { TeachersView } from '@/components/SchoolAdmin/People/Teachers/TeachersView';
import { SchoolAdminPlaceholder } from '@/components/SchoolAdmin/shared/SchoolAdminPlaceholder';

export default function SchoolAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isScrolled = useWorkspaceScroll(workspaceRef);
  const greeting = useGreeting();
  const { totalAllocated } = schoolAdminMockData.aiCredits;

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Students':
        return <StudentsView />;
      case 'Teachers':
        return <TeachersView />;
      default:
        // Generic fallback for unimplemented tabs
        return <SchoolAdminPlaceholder title={activeTab} />;
    }
  };

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleSetActiveTab} 
        menuGroups={schoolAdminMenuGroups}
        roleTitle="School Admin"
        showCredits={false}
      />
      
      <section ref={workspaceRef} className={styles.mainWorkspace}>
        <TopBar
          activeTab={activeTab}
          selectedSchool={null}
          isScrolled={isScrolled}
          onSchoolsClick={() => {}}
          userName="Sophia Mendoza"
          userInitials="SM"
          welcomeText={`${greeting}, Sophia!`}
          notificationCount={8}
          searchPlaceholder="Search students, teachers, sections..."
          hideTitle
          showMessages
          aiCredits={totalAllocated}
        />
        {renderContent()}
      </section>
    </div>
  );
}
