const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

const getAll = async (req, res) =>{
    const cars = await mDB.getDB().db().collection('dealerships').find().toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const getOne = async (req, res) =>{
    const id = new mDID(req.params.id)
    const cars = await mDB.getDB().db().collection('dealerships').find({_id: id}).toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const addDealership = async (req, res) => {
    const dealership = {
        name: req.body.name,
        address: req.body.address,
        state: req.body.state,
        zip: req.body.zip
    };
    const response = await mDB.getDB().db().collection('dealerships').insertOne(dealership);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the dealership.')
    }
};

const updateDealership = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a dealership.');
    }
    const dealershipId = new mDID(req.params.id);
    const dealership = {
        name: req.body.name,
        address: req.body.address,
        state: req.body.state,
        zip: req.body.zip
    };
    const response = await mDB.getDB().db().collection('dealerships').replaceOne({_id: dealershipId}, dealership);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the dealership.')
    }
};

module.exports = {getAll, getOne, addDealership, updateDealership}