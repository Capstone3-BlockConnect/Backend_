const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['남성', '여성'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    foodCategory: {
        type: [String],
        required: true
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;