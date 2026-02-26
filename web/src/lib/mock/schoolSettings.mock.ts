import type { SchoolSettingsData } from '@/types/schoolSettings';

export const schoolSettingsMock: SchoolSettingsData = {
  profile: {
    schoolName: 'Eskwelahan Academy',
    address: '123 Education Blvd, Metro Manila',
    contactEmail: 'admin@eskwelahan.edu.ph',
    contactPhone: '+63 2 8123 4567',
    motto: 'Excellence in Learning',
    logoUrl: 'https://i.pravatar.cc/150?u=school',
  },
  academics: {
    academicYear: '2025-2026',
    gradingSystem: 'Numerical (1-100)',
    termStructure: 'Quarters',
  },
  permissions: {
    teachersCanEditPastGrades: false,
    teachersCanSendSchoolWideAnnouncements: false,
    studentsCanViewRankings: true,
    requireAdminApprovalForEvents: true,
  },
  billing: {
    planName: 'Pro Plan',
    autoReloadAiCredits: true,
    billingEmail: 'finance@eskwelahan.edu.ph',
  },
};

