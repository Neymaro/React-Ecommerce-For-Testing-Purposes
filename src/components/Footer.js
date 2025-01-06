import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                padding: '20px',
                marginTop: '40px',
                textAlign: 'center',
            }}
        >
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} BreezeBuy - Testing Purposes <br />
                Github: <Link href="https://github.com/Neymaro" color="inherit" target="_blank" rel="noopener">
                    https://github.com/Neymaro
                </Link>. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
