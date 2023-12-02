const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         contents:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         isResolved:
 *           type: boolean
 *         response:
 *           type: string
 */

const reportSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isResolved: { // 해결 완료 여부
        type: Boolean,
        required: true,
        default: false // 기본값을 false로 설정
    },
    response: { // 답변
        type: String,
        required: false // 답변은 필수가 아닐 수 있음
    }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;