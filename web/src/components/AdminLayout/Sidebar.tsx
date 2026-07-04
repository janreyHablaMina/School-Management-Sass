'use client';

import React from 'react';
import styles from '@/app/admin/admin.module.css';
import { menuGroups } from '@/lib/constants/navigation';

interface NavItemProps {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const NavLinkItem: React.FC<NavItemProps> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
  >
    <span className={styles.navIcon}>{icon}</span>
    <span>{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => (
  <aside className={styles.sidebar}>
    {/* Logo / Brand */}
    <div className={styles.logoSection}>
      <span className={styles.logoIcon}>🎓</span>
      <div className={styles.logoTextContainer}>
        <span className={styles.logoMainText}>School<span>SaaS</span></span>
        <span className={styles.logoSubText}>Super Admin</span>
      </div>
    </div>

    {/* Navigation */}
    <div className={styles.navSection}>
      <NavLinkItem
        label="Dashboard"
        icon="🏠"
        active={activeTab === 'Dashboard'}
        onClick={() => onTabChange('Dashboard')}
      />
      {menuGroups.map((group) => (
        <div key={group.title} className={styles.navGroup}>
          <div className={styles.groupTitle}>{group.title}</div>
          {group.items.map((item) => (
            <NavLinkItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.label}
              onClick={() => onTabChange(item.label)}
            />
          ))}
        </div>
      ))}
    </div>

    {/* AI Credits Widget */}
    <div className={styles.sidebarCredits}>
      <div className={styles.creditsLabel}>
        <span>AI Credits Usage</span>
        <span className={styles.creditsPercent}>24.9%</span>
      </div>
      <div className={styles.progressBarOuter}>
        <div className={styles.progressBarInner} style={{ width: '24.9%' }} />
      </div>
      <p className={styles.creditsNumbers}>12,450 / 50,000 credits</p>
      <button className={styles.creditsBtn} onClick={() => onTabChange('AI Credits')}>
        Manage AI Credits
      </button>
    </div>
  </aside>
);
