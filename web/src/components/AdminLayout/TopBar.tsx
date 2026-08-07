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
  userName?: string;
  userInitials?: string;
  welcomeText?: string;
  notificationCount?: number;
  searchPlaceholder?: string;
  hideSearch?: boolean;
  hideTitle?: boolean;
  showMessages?: boolean;
  aiCredits?: number | null;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  selectedSchool,
  isScrolled,
  onSchoolsClick,
  userName = 'Super Admin',
  userInitials = 'SA',
  welcomeText = 'Welcome back, Super Admin!',
  notificationCount = 12,
  searchPlaceholder = 'Search schools, users...',
  hideSearch = false,
  hideTitle = false,
  showMessages = false,
  aiCredits = null,
}) => {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const renderSubtitle = () => {
    if (activeTab === 'Dashboard') return welcomeText;
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
    if (activeTab === 'AddSubscription') return 'Dashboard > Subscriptions > Add Subscription';
    if (activeTab === 'Subscriptions') return 'Dashboard > Subscriptions';
    if (activeTab === 'AddSchool') return 'Dashboard > Schools > Add School';
    return `Management panel for ${activeTab}`;
  };

  return (
    <header className={`${styles.topBar} ${isScrolled ? styles.topBarScrolled : ''}`}>
      {!hideTitle && (
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>
            {activeTab === 'Schools' && selectedSchool
              ? selectedSchool.name
              : activeTab === 'AddSubscription'
                ? 'Add New Subscription'
                : activeTab === 'AddSchool'
                  ? 'Add School'
                  : activeTab}
          </h1>
          <span className={styles.pageSubtitle}>{renderSubtitle()}</span>
        </div>
      )}

      <div className={`${styles.topActions} ${hideTitle ? styles.topActionsGrow : ''}`}>
        {!hideSearch && (
          <div className={`${styles.searchBox} ${hideTitle ? styles.searchBoxWide : ''}`}>
            <span className={styles.searchIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input type="text" placeholder={searchPlaceholder} className={styles.searchInput} />
          </div>
        )}

        <button className={styles.bellButton} aria-label="Notifications">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.bellBadge}>{notificationCount}</span>
        </button>

        {showMessages && (
          <button className={styles.bellButton} aria-label="Messages">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {aiCredits !== null && (
          <button type="button" className={styles.aiCreditsPill} aria-label="AI Credits">
            ✨ AI Credits: {aiCredits.toLocaleString()}
          </button>
        )}

        <div className={styles.profileContainer}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={styles.profileBadge}
            aria-haspopup="true"
            aria-expanded={showProfileDropdown}
          >
            <div className={styles.profileAvatar}>{userInitials}</div>
            <span className={styles.profileNameText}>{userName}</span>
            <span className={styles.profileChevron}>▾</span>
          </button>

          {showProfileDropdown && (
            <>
              <div className={styles.dropdownOverlay} onClick={() => setShowProfileDropdown(false)} />
              <div className={styles.dropdownMenu}>
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    alert('My Profile settings coming soon.');
                  }}
                  className={styles.dropdownItem}
                >
                  👤 My Profile
                </button>
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    alert('Change Password form coming soon.');
                  }}
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
