export type SchoolSettingsSection =
  | 'School Profile'
  | 'Permissions'
  | 'Billing';

export interface SchoolProfileSettings {
  schoolName: string;
  motto: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  websiteUrl: string;
  principalName: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface PermissionSettings {
  teachersCanEditPastGrades: boolean;
  teachersCanSendSchoolWideAnnouncements: boolean;
  studentsCanViewRankings: boolean;
  requireAdminApprovalForEvents: boolean;
  parentPortalAccess: boolean;
  lockStudentPortalsDuringGrading: boolean;
  studentsCanMessageTeachers: boolean;
  teachersCanCreateSubjects: boolean;
  requireStaff2FA: boolean;
}

export interface BillingSettings {
  planName: string;
  autoReloadAiCredits: boolean;
  billingEmail: string;
  currency: string;
  timezone: string;
  enableSmsNotifications: boolean;
  dataRetentionPolicy: '1 Year' | '3 Years' | '5 Years' | 'Indefinite';
}

export interface SchoolSettingsData {
  profile: SchoolProfileSettings;
  permissions: PermissionSettings;
  billing: BillingSettings;
}
