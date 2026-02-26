import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsToggle } from './SettingsToggle';
import { PERMISSION_ITEMS } from '../settingsMeta';
import { PermissionSettings } from '@/types/schoolSettings';
import styles from '../settings.module.css';

interface PermissionsTabProps {
  permissions: PermissionSettings;
  updatePermissions: <K extends keyof PermissionSettings>(key: K, value: PermissionSettings[K]) => void;
}

export function PermissionsTab({ permissions, updatePermissions }: PermissionsTabProps) {
  return (
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
  );
}

