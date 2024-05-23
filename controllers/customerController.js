const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

const getAll = async (req, res) =>{
    const cars = await mDB.getDB().db().collection('customers').find().toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const getOne = async (req, res) =>{
    const id = new mDID(req.params.id)
    const cars = await mDB.getDB().db().collection('customers').find({_id: id}).toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const addCustomer = async (req, res) => {
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the customer.')
    }
};

const updateCustomer = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a customer.');
    }
    const customerId = new mDID(req.params.id);
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('customers').replaceOne({_id: customerId}, customer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the customer.')
    }
};

module.exports = {getAll, getOne, addCustomer, updateCustomer}