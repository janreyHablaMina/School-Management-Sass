"use client";
import React, { useId, useState } from 'react';

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
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="10" />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#6633ff" strokeWidth="10" strokeDasharray="40.82 238.76" strokeDashoffset="-197.94" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }} 
          onMouseMove={(e) => handleMouseMove(e, 'Grade 7: 212 Students (17.1%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#3399ff" strokeWidth="10" strokeDasharray="37.96 238.76" strokeDashoffset="-159.98" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 8: 198 Students (15.9%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#33cc66" strokeWidth="10" strokeDasharray="40.35 238.76" strokeDashoffset="-119.63" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 9: 210 Students (16.9%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff9933" strokeWidth="10" strokeDasharray="39.39 238.76" strokeDashoffset="-80.24" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 10: 205 Students (16.5%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff3366" strokeWidth="10" strokeDasharray="42.26 238.76" strokeDashoffset="-37.98" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 11: 220 Students (17.7%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="#ff3399" strokeWidth="10" strokeDasharray="37.98 238.76" strokeDashoffset="0" strokeLinecap="butt" style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
          onMouseMove={(e) => handleMouseMove(e, 'Grade 12: 200 Students (16.1%)')}
          onMouseEnter={(e) => e.currentTarget.style.strokeWidth = '13'}
          onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = '10'; setHoverData(null); }}
        />
        <text x="60" y="56" fill="#f5c842" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif" textAnchor="middle">1,245</text>
        <text x="60" y="70" fill="rgba(240, 239, 237, 0.42)" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">TOTAL</text>
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
