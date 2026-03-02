import React from 'react';

/** Radial gauge for the Dashboard "AI Credits Usage" card */
export const ChalkRadialGauge = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
    <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(240, 239, 237, 0.08)" strokeWidth="8" strokeDasharray="4 4" />
    <circle cx="60" cy="60" r="42" fill="none" stroke="#f5c842" strokeWidth="8" strokeDasharray="65.7 263.89" strokeDashoffset="65.7" strokeLinecap="round" transform="rotate(-90 60 60)" />
  </svg>
);

/** Bar chart for the "New Schools" report */
