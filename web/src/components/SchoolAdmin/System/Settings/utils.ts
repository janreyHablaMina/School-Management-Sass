import type { TeacherProfile } from '@/types/teacherPortal';
import type { TeacherSettingsProfile } from '@/types/teacherSettings';

export function initialsFromName(fullName: string): string {
  const parts = fullName
    .replace(/^Ms\.?\s+/i, '')
    .replace(/^Mr\.?\s+/i, '')
    .replace(/^Mrs\.?\s+/i, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return 'T';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function toTeacherProfile(profile: TeacherSettingsProfile): TeacherProfile {
  return {
    fullName: profile.fullName.trim(),
    shortName: profile.shortName.trim(),
    role: profile.role.trim(),
    initials: initialsFromName(profile.fullName),
  };
}

export function getProfileError(profile: TeacherSettingsProfile): string | null {
  if (!profile.fullName.trim()) return 'Add your full name.';
  if (!profile.shortName.trim()) return 'Add a short display name.';
  if (!profile.email.trim()) return 'Add your email address.';
  if (!profile.email.includes('@')) return 'Enter a valid email address.';
  return null;
}
