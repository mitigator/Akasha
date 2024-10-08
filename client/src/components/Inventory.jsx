import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState({});
    const [message, setMessage] = useState('');
    const userId = '66fa197050c1c65c5e6da1e4'; // Hardcoded userId

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/inventory`);
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching inventory items');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddToCart = async (item) => {
        // Check if the item is already in the cart
        setCart((prevCart) => {
            const newCart = { ...prevCart };

            if (newCart[item._id]) {
                // Increment quantity if item already exists in cart
                newCart[item._id].quantity += 1;
            } else {
                // Add new item to the cart with quantity 1
                newCart[item._id] = { ...item, quantity: 1 };
            }

            // Send updated item to backend
            axios.post(`${import.meta.env.VITE_BACKEND}/api/cart/${userId}`, {
                itemId: item._id,
                quantity: newCart[item._id].quantity
            })
            .then(response => {
                console.log('Cart updated successfully:', response.data);
                setMessage(`${item.name} has been added to your cart.`);
            })
            .catch(err => {
                console.error('Error adding item to cart:', err);
                setMessage('Error adding item to cart.');
            });

            return newCart;
        });

        // Clear message after a few seconds
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleDecreaseQuantity = (item) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            
            if (newCart[item._id] && newCart[item._id].quantity > 1) {
                newCart[item._id].quantity -= 1;
            } else {
                delete newCart[item._id];
            }

            // Update the backend with new cart
            axios.post(`${import.meta.env.VITE_BACKEND}/api/cart/${userId}`, {
                itemId: item._id,
                quantity: newCart[item._id]?.quantity || 0
            });

            return newCart;
        });
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

    const filteredItems = items.filter(item => {
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearchTerm && matchesCategory;
    });

    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row p-4">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4 flex flex-col space-y-2">
                        {['All', 'Vegetable', 'Non-Veg', 'Bread', 'Eggs', 'Fruit'].map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-300 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Item Display */}
                <div className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.length ? (
                            filteredItems.map((item) => (
                                <div key={item._id} className="bg-white border rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="font-bold">₹{item.price}</p>
                                            <p className="text-gray-500 text-sm">Stock: {item.stock}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-l-lg hover:bg-red-600 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4">{cart[item._id]?.quantity || 0}</span>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-r-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">No items found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Display Message */}
            {message && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Inventory;
