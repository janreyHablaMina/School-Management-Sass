/** Barrel re-exports — prefer importing from studentForm / studentDisplay directly. */
export {
  applyStudentFormInput,
  buildStudentFromInput,
  emptyGuardianInput,
  emptyStudentFormValues,
  getStudentFormStepError,
  gradeLevelFromClassLabel,
  initialsFromName,
  readStudentPhotoFile,
  STUDENT_EDIT_STEPS,
  STUDENT_PHOTO_ACCEPT,
  STUDENT_PHOTO_MAX_BYTES,
  studentToFormValues,
  type StudentEditStep,
} from './studentForm';

export {
  attendanceBarColor,
  buildStudentActivity,
  letterGradeAccent,
  primaryGuardian,
  statusAccent,
  toStudentClassFocus,
  toStudentGradesNav,
  type StudentActivityItem,
} from './studentDisplay';
