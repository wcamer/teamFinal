/*
Remember for the rules, FIRST Sanitize and then SECOND validate 
Link for help:
https://express-validator.github.io/docs/guides/validation-chain/

Link for sanitation and validation rules:
https://github.com/validatorjs/validator.js

*/

const {body, validationResult} = require('express-validator')
const mongodb = require('../database/db')
const mDID = require('mongodb').ObjectId
const val = {}


val.getVehicleRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid vehicle id")
        .custom(
             async (_id, {req}) => {
            _id = new mongoDbObjectId(req.params.id)
            const vehicle = await mongodb.getDB().db().collection('cars').findOne({_id: _id})
            if(!vehicle) {
                throw new Error("Vehicle ID isn't Valid!!!" )
            }
        })
    ]
}


val.getVehicleCheck = async (req, res, next) =>{
    const _id = req.params.id
     req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getVehicleCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getVehicleCheck and associated rules.  Proceeding with retrieval operation")
    }
    next()
}


module.exports = val