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
            _id = new mDID(req.params.id)
            const vehicle = await mongodb.getDB().db().collection('vehicles').findOne({_id: _id})
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



val.postVehicleRules = () => {
    return [

        body('make')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid name"),

        body('model')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid model"),

        body('color')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid color"),
                
        body('trim')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid trim level"),

        body('year')
        .trim()
        .toInt()
        .isLength({min: 4, max:4})
        .isInt()
        .withMessage("Please enter a 4 digit year"),
        
       body('mileage')
        .trim()
        .toInt()
        .isLength({min: 1, max: 6})
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid mileage.  At least 1 digit but no more than 6"),

        body('price')
        .trim()
        .toInt()
        .isLength({min: 1, max: 6})
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid price without the dollar sign or commas"),

    ]
}

val.postVehicleCheck = async(req,res,next) =>{

   let errors = []
   errors = validationResult(req)
   if(!errors.isEmpty()){
       console.log("Rule violation in postVehicleCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
   }else{
       console.log("It passed the postVehicleCheck and associated rules.  Proceeding to creation operation")

   }
   next()
}

val.putVehicleRules = () => {
    return[
    

            body('make')
            .trim()
            .isLength({min: 1, max: 41})
            .withMessage("Please enter a valid name"),
    
            body('model')
            .trim()
            .isLength({min: 1, max: 41})
            .withMessage("Please enter a valid model"),
    
            body('color')
            .trim()
            .isLength({min: 1, max: 41})
            .withMessage("Please enter a valid color"),
                    
            body('trim')
            .trim()
            .isLength({min: 1, max: 41})
            .withMessage("Please enter a valid trim level"),
    
            body('year')
            .trim()
            .toInt()
            .isLength({min: 4, max:4})
            .isInt()
            .withMessage("Please enter a 4 digit year"),
            
           body('mileage')
            .trim()
            .toInt()
            .isLength({min: 1, max: 6})
            .isInt()
            .isNumeric()
            .withMessage("Please enter a valid mileage.  At least 1 digit but no more than 6"),
    
            body('price')
            .trim()
            .toInt()
            .isLength({min: 1, max: 6})
            .isInt()
            .isNumeric()
            .withMessage("Please enter a valid price without the dollar sign or commas"),
    
        
    ]
}

val.putVehicleCheck = async(req, res, next)=>{
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in putVehicleCheck!!!  Operation Canceled.")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("Passed putVehicleCheck and associated rules.  Proceeding with operation")
    }
    next()
}

val.deleteVehicleRules = () => {
    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid vehicle id")
        .custom(
             async (_id, {req}) => {
            _id = new mDID(req.params.id)
            const vehicle = await mongodb.getDB().db().collection('vehicles').findOne({_id: _id})
            if(!vehicle) {
                throw new Error("Vehicle ID isn't Valid!!!" )
            }
        })
    ]
}


val.deleteVehicleCheck = async(req,res,next) =>{
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in deleteVehicleCheck!!!  Operation Canceled.")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("Passed deleteVehicleCheck and associated rules.  Proceeding with operation")
    }
    next()
}
module.exports = val