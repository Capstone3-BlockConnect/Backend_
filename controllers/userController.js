const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
const MatchingRequest = require('../models/matchingRequestModel');
const Matching = require('../models/matchingModel');



exports.signup = async (req, res) => {
    try{
        const {userId,password,nickname,gender,age,phoneNumber,foodCategory} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userId,
            password: hashedPassword,
            nickname,
            gender,
            age,
            phoneNumber,
            foodCategory,
        });
        await user.save();
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        user.password=undefined;
        res.status(201).json({message: 'User created', token,user});
    }
    catch(err){
        console.log(err);
        if(err instanceof MongoError && err.code === 11000){
            return res.status(409).json({message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다'});
        }
        else if(err.name === 'ValidationError'){
            return res.status(400).json({message: err.message});
        }
        else{
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}

// Login
exports.login = async (req, res) => {
    try{
        const {userId,password} = req.body;
        const user = await User.findOne({userId});
        if(!user){
            return res.status(401).json({message: '없는 사용자 입니다'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(402).json({message: '비밀번호가 일치하지 않습니다'});
        }
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        user.password=undefined;
        res.status(200).json({message: 'Login success', token,user});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // 비밀번호 필드를 제외하고 조회
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.params.id,{password:0});
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        res.status(200).json({user});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

exports.getMyProfile = async (req, res) => {   
    try{
        const user = await User.findById(req.user,{password:0});
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        res.status(200).json({user});

    }
    catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.modifyProfile = async (req, res) => {
    try{
        const{oldPassword,newPassword,nickname,gender,age,phoneNumber,foodCategory} = req.body;
        const user= await User.findById(req.user);
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(402).json({message: '비밀번호가 일치하지 않습니다'});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.nickname=nickname;
        user.gender=gender;
        user.age=age;
        user.phoneNumber=phoneNumber;
        user.foodCategory=foodCategory;
        user.password=hashedPassword;

        await user.save();
        
        res.status(200).json({message: 'User modified',user});
    } catch (err) {
        console.log(err);
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다' });
        } else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const{password} = req.body;
        const user= await User.findById(req.user);
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(402).json({message: '비밀번호가 일치하지 않습니다'});
        }
        const matchingRequests = await MatchingRequest.find({user:req.user});
        if (matchingRequests.length > 0) {
            return res.status(403).json({ message: '매칭 요청이 존재합니다' });
        }
        const matchings = await Matching.find({user:req.user});
        if (matchings.length > 0) {
            return res.status(403).json({ message: '매칭이 존재합니다' });
        }
        await user.deleteOne();
        res.status(200).json({message: 'User deleted'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.deleteAllUsers = async (req, res) => {
    try{
        await User.deleteMany({});
        res.status(200).json({message: 'All users deleted'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}


