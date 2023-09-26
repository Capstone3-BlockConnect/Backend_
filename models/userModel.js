const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - region
 *         - nickname
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         password:
 *           type: string
 *           description: The user's password.
 *         region:
 *           type: string
 *           description: The user's region.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         profileImageURL:
 *           type: string
 *           description: The URL of the user's profile image.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The user's date of birth.
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: The user's gender.
 *         signUpDate:
 *           type: string
 *           format: date
 *           description: The date the user signed up.
 *         bio:
 *           type: string
 *           description: A short bio of the user.
 *         nickname:
 *           type: string
 *           description: The user's nickname.
 *       example:
 *         username: "아이디"
 *         email: "이메일@example.com"
 *         password: "암호화된비밀번호"
 *         region: "서울시 관악구 봉천동"
 *         phoneNumber: "01012345678"
 *         profileImageURL: "image.jpg"
 *         dateOfBirth: "2000-01-01"
 *         gender: "Male"
 *         signUpDate: "2022-01-01"
 *         bio: "안녕하세요"
 *         nickname: "닉네임"
 */

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