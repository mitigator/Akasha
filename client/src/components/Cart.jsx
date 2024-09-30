import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Cart = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = '66fa197050c1c65c5e6da1e4'; // Hardcoded userId for testing

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cart/${userId}`);
                setCart(response.data);
            } catch (err) {
                setError('Error fetching cart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const calculateTotalPrice = () => {
        return cart.items.reduce((total, item) => {
            const itemPrice = item.price || 0;
            const itemQuantity = item.quantity || 0;
            return total + itemPrice * itemQuantity;
        }, 0).toFixed(2);
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND}/api/cart/${userId}/item/${itemId}`);
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.item._id !== itemId),
            }));
        } catch (err) {
            setError('Error deleting item. Please try again.');
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND}/api/cart/${userId}/clear`);
            setCart({ items: [] });
        } catch (err) {
            setError('Error clearing cart. Please try again.');
        }
    };

    const handleCheckout = async () => {
        try {
            await Promise.all(
                cart.items.map(async (item) => {
                    await axios.put(`${import.meta.env.VITE_BACKEND}/api/inventory/${item.item._id}/subtract`, {
                        quantity: item.quantity,
                    });
                })
            );
            alert('Proceeding to payment');
            await handleClearCart();
        } catch (err) {
            alert('Error during checkout. Please try again.');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto mt-10 p-5">
            
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.items.length === 0 ? (
                <div className="text-center">Your cart is empty.</div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-5">
                    <ul>
                        {cart.items.map((item) => (
                            <li key={item.item._id} className="flex justify-between border-b py-2">
                                <div>
                                    <h2 className="font-semibold">{item.item.name}</h2>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => handleDeleteItem(item.item._id)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4 font-bold">
                        <span>Total Price:</span>
                        <span>₹{calculateTotalPrice()}</span>
                    </div>
                    <button
                        onClick={handleClearCart}
                        className="mt-2 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
        </div>
    );
};

export default Cart;
