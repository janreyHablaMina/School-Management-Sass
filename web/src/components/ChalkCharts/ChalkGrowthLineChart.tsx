import React from 'react';

/** Line chart for Student Analytics "Student Growth Over Time" */
export const ChalkGrowthLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 280" preserveAspectRatio="none" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <defs>
      <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b884ff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#b884ff" stopOpacity="0.0" />
      </linearGradient>
    </defs>
    
    <line x1="40" y1="40" x2="480" y2="40" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="160" x2="480" y2="160" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="220" x2="480" y2="220" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    
    <path d="M 70 220 L 70 110 L 145 95 L 220 85 L 295 80 L 370 70 L 445 60 L 445 220 Z" fill="url(#growthGrad)" />
    <path d="M 70 110 L 145 95 L 220 85 L 295 80 L 370 70 L 445 60" fill="none" stroke="#b884ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    
    <g fill="#b884ff" stroke="#08120d" strokeWidth="2">
      <circle cx="70" cy="110" r="5" />
      <circle cx="145" cy="95" r="5" />
      <circle cx="220" cy="85" r="5" />
      <circle cx="295" cy="80" r="5" />
      <circle cx="370" cy="70" r="5" />
      <circle cx="445" cy="60" r="5" />
    </g>
    
    <g fill="rgba(240, 239, 237, 0.8)" fontSize="10" fontWeight="600" textAnchor="middle">
      <text x="70" y="98">21,350</text>
      <text x="145" y="83">21,980</text>
      <text x="220" y="73">22,650</text>
      <text x="295" y="68">23,120</text>
      <text x="370" y="58">23,760</text>
      <text x="445" y="48">24,560</text>
    </g>
    
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="11" fontWeight="600" textAnchor="middle">
      <text x="70" y="240">Jan</text>
      <text x="145" y="240">Feb</text>
      <text x="220" y="240">Mar</text>
      <text x="295" y="240">Apr</text>
      <text x="370" y="240">May</text>
      <text x="445" y="240">Jun</text>
    </g>
    
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="11" fontWeight="600" textAnchor="end">
      <text x="30" y="44">30K</text>
      <text x="30" y="104">20K</text>
      <text x="30" y="164">10K</text>
      <text x="30" y="224">0</text>
    </g>
  </svg>
);
