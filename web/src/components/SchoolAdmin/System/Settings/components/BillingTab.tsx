import React from 'react';
import { listStyles, modalStyles } from '@/components/ui/shared';
import { SettingsSection } from './SettingsSection';
import { SettingsToggle } from './SettingsToggle';
import { BillingSettings } from '@/types/schoolSettings';
import styles from '../settings.module.css';

interface BillingTabProps {
  billing: BillingSettings;
  updateBilling: <K extends keyof BillingSettings>(key: K, value: BillingSettings[K]) => void;
}

export function BillingTab({ billing, updateBilling }: BillingTabProps) {
  return (
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
  );
}

