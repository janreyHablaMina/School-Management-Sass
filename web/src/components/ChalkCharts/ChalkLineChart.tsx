"use client";
import React, { useId, useState } from 'react';

interface ChalkLineChartProps {
  tooltipDate?: string;
  tooltipText?: string;
  variant?: 'default' | 'attendance';
}

/** Line chart for the Dashboard "Schools Overview" card */
interface ChalkLineChartProps {
  tooltipDate?: string;
  tooltipText?: string;
  variant?: 'default' | 'attendance';
}

export const ChalkLineChart = ({
  tooltipDate = "MAY 16, 2025",
  tooltipText = "Total Schools: 24",
  variant = 'default',
}: ChalkLineChartProps = {}) => {
  const chartId = useId().replace(/:/g, '');
  const areaId = `chalk-line-area-${chartId}`;
  const strokeId = `chalk-line-stroke-${chartId}`;

  const [hoverData, setHoverData] = useState<{ date: string; value: string; svgX: number; svgY: number } | null>(null);

  if (variant === 'attendance') {
    const pointsData = [
      { x: 52, y: 106, date: 'MON', value: '89.2%' },
      { x: 118, y: 92, date: 'TUE', value: '91.8%' },
      { x: 184, y: 98, date: 'WED', value: '90.5%' },
      { x: 250, y: 76, date: 'THU', value: '94.3%' },
      { x: 316, y: 82, date: 'FRI', value: '93.1%' },
      { x: 382, y: 62, date: 'SAT', value: '96.8%' },
      { x: 448, y: 54, date: 'TODAY', value: '96.4%' },
    ];
    const pointPath = "M 52 106 C 85 106, 85 92, 118 92 C 151 92, 151 98, 184 98 C 217 98, 217 76, 250 76 C 283 76, 283 82, 316 82 C 349 82, 349 62, 382 62 C 415 62, 415 54, 448 54";
    const areaPath = `${pointPath} L 448 150 L 52 150 Z`;

    const handleMouseMove = (date: string, value: string, svgX: number, svgY: number) => {
      setHoverData({ date, value, svgX, svgY });
    };

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseLeave={() => setHoverData(null)}>
        <svg width="100%" height="100%" viewBox="10 0 460 180" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id={areaId} x1="0" y1="48" x2="0" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5c842" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f5c842" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={strokeId} x1="52" y1="0" x2="448" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5c842" />
              <stop offset="100%" stopColor="#ffda75" />
            </linearGradient>
          </defs>

          <rect x="38" y="18" width="430" height="132" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(240, 239, 237, 0.05)" />
          {[35, 65, 95, 125, 150].map((y) => (
            <line key={y} x1="44" y1={y} x2="462" y2={y} stroke="rgba(240, 239, 237, 0.05)" strokeWidth="1" />
          ))}
          {[118, 184, 250, 316, 382, 448].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="150" stroke="rgba(240, 239, 237, 0.035)" strokeWidth="1" />
          ))}

          <path d={areaPath} fill={`url(#${areaId})`} />
          <path d={pointPath} fill="none" stroke={`url(#${strokeId})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {pointsData.map((pt, index) => (
            <g key={index}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={16}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseMove={() => handleMouseMove(pt.date, pt.value, pt.x, pt.y)}
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={index === pointsData.length - 1 ? 4.5 : 3.4}
                fill={index === pointsData.length - 1 ? '#f5c842' : '#08120d'}
                stroke="#f5c842"
                strokeWidth={index === pointsData.length - 1 ? "0" : "2"}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          ))}

          {hoverData && (
            <line x1={hoverData.svgX} y1="0" x2={hoverData.svgX} y2="150" stroke="rgba(240, 239, 237, 0.15)" strokeWidth="1" strokeDasharray="3 4" style={{ pointerEvents: 'none' }} />
          )}

          <g fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700">
            <g fill="rgba(240, 239, 237, 0.48)" textAnchor="end">
              <text x="33" y="38">100%</text>
              <text x="33" y="68">95%</text>
              <text x="33" y="98">90%</text>
              <text x="33" y="128">85%</text>
              <text x="33" y="153">80%</text>
            </g>
            <g fill="rgba(240, 239, 237, 0.52)" textAnchor="middle">
              <text x="52" y="168">Mon</text>
              <text x="118" y="168">Tue</text>
              <text x="184" y="168">Wed</text>
              <text x="250" y="168">Thu</text>
              <text x="316" y="168">Fri</text>
              <text x="382" y="168">Sat</text>
              <text x="448" y="168">Today</text>
            </g>
          </g>
        </svg>

        {hoverData && (
          <div style={{
            position: 'absolute',
            top: `calc(${(hoverData.svgY / 180) * 100}% - 56px)`,
            left: `${((hoverData.svgX - 10) / 460) * 100}%`,
            transform: 'translateX(-50%)',
            background: 'rgba(8, 18, 13, 0.95)',
            border: '1px solid rgba(240, 239, 237, 0.2)',
            padding: '0.5rem 0.8rem',
            borderRadius: '6px',
            pointerEvents: 'none',
            zIndex: 10,
            fontFamily: 'Inter, sans-serif',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(240, 239, 237, 0.48)', marginBottom: '0.2rem' }}>{hoverData.date}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(240, 239, 237, 0.95)' }}>{hoverData.value}</div>
          </div>
        )}
      </div>
    );
  }

  return (
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
};

/** Donut chart for the Dashboard "Students by Grade Level" card */
