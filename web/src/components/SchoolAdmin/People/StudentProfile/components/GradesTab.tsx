import React, { useState } from 'react';
import styles from '../studentProfile.module.css';
import { GRADES_GENERAL_AVERAGE, GRADES_CLASS_RANK, SUBJECT_GRADES, GRADING_SCALE } from './mockData';
import { InfoCard } from './SharedComponents';

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f0efed' }}>{GRADES_GENERAL_AVERAGE.value}</span>
              <span style={{ fontSize: '0.9rem', color: GRADES_GENERAL_AVERAGE.color, fontWeight: 600 }}>{GRADES_GENERAL_AVERAGE.descriptiveRating}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.5)', marginTop: '0.2rem' }}>Equivalent: {GRADES_GENERAL_AVERAGE.equivalent}</span>
            </div>
          </InfoCard>

          {/* Grading Period Selector */}
          <InfoCard title="Grading Period" icon="📅" iconBg="rgba(132, 169, 255, 0.1)" iconColor="#84a9ff">
            <div style={{ marginTop: '0.5rem', position: 'relative' }}>
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
              <div style={{ position: 'absolute', right: '1rem', top: '1.2rem', pointerEvents: 'none', color: 'rgba(240, 239, 237, 0.5)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Apr 1, 2026 - May 30, 2026
            </div>
          </InfoCard>

          {/* Class Rank */}
          <InfoCard title="Class Rank" icon="🏅" iconBg="rgba(182, 142, 255, 0.1)" iconColor="#b68eff">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f0efed' }}>{GRADES_CLASS_RANK.rank}</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.5)' }}>{GRADES_CLASS_RANK.percentile}</span>
            </div>
          </InfoCard>
        </div>

        {/* Subject Grades Table */}
        <InfoCard title="Subject Grades" icon="📋" iconBg="rgba(92, 199, 137, 0.1)" iconColor="#5cc789">
          <div className={styles.tableContainer} style={{ marginTop: '1rem' }}>
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
          <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)', marginTop: '1.5rem', fontStyle: 'italic' }}>
            * Final grade is the average of all quarters.
          </div>
        </InfoCard>
      </div>

      {/* Sidebar (Right Side) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Grading Scale */}
        <InfoCard title="Grading Scale" icon="📏" iconBg="rgba(245, 200, 66, 0.1)" iconColor="#f5c842">
          <table className={styles.gradingScaleTable}>
            <thead>
              <tr>
                <th>RANGE</th>
                <th>DESCRIPTIVE RATING</th>
                <th style={{ textAlign: 'right' }}>EQUIVALENT</th>
              </tr>
            </thead>
            <tbody>
              {GRADING_SCALE.map((scale, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600 }}>{scale.range}</td>
                  <td style={{ color: scale.color, fontWeight: 600 }}>{scale.rating}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{scale.equivalent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfoCard>

        {/* Notes */}
        <InfoCard title="Notes" icon="ℹ️" iconBg="rgba(240, 239, 237, 0.1)" iconColor="#f0efed">
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem', alignItems: 'flex-start', background: 'rgba(182, 142, 255, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(182, 142, 255, 0.1)' }}>
            <div style={{ color: '#b68eff', marginTop: '2px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.8)', lineHeight: 1.5 }}>
              General Average is computed based on the final grades of all subjects for the selected grading period.
            </span>
          </div>
        </InfoCard>

      </div>
      
    </div>
  );
};
