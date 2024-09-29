const express = require('express');
const mongoose = require('mongoose');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

// Add new inventory item
router.post('/', async (req, res) => {
    const { name, category, price, stock, description, imageUrl } = req.body;

    try {
        const newItem = new InventoryItem({
            _id: new mongoose.Types.ObjectId(),
            name,
            category,
            price,
            stock,
            description,
            imageUrl
        });

        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
});

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

// Get an inventory item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await InventoryItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
});

// Update an inventory item by ID
router.put('/:id', async (req, res) => {
    const { name, category, price, stock, description, imageUrl } = req.body;

    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(
            req.params.id,
            { name, category, price, stock, description, imageUrl },
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
});

// Delete an inventory item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

module.exports = router;
