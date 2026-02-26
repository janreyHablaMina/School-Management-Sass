'use client';

import React from 'react';
import { listStyles, PageHeader } from '@/components/ui/shared';
import { SettingsNav } from './components/SettingsNav';
import { useSettings } from './useSettings';
import { SchoolProfileTab } from './components/SchoolProfileTab';
import { PermissionsTab } from './components/PermissionsTab';
import { BillingTab } from './components/BillingTab';
import styles from './settings.module.css';

export function SettingsView() {
  const {
    section,
    setSection,
    profile,
    updateProfile,
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
          {section === 'School Profile' && (
            <SchoolProfileTab profile={profile} updateProfile={updateProfile} />
          )}

          {section === 'Permissions' && (
            <PermissionsTab permissions={permissions} updatePermissions={updatePermissions} />
          )}

          {section === 'Billing' && (
            <BillingTab billing={billing} updateBilling={updateBilling} />
          )}
        </div>
      </div>
    </div>
  );
}
