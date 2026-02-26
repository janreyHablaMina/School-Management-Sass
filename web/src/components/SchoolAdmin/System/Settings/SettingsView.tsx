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
                {profile.logoUrl ? (
                  <img src={profile.logoUrl} alt="School Logo" className={styles.avatar} />
                ) : (
                  <div className={styles.avatar}>🏫</div>
                )}
                <div className={styles.avatarMeta}>
                  <span className={styles.avatarName}>{profile.schoolName || 'Your School'}</span>
                  <span className={styles.avatarRole}>{profile.motto || 'Motto not set'}</span>
                  
                  <div style={{ marginTop: '0.4rem' }}>
                    <input 
                      type="file" 
                      id="logo-upload" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          updateProfile('logoUrl', url);
                        }
                      }}
                    />
                    <label htmlFor="logo-upload" className={listStyles.toolBtn}>
                      Upload Logo
                    </label>
                  </div>
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
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Website URL</span>
                  <input
                    className={modalStyles.modalInput}
                    type="url"
                    value={profile.websiteUrl || ''}
                    onChange={(e) => updateProfile('websiteUrl', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Principal Name</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.principalName || ''}
                    onChange={(e) => updateProfile('principalName', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Theme Accent Color</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={profile.accentColor || '#f5c842'}
                      onChange={(e) => updateProfile('accentColor', e.target.value)}
                      style={{ width: '38px', height: '38px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    />
                    <input
                      className={modalStyles.modalInput}
                      value={profile.accentColor || '#f5c842'}
                      onChange={(e) => updateProfile('accentColor', e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                </label>
                <label className={modalStyles.modalField} style={{ gridColumn: '1 / -1' }}>
                  <span className={modalStyles.modalLabel}>Address</span>
                  <input
                    className={modalStyles.modalInput}
                    value={profile.address}
                    onChange={(e) => updateProfile('address', e.target.value)}
                  />
                </label>
                <label className={modalStyles.modalField} style={{ gridColumn: '1 / -1' }}>
                  <span className={modalStyles.modalLabel}>Motto</span>
                  <textarea
                    className={modalStyles.modalTextarea}
                    value={profile.motto}
                    onChange={(e) => updateProfile('motto', e.target.value)}
                    rows={2}
                    placeholder="Enter school motto"
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

              <div className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>School Levels Offered</span>
                <div className={styles.chipRow}>
                  {(['Pre-School', 'Elementary', 'Junior High', 'Senior High', 'College'] as const).map((option) => {
                    const currentLevels = academics.schoolLevels || [];
                    const isActive = currentLevels.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.choiceChip} ${isActive ? styles.choiceChipActive : ''}`}
                        onClick={() => {
                          const newLevels = isActive 
                            ? currentLevels.filter(lvl => lvl !== option)
                            : [...currentLevels, option];
                          updateAcademics('schoolLevels', newLevels);
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.fieldGrid} style={{ marginTop: '1.25rem' }}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Passing Grade</span>
                  <input
                    className={modalStyles.modalInput}
                    value={academics.passingGrade || ''}
                    onChange={(e) => updateAcademics('passingGrade', e.target.value)}
                    placeholder="e.g. 75"
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Class Size Limit</span>
                  <input
                    className={modalStyles.modalInput}
                    type="number"
                    value={academics.classSizeLimit || ''}
                    onChange={(e) => updateAcademics('classSizeLimit', e.target.value)}
                    placeholder="e.g. 40"
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Late Work Penalty (%)</span>
                  <input
                    className={modalStyles.modalInput}
                    type="number"
                    value={academics.lateWorkPenalty || ''}
                    onChange={(e) => updateAcademics('lateWorkPenalty', e.target.value)}
                    placeholder="e.g. 10"
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Tardy Threshold (Mins)</span>
                  <input
                    className={modalStyles.modalInput}
                    type="number"
                    value={academics.tardyThresholdMinutes || ''}
                    onChange={(e) => updateAcademics('tardyThresholdMinutes', e.target.value)}
                    placeholder="e.g. 15"
                  />
                </label>
              </div>

              <div className={styles.fieldGrid} style={{ marginTop: '1.25rem' }}>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Schedule Type</span>
                  <select 
                    className={modalStyles.modalInput}
                    value={academics.scheduleType || 'Traditional'}
                    onChange={(e) => updateAcademics('scheduleType', e.target.value as any)}
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Block Scheduling">Block Scheduling</option>
                  </select>
                </div>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Attendance Tracking</span>
                  <select 
                    className={modalStyles.modalInput}
                    value={academics.attendanceTracking || 'Once Daily'}
                    onChange={(e) => updateAcademics('attendanceTracking', e.target.value as any)}
                  >
                    <option value="Once Daily">Once Daily</option>
                    <option value="Per Subject">Per Subject</option>
                  </select>
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
                    checked={permissions[item.key] || false}
                    onChange={(checked) => updatePermissions(item.key, checked)}
                  />
                ))}
              </div>
            </SettingsSection>
          ) : null}

          {section === 'Billing' ? (
            <SettingsSection
              title="Billing & System"
              description="Manage your Eskwelahan+ subscription, billing, and system localization."
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
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Data Retention Policy</span>
                  <select 
                    className={modalStyles.modalInput}
                    value={billing.dataRetentionPolicy || '5 Years'}
                    onChange={(e) => updateBilling('dataRetentionPolicy', e.target.value as any)}
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="3 Years">3 Years</option>
                    <option value="5 Years">5 Years</option>
                    <option value="Indefinite">Indefinite</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGrid} style={{ marginTop: '1.5rem' }}>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Timezone</span>
                  <select 
                    className={modalStyles.modalInput}
                    value={billing.timezone}
                    onChange={(e) => updateBilling('timezone', e.target.value)}
                  >
                    <option value="Asia/Manila">Asia/Manila</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Currency</span>
                  <select 
                    className={modalStyles.modalInput}
                    value={billing.currency}
                    onChange={(e) => updateBilling('currency', e.target.value)}
                  >
                    <option value="PHP (₱)">PHP (₱)</option>
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div className={styles.toggleList} style={{ marginTop: '1.5rem' }}>
                <SettingsToggle
                  label="SMS Notifications"
                  hint="Enable sending SMS alerts to parents for emergencies or attendance."
                  checked={billing.enableSmsNotifications || false}
                  onChange={(checked) => updateBilling('enableSmsNotifications', checked)}
                />
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
