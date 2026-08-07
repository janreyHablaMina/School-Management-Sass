'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { teacherMenuGroups } from '@/lib/constants/navigation';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import { DashboardView } from '@/components/Teacher/Dashboard/DashboardView';
import { SchoolAdminPlaceholder } from '@/components/SchoolAdmin/shared/SchoolAdminPlaceholder';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const { teacher, aiCredits } = teacherPortalMock;

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
      default:
        return <SchoolAdminPlaceholder title={activeTab} />;
    }
  };

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleSetActiveTab}
        menuGroups={teacherMenuGroups}
        roleTitle="School Portal + LMS"
        brandName="Teachify"
        brandAccent=""
        showCredits={false}
        profileName={teacher.fullName}
        profileRole={teacher.role}
        profileInitials={teacher.initials}
      />

      <section ref={workspaceRef} className={styles.mainWorkspace}>
        <TopBar
          activeTab={activeTab}
          selectedSchool={null}
          isScrolled={isScrolled}
          onSchoolsClick={() => {}}
          userName={teacher.fullName}
          userInitials={teacher.initials}
          welcomeText={`Welcome back, ${teacher.shortName}!`}
          notificationCount={3}
          searchPlaceholder="Search students, classes, materials..."
          hideTitle
          showMessages
          aiCredits={aiCredits}
        />
        {renderContent()}
      </section>
    </div>
  );
}
