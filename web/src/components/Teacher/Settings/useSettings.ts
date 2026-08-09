'use client';

import { useMemo, useState } from 'react';
import { teacherSettingsMock } from '@/lib/mock/teacherSettings.mock';
import type { TeacherProfile } from '@/types/teacherPortal';
import type {
  AppearanceSettings,
  NotificationSettings,
  PreferenceSettings,
  SettingsSection,
  TeacherSettingsProfile,
} from '@/types/teacherSettings';
import { SECTION_META } from './settingsMeta';
import { getProfileError, toTeacherProfile } from './utils';

interface UseSettingsOptions {
  onProfileSave?: (profile: TeacherProfile) => void;
}

function snapshotOf(
  profile: TeacherSettingsProfile,
  notifications: NotificationSettings,
  preferences: PreferenceSettings,
  appearance: AppearanceSettings,
) {
  return JSON.stringify({ profile, notifications, preferences, appearance });
}

export function useSettings({ onProfileSave }: UseSettingsOptions = {}) {
  const seed = teacherSettingsMock;

  const [section, setSection] = useState<SettingsSection>('Profile');
  const [profile, setProfile] = useState<TeacherSettingsProfile>(seed.profile);
  const [notifications, setNotifications] = useState<NotificationSettings>(seed.notifications);
  const [preferences, setPreferences] = useState<PreferenceSettings>(seed.preferences);
  const [appearance, setAppearance] = useState<AppearanceSettings>(seed.appearance);
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    snapshotOf(seed.profile, seed.notifications, seed.preferences, seed.appearance),
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const isDirty = useMemo(
    () =>
      snapshotOf(profile, notifications, preferences, appearance) !== savedSnapshot,
    [appearance, notifications, preferences, profile, savedSnapshot],
  );

  const markDirty = () => {
    setSaveMessage(null);
    setError(null);
  };

  const updateProfile = <K extends keyof TeacherSettingsProfile>(
    key: K,
    value: TeacherSettingsProfile[K],
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updateNotification = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K],
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updatePreference = <K extends keyof PreferenceSettings>(
    key: K,
    value: PreferenceSettings[K],
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const updateAppearance = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K],
  ) => {
    setAppearance((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const saveChanges = () => {
    const profileError = getProfileError(profile);
    if (profileError) {
      setError(profileError);
      setSection('Profile');
      setSaveMessage(null);
      return;
    }

    onProfileSave?.(toTeacherProfile(profile));
    setSavedSnapshot(snapshotOf(profile, notifications, preferences, appearance));
    setError(null);
    setSaveMessage('Settings saved for this session.');
  };

  return {
    sections: SECTION_META.map((item) => item.id),
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
    classroomOptions: seed.classroomOptions,
    landingTabOptions: seed.landingTabOptions,
    saveChanges,
    saveMessage,
    error,
    isDirty,
    isPasswordOpen,
    openPassword: () => setIsPasswordOpen(true),
    closePassword: () => setIsPasswordOpen(false),
    markPasswordUpdated: () => {
      setIsPasswordOpen(false);
      setError(null);
      setSaveMessage('Password updated for this session.');
    },
  };
}
