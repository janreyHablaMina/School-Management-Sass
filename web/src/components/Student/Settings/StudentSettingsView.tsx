'use client';

import React, { useState } from 'react';
import { PageHeader, listStyles } from '@/components/ui/shared';
import { Shield, Bell, KeyRound, Smartphone, Save } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';
import styles from '@/components/SchoolAdmin/System/Settings/settings.module.css';

type SettingsSection = 'Security' | 'Notifications' | 'Preferences';

const NAV_ITEMS: { id: SettingsSection; label: string; hint: string; icon: string }[] = [
  { id: 'Security', label: 'Account Security', hint: 'Password & 2FA authentication', icon: '🔒' },
  { id: 'Notifications', label: 'Notifications', hint: 'Alerts, email & SMS channels', icon: '🔔' },
  { id: 'Preferences', label: 'Portal Preferences', hint: 'Language & display options', icon: '⚙️' },
];

export function StudentSettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('Security');
  const [saveMessage, setSaveMessage] = useState('');

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);

  // Notification Toggles
  const [emailAnnouncements, setEmailAnnouncements] = useState(true);
  const [emailGrades, setEmailGrades] = useState(true);
  const [smsAttendance, setSmsAttendance] = useState(true);
  const [smsEmergency, setSmsEmergency] = useState(true);

  // Preferences
  const [language, setLanguage] = useState('English (US)');

  const handleSave = () => {
    setSaveMessage('Settings updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Settings"
        subtitle="Manage your student account security, notification channels, and portal preferences."
      >
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={handleSave}
        >
          <Save size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          Save Changes
        </button>
      </PageHeader>

      {saveMessage ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusOk}`}>{saveMessage}</p>
      ) : null}

      <div className={styles.layout}>
        {/* Left Sidebar Nav */}
        <aside className={styles.navPanel}>
          <p className={styles.navEyebrow}>Student Portal</p>
          <h3 className={styles.navTitle}>Settings</h3>
          <nav className={styles.nav} aria-label="Settings sections">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.navBtn} ${activeSection === item.id ? styles.navBtnActive : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={styles.navIcon} aria-hidden>
                  {item.icon}
                </span>
                <span className={styles.navText}>
                  <span className={styles.navLabel}>{item.label}</span>
                  <span className={styles.navHint}>{item.hint}</span>
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main Content */}
        <div className={styles.content} key={activeSection}>
          {activeSection === 'Security' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Account Security</h3>
                <p className={styles.sectionCopy}>Manage your password and active authentication safeguards.</p>
              </div>

              <div className={styles.sectionBody} style={{ marginTop: '1.25rem' }}>
                <h4 style={{ color: '#f0efed', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>Change Password</h4>

                <div className={styles.fieldGrid}>
                  <div className={listStyles.fieldGroup}>
                    <label className={listStyles.fieldLabel}>Current Password</label>
                    <input
                      type="password"
                      className={listStyles.fieldInput}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div className={styles.fieldGrid}>
                  <div className={listStyles.fieldGroup}>
                    <label className={listStyles.fieldLabel}>New Password</label>
                    <input
                      type="password"
                      className={listStyles.fieldInput}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                    />
                  </div>
                  <div className={listStyles.fieldGroup}>
                    <label className={listStyles.fieldLabel}>Confirm New Password</label>
                    <input
                      type="password"
                      className={listStyles.fieldInput}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>

                <div className={styles.securityCard} style={{ marginTop: '1.5rem' }}>
                  <div>
                    <h5 className={styles.securityTitle}>Two-Factor Authentication (2FA)</h5>
                    <p className={styles.securityCopy}>Require a standard OTP code via SMS or email when logging into your account.</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                    />
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Notifications</h3>
                <p className={styles.sectionCopy}>Choose how and when you want to receive portal alerts.</p>
              </div>

              <div className={styles.toggleList}>
                <label className={`${styles.toggleRow} ${emailAnnouncements ? styles.toggleRowOn : ''}`}>
                  <div className={styles.toggleCopy}>
                    <span className={styles.toggleLabel}>Email Announcements</span>
                    <span className={styles.toggleHint}>Receive email copies of announcements published by admins and teachers.</span>
                  </div>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={emailAnnouncements}
                      onChange={(e) => setEmailAnnouncements(e.target.checked)}
                    />
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                  </div>
                </label>

                <label className={`${styles.toggleRow} ${emailGrades ? styles.toggleRowOn : ''}`}>
                  <div className={styles.toggleCopy}>
                    <span className={styles.toggleLabel}>Grade Posting Alerts</span>
                    <span className={styles.toggleHint}>Get notified when quarterly grades or exam marks are posted.</span>
                  </div>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={emailGrades}
                      onChange={(e) => setEmailGrades(e.target.checked)}
                    />
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                  </div>
                </label>

                <label className={`${styles.toggleRow} ${smsAttendance ? styles.toggleRowOn : ''}`}>
                  <div className={styles.toggleCopy}>
                    <span className={styles.toggleLabel}>SMS Attendance Alerts</span>
                    <span className={styles.toggleHint}>Instant SMS alerts for campus gate tap-in and tap-out entries.</span>
                  </div>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={smsAttendance}
                      onChange={(e) => setSmsAttendance(e.target.checked)}
                    />
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                  </div>
                </label>

                <label className={`${styles.toggleRow} ${smsEmergency ? styles.toggleRowOn : ''}`}>
                  <div className={styles.toggleCopy}>
                    <span className={styles.toggleLabel}>Emergency & Broadcast Alerts</span>
                    <span className={styles.toggleHint}>High-priority SMS alerts for class suspensions and emergency broadcasts.</span>
                  </div>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={smsEmergency}
                      onChange={(e) => setSmsEmergency(e.target.checked)}
                    />
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'Preferences' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Portal Preferences</h3>
                <p className={styles.sectionCopy}>Customize your language and display settings.</p>
              </div>

              <div className={styles.sectionBody} style={{ marginTop: '1.25rem' }}>
                <div className={listStyles.fieldGroup} style={{ maxWidth: '300px' }}>
                  <label className={listStyles.fieldLabel}>Display Language</label>
                  <select
                    className={listStyles.fieldInput}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Filipino">Filipino</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
