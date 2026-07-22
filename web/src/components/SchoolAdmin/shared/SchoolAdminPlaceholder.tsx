import React from 'react';

interface SchoolAdminPlaceholderProps {
  title: string;
}

export const SchoolAdminPlaceholder: React.FC<SchoolAdminPlaceholderProps> = ({ title }) => {
  return (
    <div style={{
      border: '2.2px solid rgba(240, 239, 237, 0.45)',
      borderRadius: '12px 14px 10px 13px / 14px 10px 13px 10px',
      padding: '2.5rem',
      background: 'rgba(10, 25, 17, 0.2)',
      transform: 'rotate(-0.5deg)',
      marginTop: '2rem',
      textAlign: 'center'
    }}>
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2.4rem', color: '#f5c842', margin: 0 }}>
        🏫 {title}
      </h2>
      <p style={{ fontSize: '1rem', color: 'rgba(240, 239, 237, 0.65)', maxWidth: '500px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
        This module is currently under construction. Please check back later!
      </p>
    </div>
  );
};
