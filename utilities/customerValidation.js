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


val.getCustomerRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid customer id")
        .custom(
             async (_id, {req}) => {
            _id = new mDID(req.params.id)
            const customer = await mongodb.getDB().db().collection('customers').findOne({_id: _id})
            if(!customer) {
                throw new Error("customer ID isn't Valid!!!" )
            }
        })
    ]
}


val.getCustomerCheck = async (req, res, next) =>{
    const _id = req.params.id
     req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getCustomerCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getCustomerCheck and associated rules.  Proceeding with retrieval operation")
    }
    next()
}


module.exports = val