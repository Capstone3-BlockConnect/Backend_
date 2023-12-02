const Report = require('../models/reportModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');

exports.createReport = async (req, res) => {
    try{
        const user = req.user;
        const {contents} = req.body;
        const today = new Date();
        today.setHours(today.getHours() + 9);
        const report = new Report({
            userId: user,
            contents,
            date: today,
        });
        await report.save();
        res.status(201).json({message: 'Report created', report});        
    }
    catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            return res.status(400).json({message: err.message});
        }
        else{
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}
exports.getMyReports = async (req, res) => {
    try{
        const user = req.user;
        const reports = await Report.find({userId: user});
        res.status(200).json({message: 'Get my reports', reports});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.getReport = async (req, res) => {
    try{
        const user=req.user;
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if(!report){
            return res.status(404).json({message: 'Report not found'});
        }
        if(report.userId !== user){
            return res.status(401).json({message: 'You are not the author of this report'});
        }
        res.status(200).json({message: 'Get report', report});  
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.modifyReport = async (req, res) => {
    try{
        const user=req.user;
        const reportId = req.params.id;
        const {contents} = req.body;
        const report = await Report.findById(reportId);
        if(!report){
            return res.status(404).json({message: 'Report not found'});
        }
        if(report.userId !== user){
            return res.status(401).json({message: 'You are not the author of this report'});
        }
        if(report.isResolved===true){
            return res.status(403).json({message: 'This report is already resolved'});
        }
        report.contents = contents;
        const today = new Date();
        today.setHours(today.getHours() + 9);
        report.date = today;
        await report.save();
        res.status(200).json({message: 'Modify report', report});  
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.deleteReport = async (req, res) => {
    try{
        const user=req.user;
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if(!report){
            return res.status(404).json({message: 'Report not found'});
        }
        if(report.userId !== user){
            return res.status(401).json({message: 'You are not the author of this report'});
        }
        await report.delete();
        res.status(200).json({message: 'Delete report'});  
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.getAllReports = async (req, res) => {
    try{
        const reports = await Report.find({});
        res.status(200).json({message: 'Get all reports', reports});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.resolveReport = async (req, res) => {
    try{
        const user=req.user;
        const reportId = req.params.id;
        const {response} = req.body;
        const report = await Report.findById(reportId);
        if(!report){
            return res.status(404).json({message: 'Report not found'});
        }
        if(report.isResolved===true){
            return res.status(403).json({message: 'This report is already resolved'});
        }
        report.isResolved = true;
        report.response = response;
        await report.save();
        res.status(200).json({message: 'Resolve report', report});  
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}