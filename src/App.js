import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <div>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<ProductList />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                            <Footer />
                        </div>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;