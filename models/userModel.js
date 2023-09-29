const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    profileImageURL: String, // 프로필 이미지 URL
    dateOfBirth: Date, // 생년월일
    gender: {
        type: String,
        enum: ['Male', 'Female'] // 성별
    },
    signUpDate: {
        type: Date,
        default: Date.now // 가입 날짜
    },
    bio: String, // 자기 소개
    nickname: {  // 닉네임
        type: String,
        required: true,
        unique: true
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;