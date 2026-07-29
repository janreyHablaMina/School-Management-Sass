import React from 'react';
import styles from '../../studentProfile.module.css';
import { GRADING_SCALE } from '../../../../../../lib/mock/studentProfile.mock';
import { InfoCard } from '../../shared/SharedComponents';

export const GradingScale: React.FC = () => {
  return (
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
  );
};
