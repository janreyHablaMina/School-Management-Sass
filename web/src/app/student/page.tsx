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
import { StudentQuizzesExamsView } from '@/components/Student/QuizzesExams/StudentQuizzesExamsView';
import { StudentGradesView } from '@/components/Student/Grades/StudentGradesView';
import { StudentAttendanceView } from '@/components/Student/Attendance/StudentAttendanceView';
import { StudentClearanceView } from '@/components/Student/Clearance/StudentClearanceView';
import { StudentClubsView } from '@/components/Student/Clubs/StudentClubsView';
import { StudentClinicView } from '@/components/Student/Clinic/StudentClinicView';
import { StudentGuidanceView } from '@/components/Student/Guidance/StudentGuidanceView';
import { StudentDocumentsView } from '@/components/Student/Documents/StudentDocumentsView';
import { StudentAnnouncementsView } from '@/components/Student/Announcements/StudentAnnouncementsView';
import { StudentTuitionView } from '@/components/Student/Tuition/StudentTuitionView';
import { StudentPaymentHistoryView } from '@/components/Student/PaymentHistory/StudentPaymentHistoryView';
import { StudentDigitalIdView } from '@/components/Student/DigitalId/StudentDigitalIdView';
import { StudentLibraryView } from '@/components/Student/Library/StudentLibraryView';
import { StudentFormsView } from '@/components/Student/Forms/StudentFormsView';
import { StudentMessagesView } from '@/components/Student/Messages/StudentMessagesView';
import { StudentProfileView } from '@/components/Student/Profile/StudentProfileView';
import { StudentSettingsView } from '@/components/Student/Settings/StudentSettingsView';

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
    if (activeTab === 'Quizzes & Exams') return <StudentQuizzesExamsView />;
    if (activeTab === 'Grades (Form 138)') return <StudentGradesView />;
    if (activeTab === 'Attendance') return <StudentAttendanceView />;
    if (activeTab === 'Clearance Status') return <StudentClearanceView />;
    if (activeTab === 'Clubs & Orgs') return <StudentClubsView />;
    if (activeTab === 'Clinic & Health') return <StudentClinicView />;
    if (activeTab === 'Guidance Office') return <StudentGuidanceView />;
    if (activeTab === 'Documents') return <StudentDocumentsView />;
    if (activeTab === 'Announcements') return <StudentAnnouncementsView />;
    if (activeTab === 'Tuition & Fees') return <StudentTuitionView />;
    if (activeTab === 'Payment History') return <StudentPaymentHistoryView />;
    if (activeTab === 'Digital ID & Pass') return <StudentDigitalIdView />;
    if (activeTab === 'Library & E-Books') return <StudentLibraryView />;
    if (activeTab === 'Downloadable Forms') return <StudentFormsView />;
    if (activeTab === 'Messages') return <StudentMessagesView />;
    if (activeTab === 'My Profile') return <StudentProfileView />;
    if (activeTab === 'Settings') return <StudentSettingsView />;
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
