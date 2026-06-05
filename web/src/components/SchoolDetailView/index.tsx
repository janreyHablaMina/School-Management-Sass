import React from 'react';
import styles from './SchoolDetailView.module.css';

// Import Data
import { getSchoolDetails, mockStudents, mockTeachers, mockSections, mockAICreditHistory } from '@/lib/data/mockData';

// Import Tabs
import { OverviewTab } from './tabs/OverviewTab';
import { SubscriptionTab } from './tabs/SubscriptionTab';
import { StudentsTab } from './tabs/StudentsTab';
import { TeachersTab } from './tabs/TeachersTab';
import { SectionsTab } from './tabs/SectionsTab';
import { AICreditsTab } from './tabs/AICreditsTab';
import { ReportsTab } from './tabs/ReportsTab';
import { SettingsTab } from './tabs/SettingsTab';

export const SchoolDetailView = ({
  school,
  onBack,
  detailTab,
  setDetailTab,
}: {
  school: any;
  onBack: () => void;
  detailTab: string;
  setDetailTab: (tab: string) => void;
}) => {
  const details = getSchoolDetails(school.name);
  const totalStudents = school.students || 512;
  const totalTeachers = school.teachers || 45;
  const totalSections = details.sections || 18;

  const subTabs = [
    'Overview',
    'Subscription',
    'Students',
    'Teachers',
    'Sections',
    'AI Credits',
    'Reports',
    'Settings',
  ];

  return (
    <div>
      {/* Detail Header Panel */}
      <section className={styles.detailHeader}>
        <div className={styles.detailHeaderLeft}>
          <div className={styles.emblemWrapper}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ filter: 'url(#chalk-wobble)' }}>
              <path
                d="M 50 10 C 70 12, 85 10, 85 35 C 85 65, 50 90, 50 90 C 50 90, 15 65, 15 35 C 15 10, 30 12, 50 10 Z"
                fill="rgba(245, 200, 66, 0.1)"
                stroke="#f5c842"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 22 35 L 78 35 M 50 10 L 50 90"
                stroke="rgba(240, 239, 237, 0.4)"
                strokeWidth="2"
                strokeDasharray="2 3"
              />
              <path
                d="M 40 48 Q 50 44 60 48 M 40 55 Q 50 51 60 55 M 50 48 L 50 58"
                fill="none"
                stroke="#ff8a8a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className={styles.schoolTitleRow}>
              <h2 className={styles.schoolMainName}>{school.name}</h2>
              <span className={`status-badge active`}>{school.status}</span>
            </div>
            <div className={styles.schoolSubInfo}>
              <span className={styles.schoolSubInfoItem}>📍 {school.location}</span>
              <span className={styles.schoolSubInfoItem}>🆔 ID: {details.id}</span>
              <span className={styles.schoolSubInfoItem}>📅 Joined: {school.joined}</span>
            </div>
          </div>
        </div>

        {/* Stats Tiles Grid */}
        <div className={styles.detailStatsGrid}>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalStudents}</span>
            <span className={styles.detailStatsLabel}>Students</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalTeachers}</span>
            <span className={styles.detailStatsLabel}>Teachers</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalSections}</span>
            <span className={styles.detailStatsLabel}>Sections</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{school.revenue || '₱2,999'}</span>
            <span className={styles.detailStatsLabel}>Monthly Rev</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal} style={{ fontSize: '1.25rem', color: '#84a9ff' }}>
              {school.plan || 'School Plan'}
            </span>
            <span className={styles.detailStatsLabel}>Plan</span>
          </div>
        </div>
      </section>

      {/* Sub Tabs Bar */}
      <nav className={styles.detailTabsBar}>
        {subTabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.detailTabButton} ${detailTab === tab ? styles.detailTabButtonActive : ''}`}
            onClick={() => setDetailTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab Contents */}
      {detailTab === 'Overview' && (
        <OverviewTab 
          school={school} 
          details={details} 
          totalStudents={totalStudents} 
          totalTeachers={totalTeachers} 
          setDetailTab={setDetailTab} 
        />
      )}
      
      {detailTab === 'Subscription' && (
        <SubscriptionTab 
          school={school} 
          details={details} 
        />
      )}

      {detailTab === 'Students' && (
        <StudentsTab 
          mockStudents={mockStudents} 
        />
      )}

      {detailTab === 'Teachers' && (
        <TeachersTab 
          mockTeachers={mockTeachers} 
        />
      )}

      {detailTab === 'Sections' && (
        <SectionsTab 
          mockSections={mockSections} 
        />
      )}

      {detailTab === 'AI Credits' && (
        <AICreditsTab 
          mockAICreditHistory={mockAICreditHistory} 
        />
      )}

      {detailTab === 'Reports' && (
        <ReportsTab />
      )}

      {detailTab === 'Settings' && (
        <SettingsTab school={school} details={details} />
      )}

    </div>
  );
};
