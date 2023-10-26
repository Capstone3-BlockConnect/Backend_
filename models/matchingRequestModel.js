const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     MatchingRequest:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the matching request
 *         time:
 *           type: string
 *           enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00']
 *           description: The time of the matching request
 *         user:
 *           type: string
 *           description: The ID of the user who made the request
 *         category:
 *           type: string
 *           enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *           description: The category of the matching request
 *         memo:
 *           type: string
 *           description: Additional memo for the request
 *         requestTime:
 *           type: string
 *           format: date-time
 *           description: The time when the request was made
 */
const matchingRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  time: {
    type: String,
    required: true,
    enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00'],
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // 유저 ID를 참조
    ref: 'User',
    required: true
  },

  category: {
    type: String,
    required: true,
    enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페'],
    index: true
  },
  memo: String,
  requestTime:{
    type: Date,
    default: Date.now
  }
});
const MatchingRequest = mongoose.model('MatchingRequest', matchingRequestSchema);
module.exports = MatchingRequest;