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

module.exports = {getAll, getOne}