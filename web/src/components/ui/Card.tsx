import React from 'react';
import styles from './ui.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div className={`${styles.cardBase} ${className}`} style={style}>
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, description, children, className = '' }) => {
  return (
    <div className={`${styles.cardHeader} ${className}`}>
      {title && (
        <h3 className={styles.cardTitle}>
          {title}
        </h3>
      )}
      {description && (
        <p className={styles.cardDesc}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.cardBody} ${className}`}>
      {children}
    </div>
  );
};
