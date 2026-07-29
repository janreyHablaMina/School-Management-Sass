import React from 'react';
import styles from '../studentProfile.module.css';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, icon, iconBg, iconColor, children, headerRight }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardHeader} style={headerRight ? { justifyContent: 'space-between' } : {}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {icon && (
            <div className={styles.infoCardIcon} style={{ background: iconBg, color: iconColor }}>
              {icon}
            </div>
          )}
          <span className={styles.infoCardTitle}>{title}</span>
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      {children}
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, fullWidth }) => {
  return (
    <div className={styles.detailRow} style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

interface StatBoxProps {
  label: string;
  value: string;
  subText: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ label, value, subText, icon, iconBg, iconColor }) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.statIcon} style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statVal}>{value}</div>
      <div className={styles.statSub}>{subText}</div>
    </div>
  );
};
