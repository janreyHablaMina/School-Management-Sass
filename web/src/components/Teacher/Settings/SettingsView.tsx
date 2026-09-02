'use client';

import React from 'react';
import type { TeacherProfile } from '@/types/teacherPortal';
import { FilterSelect, listStyles, modalStyles, PageHeader } from '../shared';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { SettingsNav } from './components/SettingsNav';
import { SettingsSection } from './components/SettingsSection';
import { SettingsToggle } from './components/SettingsToggle';
import { ACCENT_OPTIONS, NOTIFICATION_ITEMS } from './settingsMeta';
import { initialsFromName } from './utils';
import { useSettings } from './useSettings';
import styles from './settings.module.css';

interface SettingsViewProps {
  onProfileSave?: (profile: TeacherProfile) => void;
}

export function SettingsView({ onProfileSave }: SettingsViewProps) {
  const {
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
    isDirty,
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
        {isDirty ? <span className={styles.headerHint}>Unsaved changes</span> : null}
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={saveChanges}
          disabled={!isDirty && !error}
        >
          Save changes
        </button>
      </PageHeader>

      {error ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusError}`}>{error}</p>
      ) : null}
      {saveMessage ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusOk}`}>{saveMessage}</p>
      ) : null}
      {!error && !saveMessage && isDirty ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusInfo}`}>
          You have unsaved changes in this session.
        </p>
      ) : null}

      <div className={styles.layout}>
        <SettingsNav active={section} onChange={setSection} />

        <div className={styles.content} key={section}>
          {section === 'Profile' ? (
            <SettingsSection
              title="Profile"
              description="Update how your name and contact details appear across Eskwelahan +."
            >
              <div className={styles.avatarCard}>
                <div className={styles.avatar}>{initialsFromName(profile.fullName)}</div>
                <div className={styles.avatarMeta}>
                  <span className={styles.avatarName}>{profile.fullName || 'Your name'}</span>
                  <span className={styles.avatarRole}>{profile.role || 'Teacher'}</span>
                  <span className={styles.avatarEmail}>{profile.email || 'Add your email'}</span>
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
                {NOTIFICATION_ITEMS.map((item) => (
                  <SettingsToggle
                    key={item.key}
                    label={item.label}
                    hint={item.hint}
                    checked={notifications[item.key]}
                    onChange={(checked) => updateNotification(item.key, checked)}
                  />
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
                <FilterSelect
                  label="Default classroom"
                  value={preferences.defaultClassroom}
                  options={classroomOptions}
                  onChange={(value) => updatePreference('defaultClassroom', value)}
                  fullWidth
                />
                <FilterSelect
                  label="Landing tab"
                  value={preferences.landingTab}
                  options={landingTabOptions}
                  onChange={(value) => updatePreference('landingTab', value)}
                  fullWidth
                />
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
              description="Keep your Eskwelahan + account protected."
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
                <div className={styles.accentRow}>
                  {ACCENT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.accentOption} ${
                        appearance.accent === option.value ? styles.accentOptionActive : ''
                      }`}
                      onClick={() => updateAppearance('accent', option.value)}
                    >
                      <span
                        className={styles.accentDot}
                        style={{ background: option.color }}
                      />
                      {option.value}
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
