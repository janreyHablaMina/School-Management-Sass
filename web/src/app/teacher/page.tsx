'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { DashboardView } from '@/components/Teacher';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder';
import { teacherMenuGroups } from '@/lib/constants/navigation';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import { useWorkspaceScroll } from '@/hooks/useWorkspaceScroll';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isScrolled = useWorkspaceScroll(workspaceRef);
  const { teacher, aiCredits } = teacherPortalMock;

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
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
        {activeTab === 'Dashboard' ? (
          <DashboardView />
        ) : (
          <ModulePlaceholder title={activeTab} />
        )}
      </section>
    </div>
  );
}
