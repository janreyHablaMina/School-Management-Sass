'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import {
  AiAssistantView,
  AnnouncementsView,
  AssignmentsView,
  AttendanceView,
  CalendarView,
  DashboardView,
  ExamsView,
  GradesView,
  LessonsView,
  MyClassesView,
  QuizzesView,
  SettingsView,
  StudentsView,
} from '@/components/Teacher';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder';
import { teacherMenuGroups } from '@/lib/constants/navigation';
import { teacherPortalMock } from '@/lib/mock/teacherPortal.mock';
import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { TeacherProfile } from '@/types/teacherPortal';
import { useWorkspaceScroll } from '@/hooks/useWorkspaceScroll';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [navRequest, setNavRequest] = useState<TeacherNavRequest | null>(null);
  const [teacher, setTeacher] = useState<TeacherProfile>(teacherPortalMock.teacher);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isScrolled = useWorkspaceScroll(workspaceRef);
  const { aiCredits } = teacherPortalMock;

  const navigateTo = (request: TeacherNavRequest | string) => {
    if (typeof request === 'string') {
      setActiveTab(request);
      setNavRequest(null);
      return;
    }
    setActiveTab(request.tab);
    setNavRequest(request);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setNavRequest(null);
  };

  const classFocus = navRequest?.classFocus ?? null;
  const studentFocus = navRequest?.studentFocus ?? null;

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView onNavigate={navigateTo} />;
      case 'My Classes':
        return <MyClassesView onNavigate={navigateTo} />;
      case 'Students':
        return <StudentsView classFocus={classFocus} onNavigate={navigateTo} />;
      case 'Lessons':
        return <LessonsView classFocus={classFocus} onNavigate={navigateTo} />;
      case 'Assignments':
        return <AssignmentsView classFocus={classFocus} />;
      case 'Quizzes':
        return <QuizzesView classFocus={classFocus} />;
      case 'Exams':
        return <ExamsView classFocus={classFocus} />;
      case 'Attendance':
        return <AttendanceView classFocus={classFocus} />;
      case 'Grades':
        return <GradesView classFocus={classFocus} studentFocus={studentFocus} />;
      case 'Announcements':
        return <AnnouncementsView />;
      case 'Calendar':
        return <CalendarView />;
      case 'AI Assistant':
        return (
          <AiAssistantView
            classFocus={classFocus}
            initialToolId={navRequest?.aiToolId}
            initialPrompt={navRequest?.aiPrompt}
            onNavigate={navigateTo}
          />
        );
      case 'Settings':
        return <SettingsView onProfileSave={setTeacher} />;
      default:
        return <ModulePlaceholder title={activeTab} />;
    }
  };

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        menuGroups={teacherMenuGroups}
        roleTitle="School Portal + LMS"
        brandName="Eskwelahan +"
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
          searchPlaceholder="Search students, classes, exams..."
          hideTitle
          showMessages
          aiCredits={aiCredits}
        />
        {renderContent()}
      </section>

      {/* Floating AI Button */}
      {activeTab !== 'AI Assistant' && (
        <button 
          className={styles.floatingAiBtn} 
          onClick={() => handleTabChange('AI Assistant')}
          title="Ask PieYah"
        >
          <img src="/ai-teacher.jpg" alt="AI Teacher" />
        </button>
      )}
    </div>
  );
}
