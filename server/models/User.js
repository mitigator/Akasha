const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true }
}, { timestamps: true }); // Optional: for tracking user creation/updates

const User = mongoose.model('User', userSchema);

module.exports = User;
