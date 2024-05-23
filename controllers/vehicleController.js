const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

const getAll = async (req, res) =>{
    const cars = await mDB.getDB().db().collection('vehicles').find().toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const getOne = async (req, res) =>{
    const id = new mDID(req.params.id)
    const cars = await mDB.getDB().db().collection('vehicles').find({_id: id}).toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const addVehicle = async (req, res) => {
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        trim: req.body.trim,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price
    };
    const response = await mDB.getDB().db().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the vehicle.')
    }
};

const updateVehicle = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a vehicle.');
    }
    const vehicleId = new mDID(req.params.id);
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        trim: req.body.trim,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price
    };
    const response = await mDB.getDB().db().collection('vehicles').replaceOne({_id: vehicleId}, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the vehicle.')
    }
};

module.exports = {getAll, getOne, addVehicle, updateVehicle}