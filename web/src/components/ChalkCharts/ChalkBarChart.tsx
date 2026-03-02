import React from 'react';

/** Bar chart for the "New Schools" report */
export const ChalkBarChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    
    <g fill="#84a9ff">
      <rect x="70" y="80" width="30" height="70" rx="4" />
      <text x="85" y="72" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">12</text>
      
      <rect x="145" y="60" width="30" height="90" rx="4" />
      <text x="160" y="52" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">15</text>
      
      <rect x="220" y="50" width="30" height="100" rx="4" />
      <text x="235" y="42" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">18</text>
      
      <rect x="295" y="45" width="30" height="105" rx="4" />
      <text x="310" y="37" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">20</text>
      
      <rect x="370" y="55" width="30" height="95" rx="4" />
      <text x="385" y="47" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">17</text>
      
      <rect x="445" y="35" width="30" height="115" rx="4" />
      <text x="460" y="27" fill="rgba(240, 239, 237, 0.9)" fontSize="12" fontWeight="700" textAnchor="middle">22</text>
    </g>

    <g fill="rgba(240, 239, 237, 0.45)" fontSize="10" fontWeight="600" textAnchor="middle">
      <text x="85" y="165">Jan</text>
      <text x="160" y="165">Feb</text>
      <text x="235" y="165">Mar</text>
      <text x="310" y="165">Apr</text>
      <text x="385" y="165">May</text>
      <text x="460" y="165">Jun</text>
    </g>
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="10" fontWeight="600" textAnchor="end">
      <text x="30" y="34">30</text>
      <text x="30" y="74">20</text>
      <text x="30" y="114">10</text>
      <text x="30" y="154">0</text>
    </g>
  </svg>
);

/** Donut chart for Student Distribution (2 segments) */
