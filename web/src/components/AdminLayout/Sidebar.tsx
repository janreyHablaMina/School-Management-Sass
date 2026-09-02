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
  menuGroups?: any[];
  roleTitle?: string;
  brandName?: string;
  brandAccent?: string;
  showCredits?: boolean;
  profileName?: string;
  profileRole?: string;
  profileInitials?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  menuGroups: customMenuGroups = menuGroups,
  roleTitle = 'Super Admin',
  brandName,
  brandAccent = 'SaaS',
  showCredits = true,
  profileName,
  profileRole,
  profileInitials,
}) => (
  <aside className={styles.sidebar}>
    {/* Logo / Brand */}
    <div className={styles.logoSection} style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: '0.5rem', marginTop: '-0.5rem' }}>
      <img src="/logo-transparent.png" alt="Eskwelahan +" style={{ width: '100%', maxWidth: '180px', height: 'auto', objectFit: 'contain' }} />
    </div>

    {/* Navigation */}
    <div className={styles.navSection}>
      <NavLinkItem
        label="Dashboard"
        icon="🏠"
        active={activeTab === 'Dashboard'}
        onClick={() => onTabChange('Dashboard')}
      />
      {customMenuGroups.map((group) => (
        <div key={group.title} className={styles.navGroup}>
          <div className={styles.groupTitle}>{group.title}</div>
          {group.items.map((item: any) => (
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
    {showCredits && (
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
    )}

    {/* Profile footer (Teacher Portal) */}
    {profileName && (
      <div className={styles.sidebarProfile}>
        <div className={styles.sidebarProfileAvatar}>{profileInitials || 'T'}</div>
        <div className={styles.sidebarProfileText}>
          <span className={styles.sidebarProfileName}>{profileName}</span>
          {profileRole && <span className={styles.sidebarProfileRole}>{profileRole}</span>}
        </div>
        <span className={styles.sidebarProfileChevron}>▾</span>
      </div>
    )}
  </aside>
);
