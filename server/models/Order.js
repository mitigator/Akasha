const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryItem',
        required: true
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true }); // Optional: for tracking item in order

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Types.ObjectId, // Updated to ObjectId
        ref: 'User', // Optional: You can reference the User model
        required: true 
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true }); // Optional: for tracking order creation

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
