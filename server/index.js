const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors()); 

const mongoURI = "mongodb://localhost:27017/akasha";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes); 
app.use('/api/cart', cartRoutes); 
app.use('/api/order', orderRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: 'Something went wrong!' }); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
