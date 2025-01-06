import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const { cart } = useCart();

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    const handleCheckout = () => {
        alert('Checkout successful!');
        // Here you can add logic to clear the cart or redirect the user
    };

    return (
        <div className="container">
            <h1>Checkout</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${totalAmount}</h2>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;