export type SchoolSettingsSection =
  | 'School Profile'
  | 'Academics'
  | 'Permissions'
  | 'Billing';

export interface SchoolProfileSettings {
  schoolName: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  motto: string;
  logoUrl?: string;
}

export interface AcademicSettings {
  academicYear: string;
  gradingSystem: 'Numerical (1-100)' | 'Letter (A-F)';
  termStructure: 'Quarters' | 'Semesters' | 'Trimesters';
}

export interface PermissionSettings {
  teachersCanEditPastGrades: boolean;
  teachersCanSendSchoolWideAnnouncements: boolean;
  studentsCanViewRankings: boolean;
  requireAdminApprovalForEvents: boolean;
}

export interface BillingSettings {
  planName: string;
  autoReloadAiCredits: boolean;
  billingEmail: string;
}

export interface SchoolSettingsData {
  profile: SchoolProfileSettings;
  academics: AcademicSettings;
  permissions: PermissionSettings;
  billing: BillingSettings;
}

