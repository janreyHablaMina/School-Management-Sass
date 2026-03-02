import React from 'react';

/** Horizontal bar chart for Student Analytics "Students by Region" */
export const ChalkHorizontalBarChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 280" preserveAspectRatio="none" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    {/* Background guides */}
    <line x1="120" y1="20" x2="120" y2="260" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" />
    <line x1="220" y1="20" x2="220" y2="260" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="320" y1="20" x2="320" y2="260" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="420" y1="20" x2="420" y2="260" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
    
    <g fill="rgba(240, 239, 237, 0.85)" fontSize="12" fontWeight="500" textAnchor="end">
      <text x="110" y="45">Central Luzon</text>
      <text x="110" y="85">NCR</text>
      <text x="110" y="125">CALABARZON</text>
      <text x="110" y="165">Ilocos Region</text>
      <text x="110" y="205">Bicol Region</text>
      <text x="110" y="245">Other Regions</text>
    </g>

    <g fill="#b884ff">
      <rect x="120" y="32" width="340" height="18" rx="2" />
      <rect x="120" y="72" width="240" height="18" rx="2" />
      <rect x="120" y="112" width="200" height="18" rx="2" />
      <rect x="120" y="152" width="100" height="18" rx="2" />
      <rect x="120" y="192" width="85" height="18" rx="2" />
      <rect x="120" y="232" width="175" height="18" rx="2" />
    </g>
    
    <g fill="rgba(240, 239, 237, 0.6)" fontSize="11" fontWeight="600">
      <text x="468" y="45">7,250</text>
      <text x="368" y="85">5,120</text>
      <text x="328" y="125">4,320</text>
      <text x="228" y="165">2,150</text>
      <text x="213" y="205">1,890</text>
      <text x="303" y="245">3,830</text>
    </g>
  </svg>
);

/** Line chart for Student Analytics "Student Growth Over Time" */
