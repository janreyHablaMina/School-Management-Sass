'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/admin.module.css';
import { School } from '@/types/school';

interface TopBarProps {
  activeTab: string;
  selectedSchool: School | null;
  isScrolled: boolean;
  onSchoolsClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  selectedSchool,
  isScrolled,
  onSchoolsClick,
}) => {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const renderSubtitle = () => {
    if (activeTab === 'Dashboard') return 'Welcome back, Super Admin!';
    if (activeTab === 'Schools') {
      if (selectedSchool) {
        return (
          <span>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={onSchoolsClick}
            >
              Schools
            </span>
            {' > '}
            <span style={{ color: '#f5c842' }}>{selectedSchool.name}</span>
          </span>
        );
      }
      return 'Dashboard > Schools';
    }
    return `Management panel for ${activeTab}`;
  };

  return (
    <header className={`${styles.topBar} ${isScrolled ? styles.topBarScrolled : ''}`}>
      <div className={styles.titleArea}>
        <h1 className={styles.pageTitle}>
          {activeTab === 'Schools' && selectedSchool ? selectedSchool.name : activeTab}
        </h1>
        <span className={styles.pageSubtitle}>{renderSubtitle()}</span>
      </div>

      <div className={styles.topActions}>
        {/* Search Box */}
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input type="text" placeholder="Search schools, users..." className={styles.searchInput} />
        </div>

        {/* Notification Bell */}
        <button className={styles.bellButton} aria-label="Notifications">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.bellBadge}>12</span>
        </button>

        {/* Profile Avatar with Dropdown */}
        <div className={styles.profileContainer}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={styles.profileBadge}
            aria-haspopup="true"
            aria-expanded={showProfileDropdown}
          >
            <div className={styles.profileAvatar}>SA</div>
            <span className={styles.profileNameText}>Super Admin</span>
            <span className={styles.profileChevron}>▾</span>
          </button>

          {showProfileDropdown && (
            <>
              <div className={styles.dropdownOverlay} onClick={() => setShowProfileDropdown(false)} />
              <div className={styles.dropdownMenu}>
                <button
                  onClick={() => { setShowProfileDropdown(false); alert('My Profile settings coming soon.'); }}
                  className={styles.dropdownItem}
                >
                  👤 My Profile
                </button>
                <button
                  onClick={() => { setShowProfileDropdown(false); alert('Change Password form coming soon.'); }}
                  className={styles.dropdownItem}
                >
                  🔑 Change Password
                </button>
                <div className={styles.dropdownSeparator} />
                <button
                  onClick={handleLogout}
                  className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                >
                  🚪 Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
