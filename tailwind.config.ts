import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/fx/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/mascot/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/chat/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        cyan: {
          sys: 'var(--accent-primary)',
        },
        magenta: {
          sys: 'var(--accent-secondary)',
        },
        amber: {
          sys: 'var(--accent-alert)',
        },
        border: {
          sys: 'var(--border-sys)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        jp: ['var(--font-jp)', 'sans-serif'],
      },
      boxShadow: {
        'sys-cyan': '0 0 0 1px rgba(0, 229, 255, 0.55), 0 0 16px rgba(0, 229, 255, 0.18)',
        'sys-magenta': '0 0 0 1px rgba(255, 43, 214, 0.55), 0 0 16px rgba(255, 43, 214, 0.18)',
        'sys-amber': '0 0 0 1px rgba(255, 179, 0, 0.6), 0 0 16px rgba(255, 179, 0, 0.2)',
        'manga-hard': '6px 6px 0px #000000',
        'manga-cyan': '6px 6px 0px var(--accent-primary)',
        'manga-magenta': '6px 6px 0px var(--accent-secondary)',
      },
      keyframes: {
        'scan-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'glitch-skew': {
          '0%, 100%': { transform: 'translate(0, 0) skew(0deg)' },
          '20%': { transform: 'translate(-2px, 1px) skew(-2deg)' },
          '40%': { transform: 'translate(2px, -1px) skew(2deg)' },
          '60%': { transform: 'translate(-1px, 0px) skew(-1deg)' },
          '80%': { transform: 'translate(1px, 1px) skew(1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'scan-drift': 'scan-drift 8s linear infinite',
        'glitch-skew': 'glitch-skew 0.35s steps(2, end) infinite',
        'float-slow': 'float-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
