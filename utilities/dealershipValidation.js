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


val.getDealershipRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid dealership id")
        .custom(
             async (_id, {req}) => {
            _id = new mongoDbObjectId(req.params.id)
            const dealership = await mongodb.getDB().db().collection('dealerships').findOne({_id: _id})
            if(!dealership) {
                throw new Error("dealership ID isn't Valid!!!" )
            }
        })
    ]
}


val.getDealershipCheck = async (req, res, next) =>{
    const _id = req.params.id
     req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getDealershipCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getDealershipCheck and associated rules.  Proceeding with retrieval operation")
    }
    next()
}


module.exports = val