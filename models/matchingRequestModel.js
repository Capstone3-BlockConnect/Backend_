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
 *           description: The time of the matching request
 *         user:
 *           type: string
 *           description: The ID of the user who made the request
 *         category:
 *           type: string
 *           description: The category of the matching request
 *         memo:
 *           type: string
 *           description: Additional memo for the request
 */
const matchingRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // 유저 ID를 참조
    ref: 'User',
    required: true
  },

  category: String,
  memo: String
});
const MatchingRequest = mongoose.model('MatchingRequest', matchingRequestSchema);
module.exports = MatchingRequest;