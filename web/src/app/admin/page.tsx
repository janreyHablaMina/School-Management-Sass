'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { SchoolDetailView } from '@/components/SchoolDetailView';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { DashboardView } from '@/components/Dashboard/DashboardView';
import { SchoolsView } from '@/components/Schools/SchoolsView';
import { AddSchoolView } from '@/components/Schools/AddSchoolView';
import { SubscriptionsView } from '@/components/Subscriptions/SubscriptionsView';
import { AddSubscriptionView } from '@/components/Subscriptions/AddSubscriptionView';
import { ChalkFilter } from '@/components/ChalkCharts';
import { School } from '@/types/school';
import { schoolsData } from '@/lib/data/schools';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [detailTab, setDetailTab] = useState('Overview');
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
    setSelectedSchool(null);
  };

  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <DashboardView
          onTabChange={handleSetActiveTab}
          onSelectSchool={setSelectedSchool}
        />
      );
    }
    
    if (activeTab === 'Schools') {
      if (selectedSchool) {
        return (
          <SchoolDetailView
            school={selectedSchool}
            onBack={() => setSelectedSchool(null)}
            detailTab={detailTab}
            setDetailTab={setDetailTab}
          />
        );
      }
      return <SchoolsView 
        onSelectSchool={setSelectedSchool} 
        onAddSchool={() => setActiveTab('AddSchool')} 
      />;
    }

    if (activeTab === 'AddSchool') {
      return (
        <AddSchoolView 
          onCancel={() => setActiveTab('Schools')}
          onSave={() => setActiveTab('Schools')}
        />
      );
    }

    if (activeTab === 'Subscriptions') {
      return <SubscriptionsView 
        onAddSubscription={() => setActiveTab('AddSubscription')}
        onSelectSchool={(schoolName) => {
          const school = schoolsData.find(s => s.name === schoolName);
          if (school) {
            setActiveTab('Schools');
            setSelectedSchool(school);
            setDetailTab('Subscription');
          } else {
            setActiveTab('Schools');
            setSelectedSchool(schoolsData[0]);
            setDetailTab('Subscription');
          }
        }} 
      />;
    }

    if (activeTab === 'AddSubscription') {
      return (
        <AddSubscriptionView 
          onCancel={() => setActiveTab('Subscriptions')}
          onSave={() => setActiveTab('Subscriptions')}
        />
      );
    }

    return (
      <div style={{
        border: '2.2px solid rgba(240, 239, 237, 0.45)',
        borderRadius: '12px 14px 10px 13px / 14px 10px 13px 10px',
        padding: '2.5rem',
        background: 'rgba(10, 25, 17, 0.2)',
        transform: 'rotate(-0.5deg)',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2.4rem', color: '#f5c842', margin: 0 }}>
          🏫 {activeTab} Control Board
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(240, 239, 237, 0.65)', maxWidth: '500px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
          This section provides SASS platform-wide configurations, ledgers, and management interfaces for your school portal system. Integration with the database console is currently in progress.
        </p>
        <button
          onClick={() => handleSetActiveTab('Dashboard')}
          className="chalk-btn"
          style={{ marginTop: '1.5rem', fontSize: '1.25rem' }}
        >
          ← Back to Main Dashboard
        </button>
      </div>
    );
  };

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />
      <Sidebar activeTab={activeTab} onTabChange={handleSetActiveTab} />
      
      <section ref={workspaceRef} className={styles.mainWorkspace}>
        <TopBar
          activeTab={activeTab}
          selectedSchool={selectedSchool}
          isScrolled={isScrolled}
          onSchoolsClick={() => setSelectedSchool(null)}
        />
        {renderContent()}
      </section>
    </div>
  );
}
