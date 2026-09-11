'use client';

import React from 'react';
import { useGreeting } from '@/lib/utils/greeting';
import styles from './dashboardHeader.module.css';

interface DashboardHeaderProps {
  name: string;
  description: string;
}

export function DashboardHeader({ name, description }: DashboardHeaderProps) {
  const greeting = useGreeting();

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerText}>
        <h1>{greeting}, {name}! 👋</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
