import React from 'react';
import styles from '../../teacherProfile.module.css';
import { Table } from '@/components/ui/Table';
import { CheckCircle, BookOpen, Users, Star } from 'lucide-react';
import { teacherClassesData } from '@/lib/mock/teacherOverview.mock';

export const ClassesHandledCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Classes Handled (SY 2025-2026)</h3>
        <a href="#" className={styles.viewAll}>View all classes</a>
      </div>
      
      <Table
        columns={[
          { header: 'Class / Section', accessor: 'class', render: (item) => <span style={{ fontWeight: 500 }}>{item.class}</span> },
          { header: 'Grade Level', accessor: 'grade' },
          { header: 'Students', accessor: 'students' },
          { header: 'Adviser', accessor: 'adviser', render: (item) => item.adviser ? <CheckCircle size={14} color="#34d399" /> : <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>-</span> },
        ]}
        data={teacherClassesData}
        keyExtractor={(item) => item.class}
      />

      <div className={styles.internalMetrics}>
        <div className={styles.internalMetricCard}>
          <div className={styles.internalMetricIcon} style={{ color: '#84a9ff' }}><BookOpen size={20} /></div>
          <div className={styles.internalMetricValue} style={{ color: '#84a9ff' }}>4</div>
          <div className={styles.internalMetricLabel}>Classes</div>
        </div>
        <div className={styles.internalMetricCard}>
          <div className={styles.internalMetricIcon} style={{ color: '#5cc789' }}><Users size={20} /></div>
          <div className={styles.internalMetricValue} style={{ color: '#5cc789' }}>128</div>
          <div className={styles.internalMetricLabel}>Total Students</div>
        </div>
        <div className={styles.internalMetricCard}>
          <div className={styles.internalMetricIcon} style={{ color: '#ff7e93' }}><Star size={20} /></div>
          <div className={styles.internalMetricValue} style={{ color: '#ff7e93' }}>2</div>
          <div className={styles.internalMetricLabel}>Advisory Classes</div>
        </div>
        <div className={styles.internalMetricCard}>
          <div className={styles.internalMetricIcon} style={{ color: '#8b5cf6' }}><CheckCircle size={20} /></div>
          <div className={styles.internalMetricValue} style={{ color: '#8b5cf6' }}>96%</div>
          <div className={styles.internalMetricLabel}>Attendance Rate</div>
        </div>
      </div>
    </div>
  );
};

