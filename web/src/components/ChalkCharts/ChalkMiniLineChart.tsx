import React from 'react';

/** Mini area line chart for the Dashboard "Monthly Revenue" card */
export const ChalkMiniLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 90" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <path d="M 10 70 Q 50 60 90 65 T 140 50 T 190 35" fill="none" stroke="rgba(74, 144, 226, 0.85)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="190" cy="35" r="4" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
    <path d="M 10 70 L 50 60 L 90 65 L 140 50 L 190 35 L 190 85 L 10 85 Z" fill="rgba(74, 144, 226, 0.05)" />
  </svg>
);

/** Radial gauge for the Dashboard "AI Credits Usage" card */
