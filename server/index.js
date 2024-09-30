const express = require('express');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth'); // Add your authentication routes
const cartRoutes = require('./routes/cart'); // Add your cart routes
const orderRoutes = require('./routes/order'); // Add your order routes
require('dotenv').config(); // Load environment variables
const cors = require('cors'); // Import CORS

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors()); // Use CORS

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://india123:india123@akasha.n99fc.mongodb.net/?retryWrites=true&w=majority&appName=akasha", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
