const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The user's ID
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *         nickname:
 *           type: string
 *           description: The user's nickname
 *         gender:
 *           type: string
 *           enum:
 *             - '남성'
 *             - '여성'
 *           description: The user's gender (either '남성' or '여성')
 *         age:
 *           type: number
 *           description: The user's age
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number
 *         foodCategory:
 *           type: string
 *           enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *           description: The user's food category (optional)
 */
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
        required: true,
        unique: true
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
        type: String,
        enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페'],
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;