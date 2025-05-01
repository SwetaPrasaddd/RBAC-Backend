const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    photo: { type: String },
    gender: { type: String },
    verificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    block: { type: Boolean }
}, {
    collection: "Users"
});

module.exports = mongoose.model('User', userSchema); //User U always capital
