'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Sidebar } from '@/components/AdminLayout/Sidebar';
import { TopBar } from '@/components/AdminLayout/TopBar';
import { ChalkFilter } from '@/components/ChalkCharts';
import { schoolAdminMenuGroups } from '@/lib/constants/navigation';

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
    // For now, render a generic placeholder for all tabs
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
          🏫 {activeTab}
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(240, 239, 237, 0.65)', maxWidth: '500px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
          This section is currently under construction.
        </p>
      </div>
    );
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
