const Store = require('../models/storeModel');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');

// Create a new store
exports.register = async (req, res) => {
    try{
        const {storeName,address,location,businessHours,phoneNumber,storeDescription,menu,photos,category,genre} = req.body;
        const store = new Store({
            storeName,
            address,
            location,
            businessHours,
            phoneNumber,
            storeDescription,
            menu,
            photos,
            category,
            genre,
        });
        await store.save();
        res.status(201).json({message: 'Store created', store});
    }
    catch(err){
        if(err instanceof MongoError && err.code === 11000){
            return res.status(409).json({message: 'Store already exists'});
        }
        else if(err.name === 'ValidationError'){
            return res.status(400).json({message: err.message});
        }
        else{
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}


exports.getAllStores = async (req, res) => {
    try{
        const stores = await Store.find();
        res.status(200).json({stores});
    }
    catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }
}

// Get a store by id
exports.getStore = async (req, res) => {
    try{
        const {id} = req.params;
        const store = await Store.findById(id);
        if(!store){
            return res.status(404).json({message: 'Store not found'});
        }
        res.status(200).json({store});
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return res.status(400).json({message: 'Invalid Store id'});
        }
        return res.status(500).json({message: 'Internal server error'});
    }
}

// Modify a store by id
exports.modifyStore = async (req, res) => {
    try{
        const {id} = req.params;
        const {storeName,address,location,businessHours,phoneNumber,storeDescription,menu,photos,category,genre} = req.body;
        const store = await Store.findByIdAndUpdate(id, {
            storeName,
            address,
            location,
            businessHours,
            phoneNumber,
            storeDescription,
            menu,
            photos,
            category,
            genre
        });
        if(!store){
            return res.status(404).json({message: 'Store not found'});
        }
        res.status(200).json({message: 'Store modified successfully'});
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return res.status(400).json({message: 'Invalid Store id'});
        }
        return res.status(500).json({message: 'Internal server error'});
    }
}
exports.deleteStore = async (req, res) => {
    try{
        const {id} = req.params;
        const store = await Store.findByIdAndDelete(id);
        if(!store){
            return res.status(404).json({message: 'Store not found'});
        }
        res.status(200).json({message: 'Store deleted successfully'});
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return res.status(400).json({message: 'Invalid Store id'});
        }
        return res.status(500).json({message: 'Internal server error'});
    }
}