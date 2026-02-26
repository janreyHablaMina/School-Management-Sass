import type { SchoolSettingsSection, PermissionSettings } from '@/types/schoolSettings';

export const SECTION_META: Array<{
  id: SchoolSettingsSection;
  icon: string;
  hint: string;
}> = [
  { id: 'School Profile', icon: '🏫', hint: 'Name, logo & contact' },
  { id: 'Permissions', icon: '🛡️', hint: 'Access & defaults' },
  { id: 'Billing', icon: '💳', hint: 'Billing & System' },
];

export const PERMISSION_ITEMS: Array<{
  key: keyof PermissionSettings;
  label: string;
  hint: string;
}> = [
  {
    key: 'lockStudentPortalsDuringGrading',
    label: 'Lock Student Portals During Grading',
    hint: 'Temporarily disable student access to prevent seeing grades while teachers are finalizing them.',
  },
  {
    key: 'studentsCanMessageTeachers',
    label: 'Allow Direct Messaging',
    hint: 'Let students message teachers directly through the platform.',
  },
  {
    key: 'teachersCanCreateSubjects',
    label: 'Teachers Can Create Subjects',
    hint: 'Allow teachers to add their own custom subjects without admin approval.',
  },
  {
    key: 'requireStaff2FA',
    label: 'Require Staff 2FA',
    hint: 'Mandate Two-Factor Authentication for all admin and teacher accounts.',
  },
  {
    key: 'parentPortalAccess',
    label: 'Enable Parent Portal',
    hint: 'Allow parents to securely log in and view their child\'s progress.',
  },
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
