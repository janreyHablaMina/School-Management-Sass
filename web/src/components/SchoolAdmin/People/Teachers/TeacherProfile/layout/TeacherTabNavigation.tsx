import React from 'react';
import styles from '../teacherProfile.module.css';

interface TeacherTabNavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TeacherTabNavigation: React.FC<TeacherTabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
