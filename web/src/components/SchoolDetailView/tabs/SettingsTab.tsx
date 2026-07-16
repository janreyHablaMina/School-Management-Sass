import React, { useState } from 'react';
import styles from '../SchoolDetailView.module.css';
import { School, SchoolDetails } from '@/types/school';

export const SettingsTab = ({ school, details }: { school: School; details: SchoolDetails }) => {
  const [activeSettingsMenu, setActiveSettingsMenu] = useState('School Information');

  const settingsMenu = [
    { label: 'School Information', icon: 'ⓘ' },
    { label: 'Administrators', icon: '👤' },
    { label: 'General Settings', icon: '⚙️' },
    { label: 'Security', icon: '🔒' },
    { label: 'Notification Preferences', icon: '🔔' },
    { label: 'AI Credits Settings', icon: '⚡' },
    { label: 'Integrations', icon: '🔌' },
    { label: 'Billing & Invoices', icon: '💳' },
    { label: 'Data & Privacy', icon: '🛡️' },
    { label: 'Activity Logs', icon: '📜' },
  ];

  return (
    <div className={styles.settingsLayout}>
      {/* Left Sidebar Menu */}
      <div className={styles.settingsSidebar}>
        <h4 className={styles.settingsSidebarTitle}>Settings</h4>
        <ul className={styles.settingsMenuList}>
          {settingsMenu.map((item) => (
            <li key={item.label}>
              <button
                className={`${styles.settingsMenuBtn} ${activeSettingsMenu === item.label ? styles.settingsMenuBtnActive : ''}`}
                onClick={() => setActiveSettingsMenu(item.label)}
              >
                <span className={styles.settingsMenuIcon}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className={styles.settingsHelpCard}>
          <div className={styles.settingsHelpTitle}>Need Help?</div>
          <div className={styles.settingsHelpDesc}>Learn how to manage school settings</div>
          <button className={styles.settingsHelpBtn}>View Help Center ↗</button>
        </div>
      </div>

      {/* Right Main Content */}
      <div className={styles.settingsContent}>
        {activeSettingsMenu === 'School Information' ? (
          <div className={styles.settingsInfoSection}>
            <div className={styles.settingsContentHeader}>
              <div>
                <h3 className={styles.settingsContentTitle}>School Information</h3>
                <p className={styles.settingsContentDesc}>View and update the school&apos;s basic information.</p>
              </div>
              <button className={styles.settingsEditBtn}>✏️ Edit Information</button>
            </div>

            <div className={styles.settingsInfoGrid}>
              <div className={styles.settingsLogoSection}>
                <div className={styles.settingsFieldLabel}>School Logo</div>
                <div className={styles.settingsLogoBox}>
                  <svg width="60" height="60" viewBox="0 0 100 100" style={{ filter: 'url(#chalk-wobble)' }}>
                    <path d="M 50 10 C 70 12, 85 10, 85 35 C 85 65, 50 90, 50 90 C 50 90, 15 65, 15 35 C 15 10, 30 12, 50 10 Z" fill="rgba(245, 200, 66, 0.1)" stroke="#f5c842" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 22 35 L 78 35 M 50 10 L 50 90" stroke="rgba(240, 239, 237, 0.4)" strokeWidth="2" strokeDasharray="2 3" />
                  </svg>
                </div>
                <button className={styles.settingsUploadBtn}>↑ Change Logo</button>
                <div className={styles.settingsUploadHint}>Allowed file: JPG, PNG (Max. 2MB)</div>
              </div>

              <div className={styles.settingsDetailsGrid}>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>School Name</div>
                  <div className={styles.settingsFieldValue}>{school.name}</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>School ID</div>
                  <div className={styles.settingsFieldValue}>{details.id}</div>
                </div>
                
                <div className={styles.settingsField} style={{ gridColumn: 'span 2' }}>
                  <div className={styles.settingsFieldLabel}>Address</div>
                  <div className={styles.settingsFieldValue}>{details.address}</div>
                </div>
                
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Phone Number</div>
                  <div className={styles.settingsFieldValue}>{details.phone}</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Email Address</div>
                  <div className={styles.settingsFieldValue}>{details.email}</div>
                </div>
                
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>School Website</div>
                  <div className={styles.settingsFieldValueLink}>www.{school.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.ph ↗</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>School Type</div>
                  <div className={styles.settingsFieldValue}>Private</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Date Joined</div>
                  <div className={styles.settingsFieldValue}>{school.joined}</div>
                </div>
                
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Founded Year</div>
                  <div className={styles.settingsFieldValue}>1998</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Timezone</div>
                  <div className={styles.settingsFieldValue}>(GMT+8:00) Asia/Manila</div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.settingsFieldLabel}>Status</div>
                  <div className={styles.settingsFieldValue}><span className="status-badge active">Active</span></div>
                </div>
              </div>
            </div>

            <div className={styles.settingsCardsRow}>
              {/* Subscription & Plan Card */}
              <div className={styles.settingsActionCard}>
                <h4 className={styles.settingsActionTitle}>Subscription & Plan</h4>
                <p className={styles.settingsActionDesc}>Manage the school&apos;s subscription plan.</p>
                <div className={styles.settingsActionContent}>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Current Plan</span>
                    <span className={styles.settingsActionValue}>{school.plan || 'School Plan'}</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Monthly Fee</span>
                    <span className={styles.settingsActionValue}>{school.revenue || '₱2,999'}</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Billing Cycle</span>
                    <span className={styles.settingsActionValue}>Monthly</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Next Renewal Date</span>
                    <span className={styles.settingsActionValueHighlight}>{details.creditsReset} <span className={styles.settingsDaysLeft}>(30 days left)</span></span>
                  </div>
                </div>
                <button className={styles.settingsCardBtn}>📄 Manage Subscription</button>
              </div>

              {/* Admin Account Card */}
              <div className={styles.settingsActionCard}>
                <h4 className={styles.settingsActionTitle}>Admin Account</h4>
                <p className={styles.settingsActionDesc}>Primary school admin information.</p>
                <div className={styles.settingsActionContent}>
                  <div className={styles.settingsAdminAvatarRow}>
                    <div className={styles.settingsAdminAvatar}>JD</div>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Admin Name</span>
                    <span className={styles.settingsActionValue}>Juan Dela Cruz</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Admin Email</span>
                    <span className={styles.settingsActionValue}>admin@{school.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.ph</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Last Login</span>
                    <span className={styles.settingsActionValue}>May 31, 2025 10:35 AM</span>
                  </div>
                </div>
                <button className={styles.settingsCardBtn} style={{ marginTop: 'auto' }}>🔑 Login as School Admin</button>
              </div>

              {/* AI Credits Card */}
              <div className={styles.settingsActionCard}>
                <h4 className={styles.settingsActionTitle}>AI Credits</h4>
                <p className={styles.settingsActionDesc}>Manage AI credits allocation and usage.</p>
                <div className={styles.settingsActionContent}>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Total Credits</span>
                    <span className={styles.settingsActionValueBold}>{details.creditsTotal}</span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Used Credits</span>
                    <span className={styles.settingsActionValueBold}>{details.creditsUsed} <span className={styles.settingsActionSubVal}>(100%)</span></span>
                  </div>
                  <div className={styles.settingsActionRow}>
                    <span className={styles.settingsActionLabel}>Remaining Credits</span>
                    <span className={styles.settingsActionValueBold}>{details.creditsTotal - details.creditsUsed} <span className={styles.settingsActionSubVal}>(0%)</span></span>
                  </div>
                  <div className={styles.settingsActionRow} style={{ marginTop: '0.8rem' }}>
                    <span className={styles.settingsActionLabel}>Next Reset Date</span>
                    <span className={styles.settingsActionValueHighlight}>{details.creditsReset} <span className={styles.settingsDaysLeft}>(30 days left)</span></span>
                  </div>
                </div>
                <button className={styles.settingsCardBtn}>⚡ Manage AI Credits</button>
              </div>

              {/* Danger Zone Card */}
              <div className={styles.settingsActionCard} style={{ borderColor: 'rgba(224, 94, 94, 0.3)' }}>
                <h4 className={styles.settingsDangerTitle}>Danger Zone</h4>
                <p className={styles.settingsActionDesc}>Irreversible and destructive actions.</p>
                <div className={styles.settingsDangerContent}>
                  <button className={styles.settingsDangerBtnOutline}>
                    <span className={styles.settingsDangerBtnTitle}>🔔 Suspend School</span>
                    <span className={styles.settingsDangerBtnDesc}>Temporarily suspend school access</span>
                  </button>
                  <button className={styles.settingsDangerBtnOutline}>
                    <span className={styles.settingsDangerBtnTitle}>🗑️ Delete School</span>
                    <span className={styles.settingsDangerBtnDesc}>Permanently delete this school</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className={styles.settingsFooterNote}>
              ℹ️ Changes made in settings may take a few minutes to reflect across the platform.
            </div>
          </div>
        ) : (
          <div className={styles.settingsInfoSection}>
            <div className={styles.settingsContentHeader}>
              <h3 className={styles.settingsContentTitle}>{activeSettingsMenu}</h3>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,239,237,0.4)' }}>
              This section is under construction.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
