"use client";
import React, { useState } from 'react';

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
interface ChalkLineChartProps {
  tooltipDate?: string;
  tooltipText?: string;
}

export const ChalkLineChart = ({ tooltipDate = "MAY 16, 2025", tooltipText = "Total Schools: 24" }: ChalkLineChartProps = {}) => (
  <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    <path d="M 40 120 Q 110 100 180 90 T 320 85 T 410 75 T 480 65" fill="none" stroke="rgba(132, 169, 255, 0.85)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="210" cy="88" r="5" fill="#f5c842" stroke="#08120d" strokeWidth="2" />
    <line x1="210" y1="88" x2="210" y2="150" stroke="rgba(245, 200, 66, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
    <g transform="translate(190, 45)">
      <rect x="0" y="0" width="130" height="36" rx="4" fill="rgba(8, 18, 13, 0.9)" stroke="rgba(240, 239, 237, 0.25)" strokeWidth="1" />
      <text x="12" y="14" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">{tooltipDate}</text>
      <text x="12" y="27" fill="rgba(240, 239, 237, 0.95)" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">{tooltipText}</text>
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

/** Donut chart for the Dashboard "Students by Grade Level" card */
export const ChalkDonutChart = () => {
  const [hoverData, setHoverData] = useState<{ label: string; x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Get mouse position relative to the SVG container
    setHoverData({
      label,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
        <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="10" />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#6633ff" strokeWidth="10" strokeDasharray="40.82 238.76" strokeDashoffset="-197.94" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }} 
          onMouseMove={(e) => handleMouseMove(e, 'Grade 7: 212 Students (17.1%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#3399ff" strokeWidth="10" strokeDasharray="37.96 238.76" strokeDashoffset="-159.98" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 8: 198 Students (15.9%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#33cc66" strokeWidth="10" strokeDasharray="40.35 238.76" strokeDashoffset="-119.63" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 9: 210 Students (16.9%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff9933" strokeWidth="10" strokeDasharray="39.39 238.76" strokeDashoffset="-80.24" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 10: 205 Students (16.5%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff3366" strokeWidth="10" strokeDasharray="42.26 238.76" strokeDashoffset="-37.98" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 11: 220 Students (17.7%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff3399" strokeWidth="10" strokeDasharray="37.98 238.76" strokeDashoffset="0" strokeLinecap="round" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 12: 200 Students (16.1%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <text x="60" y="58" fill="#f5c842" fontSize="20" fontWeight="700" fontFamily="Caveat, cursive" textAnchor="middle">1,245</text>
        <text x="60" y="70" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="700" textAnchor="middle">TOTAL</text>
      </svg>
      {hoverData && (
        <div style={{
          position: 'absolute',
          top: hoverData.y + 15,
          left: hoverData.x,
          transform: 'translateX(-50%)',
          background: 'rgba(8, 18, 13, 0.95)',
          border: '1px solid rgba(240, 239, 237, 0.2)',
          color: '#f0efed',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 10,
          fontFamily: 'Inter, sans-serif'
        }}>
          {hoverData.label}
        </div>
      )}
    </div>
  );
};

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
