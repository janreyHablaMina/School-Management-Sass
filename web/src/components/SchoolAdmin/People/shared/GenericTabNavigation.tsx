import React from 'react';
import styles from './profileShared.module.css';

interface GenericTabNavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const GenericTabNavigation: React.FC<GenericTabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
