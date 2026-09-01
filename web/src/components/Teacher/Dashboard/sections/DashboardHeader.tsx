'use client';
import React from 'react';
import styles from '../dashboard.module.css';
import { useGreeting } from '@/lib/utils/greeting';

interface DashboardHeaderProps {
  shortName: string;
  onAskAi?: () => void;
}

export function DashboardHeader({ shortName, onAskAi }: DashboardHeaderProps) {
  const greeting = useGreeting();
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerText}>
        <h1>{greeting}, {shortName}! 👋</h1>
        <p>Here&apos;s what&apos;s happening in your classes today.</p>
      </div>
    </div>
  );
}

