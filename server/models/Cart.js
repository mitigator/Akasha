const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryItem',
        required: true
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: {  // Added price field
        type: Number,
        required: true
    }
}, { timestamps: true }); // Optional: for tracking when the item was added

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Types.ObjectId, // Updated to ObjectId
        ref: 'User', // Optional: You can reference the User model
        required: true 
    },
    items: [cartItemSchema]
}, { timestamps: true }); // Optional: for tracking when the cart was created/updated

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
