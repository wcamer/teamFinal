const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

const getAll = async (req, res) =>{
    const cars = await mDB.getDB().db().collection('employees').find().toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const getOne = async (req, res) =>{
    const id = new mDID(req.params.id)
    const cars = await mDB.getDB().db().collection('employees').find({_id: id}).toArray()
    res.setHeader('Content-Type', 'application/json')
    res.json(cars)
}

const addEmployee = async (req, res) => {
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        startDate: req.body.startDate,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('employees').insertOne(employee);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the employee.')
    }
};

const updateEmployee = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update an employee.');
    }
    const employeeId = new mDID(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        startDate: req.body.startDate,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('employees').replaceOne({_id: employeeId}, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the employee.')
    }
};

module.exports = {getAll, getOne, addEmployee, updateEmployee}