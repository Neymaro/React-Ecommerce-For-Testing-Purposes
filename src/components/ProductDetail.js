import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { Container, Typography, CircularProgress, Card, CardMedia, CardContent, Button, Box, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', product });
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            {product && (
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover', borderRadius: 1 }}
                        image={product.image}
                        alt={product.title}
                    />
                    <CardContent sx={{ flex: '1', p: 3 }}>
                        <Typography variant="h4" gutterBottom>{product.title}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            Category: {product.category}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" gutterBottom>${product.price}</Typography>
                        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ProductDetail;