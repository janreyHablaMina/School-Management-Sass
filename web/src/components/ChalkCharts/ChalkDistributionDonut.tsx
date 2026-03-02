import React from 'react';

/** Donut chart for Student Distribution (2 segments) */
export const ChalkDistributionDonut = ({ total = "24,560", label = "Students", val1 = 52.4, val2 = 47.6, color1 = "#b388ff", color2 = "#ff6b6b" }) => {
  const dash1 = (val1 / 100) * 238.76;
  const dash2 = (val2 / 100) * 238.76;

  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
      <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="12" />
      <circle cx="60" cy="60" r="38" fill="none" stroke={color2} strokeWidth="12" strokeDasharray={`${dash2} 238.76`} strokeDashoffset={`-${dash1}`} strokeLinecap="round" />
      <circle cx="60" cy="60" r="38" fill="none" stroke={color1} strokeWidth="12" strokeDasharray={`${dash1} 238.76`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 60 60)" />
      
      <text x="60" y="58" fill={color1} fontSize="18" fontWeight="700" fontFamily="Caveat, cursive" textAnchor="middle">{total}</text>
      <text x="60" y="72" fill="rgba(240, 239, 237, 0.6)" fontSize="9" fontWeight="500" textAnchor="middle">{label}</text>
    </svg>
  );
};

/** Horizontal bar chart for Student Analytics "Students by Region" */
