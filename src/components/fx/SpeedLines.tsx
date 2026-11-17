'use client';

import React from 'react';

interface SpeedLinesProps {
  className?: string;
  opacity?: number;
}

export const SpeedLines: React.FC<SpeedLinesProps> = ({ className = '', opacity = 0.6 }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 speedlines-bg ${className}`}
      style={{ opacity }}
    />
  );
};
