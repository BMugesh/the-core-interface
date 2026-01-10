import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Lab-specific colors
        void: {
          DEFAULT: "hsl(var(--void))",
          deep: "hsl(var(--void-deep))",
        },
        neon: {
          cyan: "hsl(var(--neon-cyan))",
          "cyan-glow": "hsl(var(--neon-cyan-glow))",
          amber: "hsl(var(--neon-amber))",
          "amber-glow": "hsl(var(--neon-amber-glow))",
        },
        steel: {
          DEFAULT: "hsl(var(--steel))",
          light: "hsl(var(--steel-light))",
        },
        hud: {
          line: "hsl(var(--hud-line))",
          text: "hsl(var(--hud-text))",
        },
        signal: {
          green: "hsl(var(--signal-green))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "hud-scan": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "ring-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--neon-cyan) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--neon-cyan) / 0.6)" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hud-scan": "hud-scan 2s ease-in-out infinite",
        "data-stream": "data-stream 3s linear infinite",
        "ring-pulse": "ring-pulse 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-reveal": "text-reveal 0.8s ease-out forwards",
        "line-draw": "line-draw 2s ease-out forwards",
        orbit: "orbit 20s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "sci-fi-dark": {
          "primary": "#00d4ff", // arc-reactor blue
          "secondary": "#ffd700", // mystic gold
          "accent": "#00d4ff",
          "neutral": "#1a1a1a", // deep charcoal
          "base-100": "#0a0a0a", // deep black
          "base-200": "#1a1a1a",
          "base-300": "#2a2a2a",
          "base-content": "#ffffff",
          "info": "#00d4ff",
          "success": "#00ff88",
          "warning": "#ffd700",
          "error": "#ff4444",
        },
      },
    ],
    darkTheme: "sci-fi-dark",
  },
} satisfies Config;
