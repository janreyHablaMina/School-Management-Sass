import React from 'react';
import { EmptyState, listStyles } from '@/components/ui/shared';

interface GradesDetailViewProps {
  gradeId: string;
  onBack: () => void;
}

export const GradesDetailView: React.FC<GradesDetailViewProps> = ({ gradeId, onBack }) => {
  return (
    <div className={listStyles.container}>
      <div className={listStyles.header}>
        <div>
          <button type="button" onClick={onBack} className={listStyles.backButton} style={{ background: 'transparent', border: 'none', color: '#84a9ff', cursor: 'pointer', padding: 0, marginBottom: '8px' }}>
            ← Back to Grades
          </button>
          <h1 className={listStyles.title}>Gradebook Details</h1>
          <p className={listStyles.subtitle}>Viewing grades for class ID: {gradeId}</p>
        </div>
      </div>
      
      <EmptyState
        title="Gradebook Details In Progress"
        description="The detailed view for this class's gradebook is currently under development."
      />
    </div>
  );
};
