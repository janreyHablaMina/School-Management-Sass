'use client';

import React from 'react';
import type { TeacherProfile } from '@/types/teacherPortal';
import { listStyles, modalStyles, PageHeader } from '../shared';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { SettingsSection } from './components/SettingsSection';
import { initialsFromName } from './utils';
import { useSettings } from './useSettings';
import styles from './settings.module.css';

interface SettingsViewProps {
  onProfileSave?: (profile: TeacherProfile) => void;
}

export function SettingsView({ onProfileSave }: SettingsViewProps) {
  const {
    sections,
    section,
    setSection,
    profile,
    updateProfile,
    notifications,
    updateNotification,
    preferences,
    updatePreference,
    appearance,
    updateAppearance,
    classroomOptions,
    landingTabOptions,
    saveChanges,
    saveMessage,
    error,
    isPasswordOpen,
    openPassword,
    closePassword,
    markPasswordUpdated,
  } = useSettings({ onProfileSave });

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, notifications, and classroom preferences."
      >
        <button type="button" className={listStyles.primaryBtn} onClick={saveChanges}>
          Save changes
        </button>
      </PageHeader>

      {error ? <p className={`${styles.statusBanner} ${styles.statusError}`}>{error}</p> : null}
      {saveMessage ? (
        <p className={`${styles.statusBanner} ${styles.statusOk}`}>{saveMessage}</p>
      ) : null}

      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Settings sections">
          {sections.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.navBtn} ${section === item ? styles.navBtnActive : ''}`}
              onClick={() => setSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div>
          {section === 'Profile' ? (
            <SettingsSection
              title="Profile"
              description="Update how your name and contact details appear across Teachify."
            >
              <div className={styles.avatarRow}>
                <div className={styles.avatar}>{initialsFromName(profile.fullName)}</div>
                <div className={styles.avatarMeta}>
                  <span className={styles.avatarName}>{profile.fullName || 'Your name'}</span>
                  <span className={styles.avatarRole}>{profile.role || 'Teacher'}</span>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Full name</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.fullName}
                    onChange={(e) => updateProfile('fullName', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Short name</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.shortName}
                    onChange={(e) => updateProfile('shortName', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Email</span>
                  <input
                    className={modalStyles.modalInput}
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Phone</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Department</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.department}
                    onChange={(e) => updateProfile('department', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Subjects</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.subjects}
                    onChange={(e) => updateProfile('subjects', e.target.value)}
                  />
                </label>
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Notifications' ? (
            <SettingsSection
              title="Notifications"
              description="Choose which classroom updates should reach you."
            >
              <div className={styles.toggleList}>
                {(
                  [
                    ['announcementReplies', 'Announcement replies', 'When students or parents respond'],
                    ['assignmentDeadlines', 'Assignment deadlines', 'Reminders before work is due'],
                    ['attendanceReminders', 'Attendance reminders', 'Before class sessions start'],
                    ['gradePosts', 'Grade posts', 'When grades are ready to publish'],
                    ['calendarEvents', 'Calendar events', 'Upcoming classes and school events'],
                  ] as const
                ).map(([key, label, hint]) => (
                  <label key={key} className={styles.toggleRow}>
                    <span className={styles.toggleCopy}>
                      <span className={styles.toggleLabel}>{label}</span>
                      <span className={styles.toggleHint}>{hint}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => updateNotification(key, e.target.checked)}
                    />
                  </label>
                ))}
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Preferences' ? (
            <SettingsSection
              title="Preferences"
              description="Set defaults that speed up your daily classroom flow."
            >
              <div className={styles.fieldGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Default classroom</span>
                  <select
                    className={modalStyles.modalInput}
                    value={preferences.defaultClassroom}
                    onChange={(e) => updatePreference('defaultClassroom', e.target.value)}
                  >
                    {classroomOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Landing tab</span>
                  <select
                    className={modalStyles.modalInput}
                    value={preferences.landingTab}
                    onChange={(e) => updatePreference('landingTab', e.target.value)}
                  >
                    {landingTabOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Week starts on</span>
                <div className={styles.chipRow}>
                  {(['Sunday', 'Monday'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        preferences.weekStartsOn === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updatePreference('weekStartsOn', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Time format</span>
                <div className={styles.chipRow}>
                  {(['12-hour', '24-hour'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        preferences.timeFormat === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updatePreference('timeFormat', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Security' ? (
            <SettingsSection
              title="Security"
              description="Keep your Teachify account protected."
            >
              <label className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Signed-in email</span>
                <input className={modalStyles.modalInput} value={profile.email} readOnly />
              </label>

              <div className={styles.securityCard}>
                <div>
                  <p className={styles.securityTitle}>Password</p>
                  <p className={styles.securityCopy}>
                    Last updated in this demo session only. Use a strong unique password.
                  </p>
                </div>
                <button type="button" className={listStyles.secondaryBtn} onClick={openPassword}>
                  Change password
                </button>
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Appearance' ? (
            <SettingsSection
              title="Appearance"
              description="Tune chalkboard density and accent preference for your workspace."
            >
              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Density</span>
                <div className={styles.chipRow}>
                  {(['Comfortable', 'Compact'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        appearance.density === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updateAppearance('density', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Accent</span>
                <div className={styles.chipRow}>
                  {(['Chalk yellow', 'Soft green', 'Sky blue'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        appearance.accent === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updateAppearance('accent', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </SettingsSection>
          ) : null}
        </div>
      </div>

      {isPasswordOpen ? (
        <ChangePasswordModal onClose={closePassword} onSaved={markPasswordUpdated} />
      ) : null}
    </div>
  );
}
