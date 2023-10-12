const matchingResultSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    storeName: {
        type: mongoose.Schema.Types.ObjectId, // 가게 이름의 ID를 참조
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
    user2Memo: String
});

// 모델 생성
const MatchingResult = mongoose.model('MatchingResult', matchingResultSchema);

module.exports = MatchingResult;