const mobileHeaderHeight = 56;

const xxlBreakpoint = 1260 + 24;
const xlBreakpoint = 1170 + 24;
const lgBreakpoint = 992 + 24;
const mdBreakpoint = 768 + 24;
const smBreakpoint = 640 + 24;
const xsBreakpoint = 440 + 24;

module.exports = {
    mode: 'jit', // Just-In-Time Compiler
    content: ['./src/**/*.html'],
    darkMode: 'media',
    safelist: ['notice', 'spinner', 'toast', 'win', 'lost'],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            transparent: 'transparent',
            green: '#82DD55',
            red: '#E23636',
            inherit: 'inherit',
            primary: '#005099',
            secondary: '#191310',
            'grey-60': '#c6c8ca',
            'grey-100': '#77787b',
        },
        screens: {
            xs: `${xsBreakpoint}px`,
            sm: `${smBreakpoint}px`,
            md: `${mdBreakpoint}px`,
            lg: `${lgBreakpoint}px`,
            xl: `${xlBreakpoint}px`,
            '2xl': `${xxlBreakpoint}px`,
        },
        container: {
            padding: '0.75rem',
            center: true,
        },
        fontFamily: {
            body: ['Roboto', 'sans-serif'],
            title: ['Rajdhani', 'sans-serif'],
        },
        transitionDuration: {
            DEFAULT: '200ms',
            600: '600ms',
        },
        extend: {
            screens: {
                '-2xl': { max: `${xxlBreakpoint - 1}px` },
                '-xl': { max: `${xlBreakpoint - 1}px` },
                '-lg': { max: `${lgBreakpoint - 1}px` },
                '-md': { max: `${mdBreakpoint - 1}px` },
                '-sm': { max: `${smBreakpoint - 1}px` },
                '-xs': { max: `${xsBreakpoint - 1}px` },
            },
            height: {
                calcMobileContent: `calc(100vh - ${mobileHeaderHeight}px)`,
            },
            zIndex: {
                1: '1',
                100: '100',
            },
            boxShadow: {
                universal: '0px 2px 2px rgba(138,149,165, 0.104941), 0px 8px 8px rgba(138,149,165, 0.05)',
            },
            fontSize: {
                32: ['2rem', '2.5rem'],
                40: ['2.5rem', '3rem'],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
