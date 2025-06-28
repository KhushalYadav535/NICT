/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1e40af', // blue-800
        'primary-50': '#eff6ff', // blue-50
        'primary-100': '#dbeafe', // blue-100
        'primary-200': '#bfdbfe', // blue-200
        'primary-300': '#93c5fd', // blue-300
        'primary-400': '#60a5fa', // blue-400
        'primary-500': '#3b82f6', // blue-500
        'primary-600': '#2563eb', // blue-600
        'primary-700': '#1d4ed8', // blue-700
        'primary-800': '#1e40af', // blue-800
        'primary-900': '#1e3a8a', // blue-900
        'primary-foreground': '#ffffff', // white

        // Secondary Colors
        'secondary': '#0f766e', // teal-700
        'secondary-50': '#f0fdfa', // teal-50
        'secondary-100': '#ccfbf1', // teal-100
        'secondary-200': '#99f6e4', // teal-200
        'secondary-300': '#5eead4', // teal-300
        'secondary-400': '#2dd4bf', // teal-400
        'secondary-500': '#14b8a6', // teal-500
        'secondary-600': '#0d9488', // teal-600
        'secondary-700': '#0f766e', // teal-700
        'secondary-800': '#115e59', // teal-800
        'secondary-900': '#134e4a', // teal-900
        'secondary-foreground': '#ffffff', // white

        // Accent Colors
        'accent': '#ea580c', // orange-600
        'accent-50': '#fff7ed', // orange-50
        'accent-100': '#ffedd5', // orange-100
        'accent-200': '#fed7aa', // orange-200
        'accent-300': '#fdba74', // orange-300
        'accent-400': '#fb923c', // orange-400
        'accent-500': '#f97316', // orange-500
        'accent-600': '#ea580c', // orange-600
        'accent-700': '#c2410c', // orange-700
        'accent-800': '#9a3412', // orange-800
        'accent-900': '#7c2d12', // orange-900
        'accent-foreground': '#ffffff', // white

        // Background Colors
        'background': '#fafafa', // gray-50
        'surface': '#ffffff', // white
        'surface-secondary': '#f9fafb', // gray-50

        // Text Colors
        'text-primary': '#1f2937', // gray-800
        'text-secondary': '#6b7280', // gray-500
        'text-muted': '#9ca3af', // gray-400
        'text-inverse': '#ffffff', // white

        // Status Colors
        'success': '#059669', // emerald-600
        'success-50': '#ecfdf5', // emerald-50
        'success-100': '#d1fae5', // emerald-100
        'success-200': '#a7f3d0', // emerald-200
        'success-300': '#6ee7b7', // emerald-300
        'success-400': '#34d399', // emerald-400
        'success-500': '#10b981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065f46', // emerald-800
        'success-900': '#064e3b', // emerald-900
        'success-foreground': '#ffffff', // white

        'warning': '#d97706', // amber-600
        'warning-50': '#fffbeb', // amber-50
        'warning-100': '#fef3c7', // amber-100
        'warning-200': '#fde68a', // amber-200
        'warning-300': '#fcd34d', // amber-300
        'warning-400': '#fbbf24', // amber-400
        'warning-500': '#f59e0b', // amber-500
        'warning-600': '#d97706', // amber-600
        'warning-700': '#b45309', // amber-700
        'warning-800': '#92400e', // amber-800
        'warning-900': '#78350f', // amber-900
        'warning-foreground': '#ffffff', // white

        'error': '#dc2626', // red-600
        'error-50': '#fef2f2', // red-50
        'error-100': '#fee2e2', // red-100
        'error-200': '#fecaca', // red-200
        'error-300': '#fca5a5', // red-300
        'error-400': '#f87171', // red-400
        'error-500': '#ef4444', // red-500
        'error-600': '#dc2626', // red-600
        'error-700': '#b91c1c', // red-700
        'error-800': '#991b1b', // red-800
        'error-900': '#7f1d1d', // red-900
        'error-foreground': '#ffffff', // white

        // Border Colors
        'border': '#e5e7eb', // gray-200
        'border-light': '#f3f4f6', // gray-100
        'border-dark': '#d1d5db', // gray-300
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-right': 'slideRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '600': '600ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '150': '150',
        '200': '200',
      },
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}