import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Container, TextField, Select, MenuItem, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Button, Snackbar, Box, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState(null);
    const [priceFilter, setPriceFilter] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { dispatch } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
                const uniqueCategories = [...new Set(data.map(product => product.category))].sort();
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setPriceFilter(value);
        filterAndSortProducts(value, sortOption, searchQuery, selectedCategory);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        filterAndSortProducts(priceFilter, value, searchQuery, selectedCategory);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        filterAndSortProducts(priceFilter, sortOption, value, selectedCategory);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        filterAndSortProducts(priceFilter, sortOption, searchQuery, category);
    };

    const filterAndSortProducts = (price, sort, search, category) => {
        let filtered = products;

        if (price !== '') {
            const maxPrice = parseInt(price, 10);
            filtered = filtered.filter(product => product.price <= maxPrice);
        }

        if (search !== '') {
            filtered = filtered.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (category !== '') {
            filtered = filtered.filter(product => product.category === category);
        }

        if (sort === 'price') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'name') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', product });
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Product List</Typography>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <TextField
                label="Filter by price (max)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={priceFilter}
                onChange={handleFilterChange}
            />
            <Select
                value={sortOption}
                onChange={handleSortChange}
                displayEmpty
                fullWidth
                variant="outlined"
                margin="normal"
            >
                <MenuItem value="">Sort by</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="name">Name</MenuItem>
            </Select>
            <Typography variant="h6" gutterBottom>Categories</Typography>
            <Box display="flex" flexWrap="wrap" mb={2}>
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "contained" : "outlined"}
                        style={{ margin: '5px' }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Button>
                ))}
                <Button
                    variant={selectedCategory === '' ? "contained" : "outlined"}
                    style={{ margin: '5px' }}
                    onClick={() => handleCategoryClick('')}
                >
                    All
                </Button>
            </Box>
            <Grid container spacing={3}>
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.title}
                                    style={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{product.title}</Typography>
                                    <Divider sx={{ mb: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        {product.category}
                                    </Typography>
                                    <Typography variant="h5" color="primary">${product.price}</Typography>
                                </CardContent>
                            </Link>
                            <Button variant="contained" color="primary" onClick={() => addToCart(product)} sx={{ m: 1 }}>
                                Add to Cart
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Product added to cart"
            />
        </Container>
    );
};

export default ProductList;