import React from 'react';
import styles from './profileShared.module.css';

export interface DetailItem {
  label: string;
  value: string | number | undefined;
}

export interface ProfileCardConfig {
  title: string;
  icon: string | React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  details: DetailItem[];
}

interface GenericProfileHeaderProps {
  name: string;
  avatar?: string;
  initials: string;
  avatarColor?: string;
  status?: string;
  statusBg?: string;
  statusColor?: string;
  badgeLabel: string;
  primaryDetails: DetailItem[];
  personalInfo: ProfileCardConfig;
  employmentInfo: ProfileCardConfig;
}

const DetailRow = ({ label, value }: DetailItem) => (
  <div className={styles.detailRow}>
    <span className={styles.rowLabel}>{label}</span>
    <span className={styles.rowValue}>{value || 'N/A'}</span>
  </div>
);

export const GenericProfileHeader: React.FC<GenericProfileHeaderProps> = ({
  name,
  avatar,
  initials,
  avatarColor,
  status,
  statusBg,
  statusColor,
  badgeLabel,
  primaryDetails,
  personalInfo,
  employmentInfo
}) => {
  return (
    <div className={styles.headerGrid}>
      {/* Avatar Card */}
      <div className={styles.infoCard}>
        <div className={styles.avatarTopHalf}>
          <div className={styles.avatarProfileBlock}>
            <div className={styles.avatarCircle} style={{ borderColor: avatarColor }}>
              {avatar ? (
                <img src={avatar} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: avatarColor }}>{initials}</span>
              )}
              <div className={styles.statusDot} style={{ backgroundColor: status === 'Active' ? '#34d399' : '#f59e0b' }}></div>
            </div>
          </div>
          <div className={styles.nameAndBadge}>
            <h2>{name}</h2>
            <span className={styles.statusBadge} style={{ backgroundColor: statusBg, color: statusColor }}>{badgeLabel}</span>
          </div>
        </div>
        
        <div className={styles.avatarBottomHalf}>
          <div className={styles.avatarMetaGrid}>
            {primaryDetails.map((detail, idx) => (
              <DetailRow key={idx} {...detail} />
            ))}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className={styles.infoCard}>
        <div className={styles.infoCardHeader}>
          <div className={styles.infoCardIcon} style={{ color: personalInfo.iconColor, background: personalInfo.iconBg }}>
            {personalInfo.icon}
          </div>
          <span className={styles.infoCardTitle}>{personalInfo.title}</span>
        </div>
        <div className={styles.detailsGrid}>
          {personalInfo.details.map((detail, idx) => (
            <DetailRow key={idx} {...detail} />
          ))}
        </div>
      </div>

      {/* Employment/School Information */}
      <div className={styles.infoCard}>
        <div className={styles.infoCardHeader}>
          <div className={styles.infoCardIcon} style={{ color: employmentInfo.iconColor, background: employmentInfo.iconBg }}>
            {employmentInfo.icon}
          </div>
          <span className={styles.infoCardTitle}>{employmentInfo.title}</span>
        </div>
        <div className={styles.detailsGrid}>
          {employmentInfo.details.map((detail, idx) => (
            <DetailRow key={idx} {...detail} />
          ))}
        </div>
      </div>
    </div>
  );
};
