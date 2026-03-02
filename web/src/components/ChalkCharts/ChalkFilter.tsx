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
interface ChalkLineChartProps {
  tooltipDate?: string;
  tooltipText?: string;
  variant?: 'default' | 'attendance';
}
