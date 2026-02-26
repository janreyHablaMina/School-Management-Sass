import type { SchoolSettingsSection, PermissionSettings } from '@/types/schoolSettings';

export const SECTION_META: Array<{
  id: SchoolSettingsSection;
  icon: string;
  hint: string;
}> = [
  { id: 'School Profile', icon: '🏫', hint: 'Name, logo & contact' },
  { id: 'Academics', icon: '📚', hint: 'Years, terms & grading' },
  { id: 'Permissions', icon: '🛡️', hint: 'Access & defaults' },
  { id: 'Billing', icon: '💳', hint: 'Eskwelahan+ Sub' },
];

export const PERMISSION_ITEMS: Array<{
  key: keyof PermissionSettings;
  label: string;
  hint: string;
}> = [
  {
    key: 'teachersCanEditPastGrades',
    label: 'Allow Teachers to Edit Past Grades',
    hint: 'If enabled, teachers can change grades after submission deadline.',
  },
  {
    key: 'teachersCanSendSchoolWideAnnouncements',
    label: 'Allow School-Wide Announcements',
    hint: 'Let teachers post announcements to everyone, not just their classes.',
  },
  {
    key: 'studentsCanViewRankings',
    label: 'Show Class Rankings to Students',
    hint: 'Students will see their position relative to peers.',
  },
  {
    key: 'requireAdminApprovalForEvents',
    label: 'Require Admin Approval for Events',
    hint: 'Calendar events created by teachers must be approved before publishing.',
  },
];
