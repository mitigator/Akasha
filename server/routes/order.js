const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();

// POST request to create an order
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Calculate total amount
        const totalAmount = cart.items.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);

        // Create the order
        const order = new Order({
            userId,
            items: cart.items,
            totalAmount
        });

        await order.save();

        // Optionally, you can clear the cart after the order is created
        await Cart.deleteOne({ userId });

        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// GET request to retrieve user's order history
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('items.item');
        if (!orders.length) return res.status(404).json({ message: 'No orders found' });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
});

module.exports = router;
