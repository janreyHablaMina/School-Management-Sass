'use client';

import { useMemo, useState } from 'react';
import { schoolSettingsMock } from '@/lib/mock/schoolSettings.mock';
import type {
  SchoolSettingsData,
  SchoolProfileSettings,
  AcademicSettings,
  PermissionSettings,
  BillingSettings,
  SchoolSettingsSection,
} from '@/types/schoolSettings';

function snapshotOf(data: SchoolSettingsData) {
  return JSON.stringify(data);
}

export function useSettings() {
  const seed = schoolSettingsMock;

  const [section, setSection] = useState<SchoolSettingsSection>('School Profile');
  
  const [profile, setProfile] = useState<SchoolProfileSettings>(seed.profile);
  const [academics, setAcademics] = useState<AcademicSettings>(seed.academics);
  const [permissions, setPermissions] = useState<PermissionSettings>(seed.permissions);
  const [billing, setBilling] = useState<BillingSettings>(seed.billing);
  
  const [savedSnapshot, setSavedSnapshot] = useState(() => snapshotOf(seed));
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const isDirty = useMemo(
    () => snapshotOf({ profile, academics, permissions, billing }) !== savedSnapshot,
    [profile, academics, permissions, billing, savedSnapshot],
  );

  const markDirty = () => {
    setSaveMessage(null);
  };

  const updateProfile = <K extends keyof SchoolProfileSettings>(key: K, value: SchoolProfileSettings[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updateAcademics = <K extends keyof AcademicSettings>(key: K, value: AcademicSettings[K]) => {
    setAcademics((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updatePermissions = <K extends keyof PermissionSettings>(key: K, value: PermissionSettings[K]) => {
    setPermissions((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updateBilling = <K extends keyof BillingSettings>(key: K, value: BillingSettings[K]) => {
    setBilling((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const saveChanges = () => {
    setSavedSnapshot(snapshotOf({ profile, academics, permissions, billing }));
    setSaveMessage('School settings saved for this session.');
  };

  return {
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
  };
}
