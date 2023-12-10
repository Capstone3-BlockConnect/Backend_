const Matching = require('../models/matchingModel');
const MatchingRequest = require('../models/matchingRequestModel');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
const exp = require('constants');
const { time } = require('console');
const User = require('../models/userModel');

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
        if (user != matchingRequest.user) {
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
        const matchingRequests = await MatchingRequest.find({ user: req.user });
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
        let matchings = await Matching.find({
            $and: [
                { $or: [{ user1: req.user }, { user2: req.user }] },
                { matchingEnd: false }
            ]
        });

        matchings = matchings.map(matching => {
            const dateOnly = matching.date.toISOString().split('T')[0];
            const [hours, minutes] = matching.time.split(':').map(Number);
            const deadlineTime= hours+2+':00';
            return {
                ...matching.toObject(), // 또는 toJSON()
                dateOnly,
                deadlineTime,
            };
        });

        res.status(200).json({ matchings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

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
exports.getMyLog = async (req, res) => {
    try {
        const matchings = await Matching.find({
            $and: [
                { $or: [{ user1: req.user }, { user2: req.user }] },
                { matchingEnd: true }
            ]
        }).sort({ date: -1 });

        const logsPromises = matchings.map(async (matching) => {
            const otherUserId = matching.user1.equals(req.user._id) ? matching.user2 : matching.user1;
            const otherUser = await User.findById(otherUserId);

            return {
                date: matching.date,
                user: otherUserId,
                nickname: otherUser ? otherUser.nickname : null,
            };
        });

        const logs = await Promise.all(logsPromises);

        res.status(200).json({ logs });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const statistics= await Matching.countDocuments({})+5000;
        if (!statistics) {
            return res.status(404).json({ message: 'Matching not found' });
        }
        res.status(200).json({ statistics });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMyStatistics = async (req, res) => {
    try {
        const statistics= await Matching.countDocuments({
            $or: [{ user1: req.user }, { user2: req.user }]
        });
        if (!statistics) {
            return res.status(404).json({ message: 'Matching not found' });
        }
        res.status(200).json({ statistics });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.matchingToLog = async (req, res) => {
    try{
        const matchings = await Matching.updateMany({},{ $set: {matchingEnd: true}});
        console.log(matchings);
        return res.status(200).json({message: 'Matching to log'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}