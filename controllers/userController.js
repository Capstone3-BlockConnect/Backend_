const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { reverseGeocode } = require('../services/geocode');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');


// Define the signup function
exports.signup = async (req, res) => {
    try {
        // 요청 바디에서 사용자 입력 가져오기
        const { username, email, password, phoneNumber, dateOfBirth, gender, bio, nickname } = req.body;
        let { coordinate } = req.body;
        if (typeof coordinate === 'string') {
            coordinate = JSON.parse(coordinate);
        }
        // 좌표를 이용해 지역 정보 가져오기
        const region = await reverseGeocode(coordinate.latitude, coordinate.longitude);
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 해싱된 비밀번호를 사용해 새로운 사용자 객체 생성
        const user = new User({
            username,
            email,
            password: hashedPassword,
            region,
            phoneNumber,
            dateOfBirth,
            gender,
            bio,
            nickname
        });

        // 사용자를 데이터베이스에 저장
        await user.save();

        // 사용자를 위한 JWT 토큰 생성
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 토큰과 사용자 데이터를 클라이언트에게 전송
        res.status(201).json({ token, user });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // 유효성 검사 에러인 경우
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else if (error instanceof MongoError && error.code === 11000) {
            // 중복 데이터 에러인 경우
            return res.status(400).json({ message: '중복된 데이터입니다.' });
        } else {
            // 그 외의 에러인 경우
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};





// JWT를 사용한 로그인 함수 정의
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // 사용자가 존재하는지 확인
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: '잘못된 사용자 이름 입니다.' });
        }
        // 비밀번호가 올바른지 확인
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(402).json({ message: '잘못된 비밀번호입니다.' });
        }
        // 사용자를 위한 JWT 토큰 생성
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // 토큰과 사용자 데이터를 클라이언트에게 전송
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
}
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { username, email, password, phoneNumber, dateOfBirth, gender, bio, nickname } = req.body;
        let { coordinate } = req.body;
        if (typeof coordinate === 'string') {
            coordinate = JSON.parse(coordinate);
        }
        const loginUser = await User.findById(userId);
        // 좌표를 이용해 지역 정보 가져오기
        if (coordinate) {
            const region = await reverseGeocode(coordinate.latitude, coordinate.longitude);
            loginUser.region = region;
        }
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);
        loginUser.username = username;
        loginUser.email = email;
        loginUser.password = hashedPassword;
        loginUser.phoneNumber = phoneNumber;
        loginUser.dateOfBirth = dateOfBirth;
        loginUser.gender = gender;
        loginUser.bio = bio;
        loginUser.nickname = nickname;

        // 해싱된 비밀번호를 사용해 새로운 사용자 객체 생성
        await loginUser.save();

        // 업데이트된 사용자 프로필 반환
        res.status(200).json(loginUser);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // 유효성 검사 에러인 경우
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else if (error instanceof MongoError && error.code === 11000) {
            // 중복 데이터 에러인 경우
            return res.status(400).json({ message: '중복된 데이터입니다.' });
        } else {
            // 그 외의 에러인 경우
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

//get user list
exports.getUserList = async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get user by id
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
