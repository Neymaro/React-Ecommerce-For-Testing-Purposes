import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6C63FF', // Soft purple
        },
        secondary: {
            main: '#FF6584', // Soft pink
        },
        background: {
            default: '#F5F5F5', // Light grey
        },
        text: {
            primary: '#333333', // Dark grey
            secondary: '#666666', // Medium grey
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
