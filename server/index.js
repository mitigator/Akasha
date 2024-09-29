const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order'); // Import the order routes

// Initialize Express
const app = express();
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb://localhost:27017/akasha", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes); // Add cart routes
app.use('/api/order', orderRoutes); // Add order routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
