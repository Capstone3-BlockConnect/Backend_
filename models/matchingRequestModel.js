const mongoose = require('mongoose');

const matchingRequestSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    category: String,
    memo: String
  });
const MatchingRequest = mongoose.model('MatchingRequest', matchingRequestSchema);
module.exports = MatchingRequest;