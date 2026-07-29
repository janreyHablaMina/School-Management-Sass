import React from 'react';
import styles from '../../studentProfile.module.css';
import { SUBJECT_GRADES } from '../../data/mockData';
import { InfoCard } from '../../shared/SharedComponents';

export const SubjectGradesTable: React.FC = () => {
  return (
    <InfoCard title="Subject Grades" icon="📋" iconBg="rgba(92, 199, 137, 0.1)" iconColor="#5cc789">
      <div className={styles.attendanceTableWrapper} style={{ marginTop: '1rem', width: '100%' }}>
        <table className={styles.attendanceTable} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>TEACHER</th>
              <th>QUARTER 1</th>
              <th>QUARTER 2</th>
              <th>QUARTER 3</th>
              <th>QUARTER 4</th>
              <th>FINAL GRADE</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECT_GRADES.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.subjectCell}>
                    <div className={styles.subjectIcon} style={{ background: item.iconBg, color: item.iconColor }}>{item.icon}</div>
                    <span style={{ fontWeight: 600, color: '#f0efed' }}>{item.subject}</span>
                  </div>
                </td>
                <td><span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.9rem' }}>{item.teacher}</span></td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.q1}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.q2}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.q3}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.q4}</td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: '#f0efed' }}>{item.final}</td>
                <td>
                  <span className={styles.gradeRemarkBadge} style={{ background: `${item.remarkColor}1A`, color: item.remarkColor, border: `1px solid ${item.remarkColor}4D` }}>
                    {item.remarks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooterNote}>
        * Final grade is the average of all quarters.
      </div>
    </InfoCard>
  );
};
