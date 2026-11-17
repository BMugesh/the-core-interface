'use client';

import React from 'react';

interface HalftoneProps {
  className?: string;
  dense?: boolean;
  opacity?: number;
}

export const Halftone: React.FC<HalftoneProps> = ({
  className = '',
  dense = false,
  opacity = 0.25,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${
        dense ? 'halftone-dense' : 'halftone-bg'
      } ${className}`}
      style={{ opacity }}
    />
  );
};
