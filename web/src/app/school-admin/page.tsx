'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { schoolAdminMenuGroups } from '@/lib/constants/navigation';

// Import views
import { DashboardView } from '@/components/SchoolAdmin/Dashboard/DashboardView';
import { StudentsView } from '@/components/SchoolAdmin/People/StudentsView';
import { TeachersView } from '@/components/SchoolAdmin/People/Teachers/TeachersView';
import { SchoolAdminPlaceholder } from '@/components/SchoolAdmin/shared/SchoolAdminPlaceholder';

export default function SchoolAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const workspace = workspaceRef.current;
      const scrollTop = workspace ? workspace.scrollTop : 0;
      const scrollY = window.scrollY;
      setIsScrolled(scrollTop > 10 || scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

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
        />
        {renderContent()}
      </section>
    </div>
  );
}
