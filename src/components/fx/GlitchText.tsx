'use client';

import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className = '',
  as: Tag = 'span',
}) => {
  return <Tag className={`glitch-hover inline-block ${className}`}>{children}</Tag>;
};
