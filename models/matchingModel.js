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
 *           description: The time of the matching result
 *         storeName:
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
 */
const matchingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    storeName: {
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
    user1confirm: {
        type: Boolean,
        default: false,
        required: true
    },
    user2confirm: {
        type: Boolean,
        default: false,
        required: true
    }
});

// 모델 생성
const Matching = mongoose.model('Matching', matchingSchema);

module.exports = Matching;