const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Matching:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the matching result
 *         time:
 *           type: string
 *           enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00']
 *           description: The time of the matching result
 *         store:
 *           type: string
 *           description: The ID of the store
 *         user1:
 *           type: string
 *           description: The ID of user 1
 *         user2:
 *           type: string
 *           description: The ID of user 2
 *         user1Memo:
 *           type: string
 *           description: Memo from user 1
 *         user2Memo:
 *           type: string
 *           description: Memo from user 2
 *         user1confirm:
 *           type: boolean
 *           description: Confirmation status of user 1
 *         user2confirm:
 *           type: boolean
 *           description: Confirmation status of user 2
 *         category:
 *           type: string
 *           enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *           description: The category of the store
 */
const matchingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00'],
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId, // 가게 ID를 참조
        ref: 'Store',
        required: true
    },
    user1: {
        type: mongoose.Schema.Types.ObjectId, // 유저1의 ID를 참조
        ref: 'User',
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId, // 유저2의 ID를 참조
        ref: 'User',
        required: true
    },
    user1Memo: String,
    user2Memo: String,
    category: {
        type: String,
        enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페'],
        required: true
    },
    matchingEnd: {
        type: Boolean,
        default: false,
        required: true
    },
});

// 모델 생성
const Matching = mongoose.model('Matching', matchingSchema);

module.exports = Matching;