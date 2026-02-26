import React from 'react';
import styles from '../../teacherProfile.module.css';
import { Table } from '@/components/ui/Table';
import { teacherSubjectsData } from '@/lib/mock/teacherOverview.mock';

export const SubjectsHandledCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Subjects Handled</h3>
        <a href="#" className={styles.viewAll}>View all subjects</a>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Table
            columns={[
              { header: 'Subject', accessor: 'subject', render: (item) => <span style={{ fontWeight: 500 }}>{item.subject}</span> },
              { header: 'Grade Level', accessor: 'grade' },
              { header: 'Periods/Week', accessor: 'periods' },
              { header: 'Total Students', accessor: 'students' },
            ]}
            data={teacherSubjectsData}
            keyExtractor={(item) => item.subject}
          />
        </div>
        <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Periods/Week</span>
          <div className={styles.subjectsChart}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: 'conic-gradient(#8b5cf6 0% 40%, #5cc789 40% 70%, #ffab6b 70% 90%, #84a9ff 90% 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 10px rgba(0,0,0,0.2)'
            }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#1c1c1c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Caveat, cursive' }}>16</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Periods</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

