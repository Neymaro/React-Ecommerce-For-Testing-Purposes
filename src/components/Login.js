import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { USERNAME, PASSWORD } from '../constants/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === USERNAME && password === PASSWORD) {
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2 seconds delay before redirecting
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message="LOGIN SUCCESSFUL WE ARE REDIRECTING YOU TO THE HOME PAGE..."
            />
        </Container>
    );
};

export default Login;