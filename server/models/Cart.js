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
    price: { 
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
