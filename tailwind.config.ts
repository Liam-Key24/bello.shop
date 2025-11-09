<<<<<<< HEAD
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        melodrama: ['Melodrama', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#6B46C1',
        frostyGreen: '#DAE7DA'
      },
      borderRadius: {
      '4xl': '30px', // new custom radius
    },
    width:{
      '87.5':'350px',
      '41.5': '166px'
    },
    height:{
      '105': '105px'
    },
      glass: {
        base: {
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // raised to whitish
          backdropFilter: 'blur(35px) saturate(220%) contrast(130%)',
          WebkitBackdropFilter: 'blur(35px) saturate(220%) contrast(130%)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '2rem',
          boxShadow:
            '0 0 20px rgba(255,255,255,0.05), 0 8px 40px rgba(255,255,255,0.1)',
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
        },
        hover: {
          backgroundColor: 'rgba(245, 248, 250, 0.5)', // soft whitish hover
          transform: 'scale(1.06)',
          boxShadow:
            '0 0 40px rgba(255,255,255,0.1), 0 12px 60px rgba(255,255,255,0.15)',
        },
        transition: 'all 0.45s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const glass = theme('extend.glass');

      addComponents({
        '.glass': {
          backgroundColor: glass.base.backgroundColor,
          backdropFilter: glass.base.backdropFilter,
          WebkitBackdropFilter: glass.base.WebkitBackdropFilter,
          border: glass.base.border,
          borderRadius: glass.base.borderRadius,
          boxShadow: glass.base.boxShadow,
          backgroundImage: glass.base.backgroundImage,
          transition: glass.transition,
          '&:hover': {
            backgroundColor: glass.hover.backgroundColor,
            transform: glass.hover.transform,
            boxShadow: glass.hover.boxShadow,
          },
        },
      });
    }),
  ],
};

export default config;
=======
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-300": "#84a98c",
        "green-200": "#C2CFB2",
        "green-100": "#F5F7F2",
        
      },
    },
  },
  plugins: [],
} satisfies Config;
>>>>>>> cb9934181149c94b2473164d18cb78c6ba4dd622
