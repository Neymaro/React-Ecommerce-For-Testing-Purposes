import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Cart = () => {
    const { cart, dispatch } = useCart();

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', product });
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <Box>
                    <Grid container spacing={3}>
                        {cart.map((product, index) => (
                            <Grid item xs={12} key={index}>
                                <Card sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    <CardContent sx={{ flex: '1' }}>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {product.category}
                                        </Typography>
                                        <Typography variant="h5" color="primary">${product.price}</Typography>
                                    </CardContent>
                                    <Button variant="contained" color="secondary" onClick={() => removeFromCart(product)} sx={{ m: 1 }}>
                                        Remove
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" align="right">Total: ${calculateTotal()}</Typography>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Proceed to Checkout
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Cart;