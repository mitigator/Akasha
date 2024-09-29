const express = require('express');
const Cart = require('../models/Cart');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router(); // Initialize the router

// POST request to add item to cart
router.post('/:userId', async (req, res) => {
    const { itemId, quantity } = req.body;
    const { userId } = req.params;

    try {
        // Find the inventory item
        const item = await InventoryItem.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item is already in the cart
        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);
        const itemPrice = item.price; // Get the item's price

        if (existingItemIndex > -1) {
            // Update quantity and price if item exists in the cart
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to the cart with its price
            cart.items.push({ item: itemId, quantity, price: itemPrice });
        }

        await cart.save();
        res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});

// GET request to retrieve user's cart
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.item');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
});

module.exports = router; // Export the router
