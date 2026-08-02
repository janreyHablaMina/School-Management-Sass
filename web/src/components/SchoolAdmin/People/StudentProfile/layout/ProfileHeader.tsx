import React from 'react';
import styles from '../studentProfile.module.css';
import { Student } from '../shared/types';
import { GenericProfileHeader } from '../../shared/GenericProfileHeader';

interface ProfileHeaderProps {
  onBack: () => void;
  student: Student;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onBack, student }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className={styles.breadcrumbs}>
        <span className={styles.breadcrumbLink} onClick={onBack}>Students</span>
        <span>&gt;</span>
        <span className={styles.breadcrumbActive}>Student Profile</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Student Profile</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.backBtn} onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Students
          </button>
          <button className={styles.editBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            Edit Student
          </button>
          <button className={styles.moreBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>

      <GenericProfileHeader
        name={student.name}
        initials={getInitials(student.name)}
        avatarColor={student.avatarColor}
        status={student.status}
        statusBg="rgba(92, 199, 137, 0.1)"
        statusColor="#5cc789"
        badgeLabel={`${student.status} Student`}
        primaryDetails={[
          { label: 'Grade & Section', value: student.gradeSection },
          { label: 'Student ID', value: student.studentId },
          { label: 'LRN', value: '123456789101' }
        ]}
        personalInfo={{
          title: 'Personal Information',
          icon: '👤',
          details: [
            { label: 'Date of Birth', value: 'March 15, 2009' },
            { label: 'Age', value: '16 years old' },
            { label: 'Gender', value: 'Male' },
            { label: 'Nationality', value: 'Filipino' },
            { label: 'Blood Type', value: 'O+' }
          ]
        }}
        employmentInfo={{
          title: 'School Information',
          icon: '🏛️',
          iconBg: 'rgba(92, 199, 137, 0.1)',
          iconColor: '#5cc789',
          details: [
            { label: 'Adviser', value: 'Mrs. Liza Mendoza' },
            { label: 'School Year', value: '2025 - 2026' },
            { label: 'Modality', value: 'Face-to-Face' },
            { label: 'Club', value: 'Science Club' }
          ]
        }}
      />
    </>
  );
};
