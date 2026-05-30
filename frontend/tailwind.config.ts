import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { 
          50:'#FFF1F2',
          100:'#FFE4E6',
          200:'#FECDD3',
          300:'#FDA4AF',
          400:'#FB7185',
          500:'#C11119',
          600:'#A50E15',
          700:'#8B0C12',
          800:'#6B0000',
          900:'#450000'
        },
        deep:  { 50:'#EFF6FF',100:'#DBEAFE',200:'#BFDBFE',300:'#93C5FD',400:'#60A5FA',500:'#3B82F6',600:'#2563EB',700:'#1D4ED8',800:'#1E3A8A',900:'#172554' },
        ink:   { 50:'#FAFAFA',100:'#F5F5F5',200:'#E5E5E5',300:'#D4D4D4',400:'#A3A3A3',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#0A0A0A' },
      },
      keyframes: {
        'fade-up':     { '0%':{opacity:'0',transform:'translateY(30px)'}, '100%':{opacity:'1',transform:'translateY(0)'} },
        'fade-down':   { '0%':{opacity:'0',transform:'translateY(-20px)'}, '100%':{opacity:'1',transform:'translateY(0)'} },
        'fade-in':     { '0%':{opacity:'0'}, '100%':{opacity:'1'} },
        'scale-in':    { '0%':{opacity:'0',transform:'scale(0.92)'}, '100%':{opacity:'1',transform:'scale(1)'} },
        'float':       { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-12px)'} },
        'pulse-ring':  { '0%':{transform:'scale(0.95)',opacity:'1'}, '100%':{transform:'scale(1.6)',opacity:'0'} },
        'marquee':     { '0%':{transform:'translateX(0)'}, '100%':{transform:'translateX(-50%)'} },
        'blob':        { '0%,100%':{transform:'translate(0,0) scale(1)'}, '33%':{transform:'translate(30px,-50px) scale(1.1)'}, '66%':{transform:'translate(-20px,20px) scale(0.9)'} },
        'ken-burns':   { '0%':{transform:'scale(1)'}, '100%':{transform:'scale(1.15)'} },
      },
      animation: {
        'fade-up':    'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down':  'fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fade-in 0.6s ease-out forwards',
        'scale-in':   'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee':    'marquee 25s linear infinite',
        'blob':       'blob 12s ease-in-out infinite',
        'ken-burns':  'ken-burns 20s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
        'gradient-night': 'linear-gradient(135deg, #0A0A0A 0%, #1E3A8A 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
