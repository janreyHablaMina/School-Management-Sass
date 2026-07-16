import React from 'react';

/**
 * Invisible SVG filter that applies a subtle "chalk wobble" distortion
 * to elements using `filter: url(#chalk-wobble)`.
 * Render this once at the root of any page that needs it.
 */
export const ChalkFilter = () => (
  <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
    <defs>
      <filter id="chalk-wobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/** Line chart for the Dashboard "Schools Overview" card */
export const ChalkLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    <path d="M 40 120 Q 110 100 180 90 T 320 85 T 410 75 T 480 65" fill="none" stroke="rgba(132, 169, 255, 0.85)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="210" cy="88" r="5" fill="#f5c842" stroke="#08120d" strokeWidth="2" />
    <line x1="210" y1="88" x2="210" y2="150" stroke="rgba(245, 200, 66, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
    <g transform="translate(220, 60)">
      <rect x="0" y="0" width="110" height="32" rx="4" fill="rgba(8, 18, 13, 0.9)" stroke="rgba(240, 239, 237, 0.25)" strokeWidth="1" />
      <text x="8" y="13" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="600">MAY 16, 2025</text>
      <text x="8" y="24" fill="rgba(240, 239, 237, 0.95)" fontSize="9" fontWeight="700">Total Schools: 24</text>
    </g>
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="8" fontWeight="600">
      <text x="35" y="165">May 1</text>
      <text x="110" y="165">May 6</text>
      <text x="190" y="165">May 11</text>
      <text x="270" y="165">May 16</text>
      <text x="350" y="165">May 21</text>
      <text x="420" y="165">May 26</text>
      <text x="470" y="165">May 31</text>
    </g>
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="8" fontWeight="600" textAnchor="end">
      <text x="30" y="33">30</text>
      <text x="30" y="73">20</text>
      <text x="30" y="113">10</text>
      <text x="30" y="153">0</text>
    </g>
  </svg>
);

/** Donut chart for the Dashboard "Subscription Status" card */
export const ChalkDonutChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
    <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="10" />
    <circle cx="60" cy="60" r="38" fill="none" stroke="#e05e5e" strokeWidth="10" strokeDasharray="10 238.76" strokeDashoffset="-228.76" strokeLinecap="round" />
    <circle cx="60" cy="60" r="38" fill="none" stroke="#f5c842" strokeWidth="10" strokeDasharray="10 238.76" strokeDashoffset="-218.76" strokeLinecap="round" />
    <circle cx="60" cy="60" r="38" fill="none" stroke="#8affad" strokeWidth="10" strokeDasharray="218.76 238.76" strokeDashoffset="0" strokeLinecap="round" />
    <text x="60" y="58" fill="#f5c842" fontSize="20" fontWeight="700" fontFamily="Caveat, cursive" textAnchor="middle">24</text>
    <text x="60" y="70" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="700" textAnchor="middle">TOTAL</text>
  </svg>
);

/** Mini area line chart for the Dashboard "Monthly Revenue" card */
export const ChalkMiniLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 90" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <path d="M 10 70 Q 50 60 90 65 T 140 50 T 190 35" fill="none" stroke="rgba(74, 144, 226, 0.85)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="190" cy="35" r="4" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
    <path d="M 10 70 L 50 60 L 90 65 L 140 50 L 190 35 L 190 85 L 10 85 Z" fill="rgba(74, 144, 226, 0.05)" />
  </svg>
);

/** Radial gauge for the Dashboard "AI Credits Usage" card */
export const ChalkRadialGauge = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
    <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(240, 239, 237, 0.08)" strokeWidth="8" strokeDasharray="4 4" />
    <circle cx="60" cy="60" r="42" fill="none" stroke="#f5c842" strokeWidth="8" strokeDasharray="65.7 263.89" strokeDashoffset="65.7" strokeLinecap="round" transform="rotate(-90 60 60)" />
  </svg>
);

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

