const Matching = require('../models/matchingModel');
const MatchingRequest = require('../models/matchingRequestModel');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
const exp = require('constants');

// Create a new matching
exports.request = async (req, res) => {
    try {
        const { date, time, category, memo } = req.body;
        const matchingRequest = new MatchingRequest({
            date,
            time,
            user: req.user,
            category,
            memo
        });
        await matchingRequest.save();
        res.status(201).json({ message: 'Matching request created', matchingRequest });
    }
    catch (err) {
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Matching request already exists' });
        }
        else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const matchingRequest = await MatchingRequest.findById(id);
        if (!matchingRequest) {
            return res.status(404).json({ message: 'Matching request not found' });
        }
        if (user!=matchingRequest.user) {
            return res.status(401).json({ message: 'You are not the owner of this matching request' });
        }
        await matchingRequest.deleteOne();
        res.status(200).json({ message: 'Matching request deleted', matchingRequest });
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid Matching request id' });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.getAllRequests = async (req, res) => {
    try {
        const matchingRequests = await MatchingRequest.find();
        res.status(200).json({ matchingRequests });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const matchingRequests = await MatchingRequest.findById(id);
        if (!matchingRequests) {
            return res.status(404).json({ message: 'Matching request not found' });
        }
        res.status(200).json({ matchingRequests });
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid Matching request id' });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.getMyRequest = async (req, res) => {
    try {
        const matchingRequests = await MatchingRequest.find({ user:req.user });
        if (!matchingRequests) {
            return res.status(404).json({ message: 'Matching request not found' });
        }
        res.status(200).json({ matchingRequests });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteMyRequest = async (req, res) => {
    try {
        const deleteResult = await MatchingRequest.deleteMany({ user: req.user });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Matching request not found' });
        }
        
        res.status(200).json({ message: 'Matching requests deleted' });
    }
    catch (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteAllMatchingRequests = async (req, res) => {
    try {
        const deleteResult = await MatchingRequest.deleteMany();
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Matching requests not found' });
        }
        res.status(200).json({ message: 'Matching requests deleted' });
    }
    catch (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMatching = async (req, res) => {
    try {
        const { id } = req.params;
        const matching = await Matching.findById(id);
        if (!matching) {
            return res.status(404).json({ message: 'Matching not found' });
        }
        res.status(200).json({ matching });
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid Matching id' });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.getAllMatchings = async (req, res) => {
    try {
        const matchings = await Matching.find();
        res.status(200).json({ matchings });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMyMatching = async (req, res) => {
    try {
        const matchings = await Matching.find({ $or: [{ user1: req.user }, { user2: req.user }] });
        if (!matchings) {
            return res.status(404).json({ message: 'Matching not found' });
        }
        res.status(200).json({ matchings });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.confirmMatching = async (req, res) => {
    try {
        const matching= await Matching.findById(req.params.id);
        if(!matching){
            return res.status(404).json({message: 'Matching not found'});
        }
        if(matching.user1==req.user){
            matching.user1confirm=true;
        }
        else if(matching.user2==req.user){
            matching.user2confirm=true;
        }
        else{
            return res.status(401).json({message: 'You are not a participant of this matching'});
        }
        await matching.save();
        if(matching.user1confirm&&matching.user2confirm){
            await matching.deleteOne();
            return res.status(200).json({message: 'Matching confirmed and deleted'});
        }
        return res.status(200).json({message: 'Matching confirmed'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.deleteAllMatchings = async (req, res) => {
    try {
        const deleteResult = await Matching.deleteMany();
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Matchings not found' });
        }
        res.status(200).json({ message: 'Matchings deleted' });
    }
    catch (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}