'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
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
import { SchoolAdminPlaceholder } from '@/components/SchoolAdmin/shared/SchoolAdminPlaceholder';

const StudentsView = dynamic(() =>
  import('@/components/SchoolAdmin/People/StudentsView').then((mod) => mod.StudentsView),
);
const TeachersView = dynamic(() =>
  import('@/components/SchoolAdmin/People/Teachers/TeachersView').then((mod) => mod.TeachersView),
);
const ParentsView = dynamic(() =>
  import('@/components/SchoolAdmin/People/Parents').then((mod) => mod.ParentsView),
);
const ClassesSectionsView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/ClassesSections').then(
    (mod) => mod.ClassesSectionsView,
  ),
);
const SubjectsView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Subjects').then((mod) => mod.SubjectsView),
);
const AttendanceView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Attendance').then((mod) => mod.AttendanceView),
);
const AssignmentsView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Assignments').then((mod) => mod.AssignmentsView),
);
const LessonsView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Lessons').then((mod) => mod.LessonsView),
);
const QuizzesView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Quizzes').then((mod) => mod.QuizzesView),
);
const GradesView = dynamic(() =>
  import('@/components/SchoolAdmin/Academics/Grades').then((mod) => mod.GradesView),
);
const AnnouncementsView = dynamic(() =>
  import('@/components/SchoolAdmin/Communications/Announcements').then(
    (mod) => mod.AnnouncementsView,
  ),
);
const AdminCalendarView = dynamic(() =>
  import('@/components/SchoolAdmin/Communications/Calendar/CalendarView').then(
    (mod) => mod.CalendarView,
  ),
);
const SchoolAdminReportsView = dynamic(() =>
  import('@/components/SchoolAdmin/Analytics/Reports/ReportsView').then(
    (mod) => mod.ReportsView,
  ),
);
const SchoolAdminAiAssistantView = dynamic(() =>
  import('@/components/SchoolAdmin/Analytics/AiAssistant/AiAssistantView').then(
    (mod) => mod.AiAssistantView,
  ),
);
const SchoolAdminSettingsView = dynamic(() =>
  import('@/components/SchoolAdmin/System/Settings/SettingsView').then(
    (mod) => mod.SettingsView,
  ),
);

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
      case 'Parents':
        return <ParentsView />;
      case 'Classes & Sections':
        return <ClassesSectionsView />;
      case 'Subjects':
        return <SubjectsView />;
      case 'Attendance':
        return <AttendanceView />;
      case 'Assignments':
        return <AssignmentsView />;
      case 'Lessons':
        return <LessonsView />;
      case 'Quizzes':
        return <QuizzesView />;
      case 'Grades':
        return <GradesView />;
      case 'Announcements':
        return <AnnouncementsView />;
      case 'Calendar':
        return <AdminCalendarView />;
      case 'Reports':
        return <SchoolAdminReportsView />;
      case 'PieYah Assistant':
        return <SchoolAdminAiAssistantView />;
      case 'Settings':
        return <SchoolAdminSettingsView />;
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
