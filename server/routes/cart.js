const express = require('express');
const Cart = require('../models/Cart');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

// POST request to add item to cart
router.post('/:userId', async (req, res) => {
    const { itemId, quantity } = req.body;
    const { userId } = req.params;

    if (!itemId || !quantity) {
        return res.status(400).json({ message: 'Please provide itemId and quantity' });
    }

    try {
        const item = await InventoryItem.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);
        const itemPrice = item.price;

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
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
        const cart = await Cart.findOne({ userId }).populate('items.item');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
});

module.exports = router;
