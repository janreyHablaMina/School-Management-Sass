'use client';

import React from 'react';
import { listStyles, modalStyles, PageHeader } from '@/components/ui/shared';
import { SettingsNav } from './components/SettingsNav';
import { SettingsSection } from './components/SettingsSection';
import { SettingsToggle } from './components/SettingsToggle';
import { PERMISSION_ITEMS } from './settingsMeta';
import { useSettings } from './useSettings';
import styles from './settings.module.css';

export function SettingsView() {
  const {
    section,
    setSection,
    profile,
    updateProfile,
    academics,
    updateAcademics,
    permissions,
    updatePermissions,
    billing,
    updateBilling,
    saveChanges,
    saveMessage,
    isDirty,
  } = useSettings();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="School Settings"
        subtitle="Manage overall school configuration, billing, and permissions."
      >
        {isDirty ? <span className={styles.headerHint}>Unsaved changes</span> : null}
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={saveChanges}
          disabled={!isDirty}
        >
          Save changes
        </button>
      </PageHeader>

      {saveMessage ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusOk}`}>{saveMessage}</p>
      ) : null}
      {!saveMessage && isDirty ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusInfo}`}>
          You have unsaved changes in this session.
        </p>
      ) : null}

      <div className={styles.layout}>
        <SettingsNav active={section} onChange={setSection} />

        <div className={styles.content} key={section}>
          {section === 'School Profile' ? (
            <SettingsSection
              title="School Profile"
              description="Update how your school appears to students and parents."
            >
              <div className={styles.avatarCard}>
                <div className={styles.avatar}>🏫</div>
                <div className={styles.avatarMeta}>
                  <span className={styles.avatarName}>{profile.schoolName || 'Your School'}</span>
                  <span className={styles.avatarRole}>{profile.motto || 'Motto not set'}</span>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>School Name</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.schoolName}
                    onChange={(e) => updateProfile('schoolName', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Motto</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.motto}
                    onChange={(e) => updateProfile('motto', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Contact Email</span>
                  <input
                    className={modalStyles.modalInput}
                    type="email"
                    value={profile.contactEmail}
                    onChange={(e) => updateProfile('contactEmail', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Contact Phone</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.contactPhone}
                    onChange={(e) => updateProfile('contactPhone', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField} style={{ gridColumn: '1 / -1' }}>
                  <span className={modalStyles.modalLabel}>Address</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.address}
                    onChange={(e) => updateProfile('address', e.target.value)}
                  />
                </label>
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Academics' ? (
            <SettingsSection
              title="Academics"
              description="Configure the school year and term structures."
            >
              <div className={styles.fieldGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Current Academic Year</span>
                  <input
                    className={modalStyles.modalInput}
                    value={academics.academicYear}
                    onChange={(e) => updateAcademics('academicYear', e.target.value)}
                    placeholder="e.g. 2025-2026"
                  />
                </label>
              </div>

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Grading System</span>
                <div className={styles.chipRow}>
                  {(['Numerical (1-100)', 'Letter (A-F)'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        academics.gradingSystem === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updateAcademics('gradingSystem', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Term Structure</span>
                <div className={styles.chipRow}>
                  {(['Quarters', 'Semesters', 'Trimesters'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceChip} ${
                        academics.termStructure === option ? styles.choiceChipActive : ''
                      }`}
                      onClick={() => updateAcademics('termStructure', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Permissions' ? (
            <SettingsSection
              title="Permissions"
              description="Set global permissions and access levels for staff and students."
            >
              <div className={styles.toggleList}>
                {PERMISSION_ITEMS.map((item) => (
                  <SettingsToggle
                    key={item.key}
                    label={item.label}
                    hint={item.hint}
                    checked={permissions[item.key]}
                    onChange={(checked) => updatePermissions(item.key, checked)}
                  />
                ))}
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Billing' ? (
            <SettingsSection
              title="Billing & Subscription"
              description="Manage your Eskwelahan+ subscription and add-ons."
            >
              <div className={styles.securityCard}>
                <div>
                  <p className={styles.securityTitle}>Current Plan</p>
                  <p className={styles.securityCopy}>
                    Your school is currently subscribed to the <strong>{billing.planName}</strong>.
                  </p>
                </div>
                <button type="button" className={listStyles.secondaryBtn}>
                  Change Plan
                </button>
              </div>

              <div className={styles.fieldGrid} style={{ marginTop: '1.5rem' }}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Billing Contact Email</span>
                  <input
                    className={modalStyles.modalInput}
                    type="email"
                    value={billing.billingEmail}
                    onChange={(e) => updateBilling('billingEmail', e.target.value)}
                  />
                </label>
              </div>

              <div className={styles.toggleList} style={{ marginTop: '1.5rem' }}>
                <SettingsToggle
                  label="Auto-reload AI Credits"
                  hint="Automatically purchase credits when your school drops below 10% pool balance."
                  checked={billing.autoReloadAiCredits}
                  onChange={(checked) => updateBilling('autoReloadAiCredits', checked)}
                />
              </div>
            </SettingsSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}
