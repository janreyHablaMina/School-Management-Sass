export type SchoolSettingsSection =
  | 'School Profile'
  | 'Academics'
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
  accentColor: string;
}

export interface AcademicSettings {
  academicYear: string;
  gradingSystem: 'Numerical (1-100)' | 'Letter (A-F)';
  termStructure: 'Quarters' | 'Semesters' | 'Trimesters';
  passingGrade: string;
  schoolLevels: string[];
  classSizeLimit: string;
  scheduleType: 'Traditional' | 'Block Scheduling';
  attendanceTracking: 'Once Daily' | 'Per Subject';
  lateWorkPenalty: string;
  tardyThresholdMinutes: string;
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
  academics: AcademicSettings;
  permissions: PermissionSettings;
  billing: BillingSettings;
}

