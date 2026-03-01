import React from 'react';
import type { ParentRecord } from './useParents';
import layoutStyles from '../../shared/layout.module.css';

interface ParentProfileViewProps {
  parent: ParentRecord;
  onBack: () => void;
}

export const ParentProfileView: React.FC<ParentProfileViewProps> = ({ parent, onBack }) => {
  return (
    <div className={layoutStyles.studentsContainer}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'transparent', 
            border: '1px solid rgba(240, 239, 237, 0.2)', 
            color: '#f0efed', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          &larr; Back to Parents
        </button>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>Parent Profile</h1>
      </div>
      
      <div style={{ 
        padding: '3rem', 
        textAlign: 'center', 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: '12px', 
        border: '1px dashed rgba(240,239,237,0.2)' 
      }}>
        <h2>{parent.name}</h2>
        <p style={{ color: 'rgba(240,239,237,0.6)' }}>Detailed view to be implemented later.</p>
      </div>
    </div>
  );
};
