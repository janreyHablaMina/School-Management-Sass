import React from 'react';
import styles from '../teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeacherProfileHeaderProps {
  teacher: Teacher;
}

const DetailRow = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className={styles.detailRow}>
    <span className={styles.rowLabel}>{label}</span>
    <span className={styles.rowValue}>{value || 'N/A'}</span>
  </div>
);

export const TeacherProfileHeader: React.FC<TeacherProfileHeaderProps> = ({ teacher }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.headerGrid}>
      {/* Avatar Card */}
      <div className={styles.infoCard}>
        <div className={styles.avatarTopHalf}>
          <div className={styles.avatarProfileBlock}>
            <div className={styles.avatarCircle} style={{ borderColor: teacher.departmentColor }}>
              {teacher.avatar ? (
                <img src={teacher.avatar} alt={teacher.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: teacher.departmentColor }}>{getInitials(teacher.name)}</span>
              )}
              <div className={styles.statusDot} style={{ backgroundColor: teacher.status === 'Active' ? '#34d399' : '#f59e0b' }}></div>
            </div>
          </div>
          <div className={styles.nameAndBadge}>
            <h2>{teacher.name}</h2>
            <span className={styles.statusBadge} style={{ backgroundColor: teacher.statusBg, color: teacher.statusColor }}>{teacher.status} Teacher</span>
          </div>
        </div>
        
        <div className={styles.avatarBottomHalf}>
          <div className={styles.avatarMetaGrid}>
            <DetailRow label="Department" value={teacher.department} />
            <DetailRow label="Employee ID" value={teacher.employeeId} />
            <DetailRow label="Position" value={teacher.position} />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className={styles.infoCard}>
        <div className={styles.infoCardHeader}>
          <div className={styles.infoCardIcon}>👤</div>
          <span className={styles.infoCardTitle}>Personal Information</span>
        </div>
        <div className={styles.detailsGrid}>
          <DetailRow label="Date of Birth" value={teacher.dateOfBirth} />
          <DetailRow label="Gender" value={teacher.gender} />
          <DetailRow label="Civil Status" value={teacher.civilStatus} />
          <DetailRow label="Nationality" value={teacher.citizenship} />
          <DetailRow label="Languages" value={teacher.languages} />
        </div>
      </div>

      {/* Employment Information */}
      <div className={styles.infoCard}>
        <div className={styles.infoCardHeader}>
          <div className={styles.infoCardIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>💼</div>
          <span className={styles.infoCardTitle}>Employment Information</span>
        </div>
        <div className={styles.detailsGrid}>
          <DetailRow label="Date Hired" value={teacher.dateHired} />
          <DetailRow label="Employment Type" value={teacher.employmentType} />
          <DetailRow label="Education" value={teacher.highestEducation} />
          <DetailRow label="Specialization" value={teacher.specialization} />
        </div>
      </div>
    </div>
  );
};
