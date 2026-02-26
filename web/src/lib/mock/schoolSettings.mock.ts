import type { SchoolSettingsData } from '@/types/schoolSettings';

export const schoolSettingsMock: SchoolSettingsData = {
  profile: {
    schoolName: 'Eskwelahan Academy',
    motto: 'Excellence in every endeavor.',
    contactEmail: 'admin@eskwelahan.edu.ph',
    contactPhone: '+63 2 8123 4567',
    address: '123 Rizal Avenue, Manila, Philippines',
    websiteUrl: 'https://eskwelahan.edu.ph',
    principalName: 'Dr. Maria Santos',
    facebookUrl: 'https://facebook.com/eskwelahan',
    twitterUrl: 'https://twitter.com/eskwelahan',
    instagramUrl: 'https://instagram.com/eskwelahan',
    youtubeUrl: 'https://youtube.com/eskwelahan',
  },
  permissions: {
    teachersCanEditPastGrades: false,
    teachersCanSendSchoolWideAnnouncements: false,
    studentsCanViewRankings: true,
    requireAdminApprovalForEvents: true,
    parentPortalAccess: true,
    lockStudentPortalsDuringGrading: false,
    studentsCanMessageTeachers: false,
    teachersCanCreateSubjects: false,
    requireStaff2FA: true,
  },
  billing: {
    planName: 'Pro Plan',
    autoReloadAiCredits: true,
    billingEmail: 'finance@eskwelahan.edu.ph',
    currency: 'PHP (₱)',
    timezone: 'Asia/Manila',
    enableSmsNotifications: true,
    dataRetentionPolicy: '5 Years',
  },
};
