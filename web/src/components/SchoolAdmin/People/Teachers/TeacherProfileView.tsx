import React from 'react';
import styles from '../students.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeacherProfileViewProps {
  teacher: Teacher;
  onBack: () => void;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ teacher, onBack }) => {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', color: '#f0efed', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Teachers
        </button>
        <h2 style={{ color: '#f0efed', margin: 0 }}>{teacher.name}'s Profile</h2>
      </div>
      
      <div style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(240, 239, 237, 0.15)', padding: '2rem', borderRadius: '12px', color: '#f0efed' }}>
        <h3 style={{ marginBottom: '1rem' }}>Teacher Details</h3>
        <p><strong>Employee ID:</strong> {teacher.employeeId}</p>
        <p><strong>Department:</strong> {teacher.department}</p>
        <p><strong>Subjects:</strong> {teacher.subjects}</p>
        <p><strong>Status:</strong> {teacher.status}</p>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
          <p style={{ color: 'rgba(240, 239, 237, 0.5)' }}>Detailed profile tabs (Overview, Classes, Schedule, Evaluations, Documents) will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};
