import React, { useState } from 'react';
import styles from '../studentProfile.module.css';
import { GRADES_GENERAL_AVERAGE, GRADES_CLASS_RANK } from './mockData';
import { InfoCard } from './SharedComponents';
import { SubjectGradesTable } from './SubjectGradesTable';
import { GradingScale } from './GradingScale';
import { CalendarIcon, InfoIcon } from '@/components/ui/Icons';

export const GradesTab: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('4th Quarter');

  return (
    <div className={styles.gradesGrid}>
      
      {/* Main Content (Left Side) */}
      <div>
        {/* Top Stats */}
        <div className={styles.gradesTopStats}>
          {/* General Average */}
          <InfoCard title="General Average" icon="🎓" iconBg="rgba(182, 142, 255, 0.1)" iconColor="#b68eff">
            <div className={styles.statCardContent}>
              <span className={styles.statCardValue}>{GRADES_GENERAL_AVERAGE.value}</span>
              <span className={styles.statCardDesc} style={{ color: GRADES_GENERAL_AVERAGE.color }}>{GRADES_GENERAL_AVERAGE.descriptiveRating}</span>
              <span className={styles.statCardSubtext}>Equivalent: {GRADES_GENERAL_AVERAGE.equivalent}</span>
            </div>
          </InfoCard>

          {/* Grading Period Selector */}
          <InfoCard title="Grading Period" icon="📅" iconBg="rgba(132, 169, 255, 0.1)" iconColor="#84a9ff">
            <div className={styles.statCardContent}>
              <select 
                className={styles.gradeSelect}
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="1st Quarter">1st Quarter</option>
                <option value="2nd Quarter">2nd Quarter</option>
                <option value="3rd Quarter">3rd Quarter</option>
                <option value="4th Quarter">4th Quarter</option>
              </select>
            </div>
            <div className={styles.gradingPeriodDate}>
              <CalendarIcon />
              Apr 1, 2026 - May 30, 2026
            </div>
          </InfoCard>

          {/* Class Rank */}
          <InfoCard title="Class Rank" icon="🏅" iconBg="rgba(182, 142, 255, 0.1)" iconColor="#b68eff">
            <div className={styles.statCardContent}>
              <span className={styles.statCardValue}>{GRADES_CLASS_RANK.rank}</span>
              <span className={styles.statCardSubtext}>{GRADES_CLASS_RANK.percentile}</span>
            </div>
          </InfoCard>
        </div>

        {/* Subject Grades Table */}
        <SubjectGradesTable />
      </div>

      {/* Sidebar (Right Side) */}
      <div className={styles.sidebarGrid}>
        {/* Grading Scale */}
        <GradingScale />

        {/* Notes */}
        <InfoCard title="Notes" icon="ℹ️" iconBg="rgba(240, 239, 237, 0.1)" iconColor="#f0efed">
          <div className={styles.notesCardContainer}>
            <div className={styles.notesIcon}>
              <InfoIcon />
            </div>
            <span className={styles.notesText}>
              General Average is computed based on the final grades of all subjects for the selected grading period.
            </span>
          </div>
        </InfoCard>
      </div>
      
    </div>
  );
};
