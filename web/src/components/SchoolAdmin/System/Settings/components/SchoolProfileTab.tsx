import React from 'react';
import { listStyles, modalStyles } from '@/components/ui/shared';
import { SettingsSection } from './SettingsSection';
import { SchoolProfileSettings } from '@/types/schoolSettings';
import styles from '../settings.module.css';

interface SchoolProfileTabProps {
  profile: SchoolProfileSettings;
  updateProfile: <K extends keyof SchoolProfileSettings>(key: K, value: SchoolProfileSettings[K]) => void;
}

export function SchoolProfileTab({ profile, updateProfile }: SchoolProfileTabProps) {
  return (
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
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            📘 Facebook URL
          </span>
          <input
            className={modalStyles.modalInput}
            type="url"
            value={profile.facebookUrl || ''}
            onChange={(e) => updateProfile('facebookUrl', e.target.value)}
            placeholder="e.g. https://facebook.com/..."
          />
        </label>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            🐦 Twitter URL
          </span>
          <input
            className={modalStyles.modalInput}
            type="url"
            value={profile.twitterUrl || ''}
            onChange={(e) => updateProfile('twitterUrl', e.target.value)}
            placeholder="e.g. https://twitter.com/..."
          />
        </label>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            📷 Instagram URL
          </span>
          <input
            className={modalStyles.modalInput}
            type="url"
            value={profile.instagramUrl || ''}
            onChange={(e) => updateProfile('instagramUrl', e.target.value)}
            placeholder="e.g. https://instagram.com/..."
          />
        </label>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            ▶️ YouTube URL
          </span>
          <input
            className={modalStyles.modalInput}
            type="url"
            value={profile.youtubeUrl || ''}
            onChange={(e) => updateProfile('youtubeUrl', e.target.value)}
            placeholder="e.g. https://youtube.com/..."
          />
        </label>
      </div>
    </SettingsSection>
  );
}

