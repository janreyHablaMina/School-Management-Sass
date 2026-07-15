import React from 'react';
import styles from './ui.module.css';

export interface BadgeProps {
  variant?: 'green' | 'yellow' | 'purple' | 'gray';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'gray', children, className = '' }) => {
  const variantClass = {
    green: styles.badgeGreen,
    yellow: styles.badgeYellow,
    purple: styles.badgePurple,
    gray: styles.badgeGray,
  }[variant];

  return (
    <span className={`${styles.badgeBase} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};
