'use client';

import React, { useState } from 'react';
import { listStyles, PageHeader, modalStyles } from '@/components/ui/shared';
import styles from './reports.module.css';

type ReportCategory = 'Academic' | 'Attendance' | 'Financial' | 'Government';

interface ReportTemplate {
  id: string;
  category: ReportCategory;
  title: string;
  description: string;
  format: 'PDF' | 'CSV' | 'Excel';
  icon: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  { id: 'sf1', category: 'Government', title: 'DepEd SF1 - School Register', description: 'Official list of learners per class for the beginning of the school year.', format: 'Excel', icon: '📝' },
  { id: 'sf2', category: 'Government', title: 'DepEd SF2 - Daily Attendance', description: 'Official daily attendance report of learners per month.', format: 'Excel', icon: '📅' },
  { id: 'f137', category: 'Academic', title: 'Form 137 - Permanent Record', description: 'Learner\'s permanent academic record for K-12.', format: 'PDF', icon: '🎓' },
  { id: 'f138', category: 'Academic', title: 'Form 138 - Report Card', description: 'Quarterly academic grades and conduct report for parents.', format: 'PDF', icon: '📊' },
  { id: 'rankings', category: 'Academic', title: 'Class Rankings & Honors', description: 'Top performing students computed based on weighted GPA.', format: 'CSV', icon: '🏆' },
  { id: 'absenteeism', category: 'Attendance', title: 'Chronic Absenteeism', description: 'List of students who have exceeded the tardy or absence threshold.', format: 'CSV', icon: '⚠️' },
  { id: 'revenue', category: 'Financial', title: 'Monthly Revenue Collection', description: 'Breakdown of tuition and miscellaneous fee collections.', format: 'Excel', icon: '💰' },
  { id: 'balances', category: 'Financial', title: 'Outstanding Balances', description: 'List of students with overdue tuition or fee payments.', format: 'CSV', icon: '🧾' },
];

export const ReportsView = () => {
  const [activeCategory, setActiveCategory] = useState<ReportCategory | 'All'>('All');

  const filteredReports = activeCategory === 'All' 
    ? REPORT_TEMPLATES 
    : REPORT_TEMPLATES.filter(r => r.category === activeCategory);

  return (
    <div className={listStyles.page}>
      <PageHeader 
        title="Data Exports & Reports" 
        subtitle="Generate official government forms, academic records, and analytics exports."
      />

      <div className={styles.reportsLayout}>
        {/* Sidebar Filters */}
        <div className={styles.filtersSidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <div className={styles.categoryList}>
              {(['All', 'Government', 'Academic', 'Attendance', 'Financial'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection} style={{ marginTop: '2rem' }}>
            <h3 className={styles.filterTitle}>Global Parameters</h3>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Academic Year</span>
              <select className={modalStyles.modalInput} defaultValue="2025-2026">
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </label>
            <label className={modalStyles.modalField} style={{ marginTop: '1rem' }}>
              <span className={modalStyles.modalLabel}>Term / Quarter</span>
              <select className={modalStyles.modalInput} defaultValue="Q1">
                <option value="Q1">1st Quarter</option>
                <option value="Q2">2nd Quarter</option>
                <option value="Q3">3rd Quarter</option>
                <option value="Q4">4th Quarter</option>
              </select>
            </label>
          </div>
        </div>

        {/* Reports Grid */}
        <div className={styles.reportsGrid}>
          {filteredReports.map(report => (
            <div key={report.id} className={styles.reportCard}>
              <div className={styles.reportHeader}>
                <div className={styles.reportIcon}>{report.icon}</div>
                <span className={`${styles.formatBadge} ${styles['format' + report.format]}`}>
                  {report.format}
                </span>
              </div>
              <h3 className={styles.reportTitle}>{report.title}</h3>
              <p className={styles.reportDesc}>{report.description}</p>
              
              <button type="button" className={listStyles.primaryBtn} style={{ width: '100%', marginTop: 'auto' }}>
                Generate {report.format}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
