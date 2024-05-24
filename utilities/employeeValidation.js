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


val.getEmployeeRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid employee id")
        .custom(
             async (_id, {req}) => {
            _id = new mDID(req.params.id)
            const employee = await mongodb.getDB().db().collection('employees').findOne({_id: _id})
            if(!employee) {
                throw new Error("employee ID isn't Valid!!!" )
            }
        })
    ]
}


val.getEmployeeCheck = async (req, res, next) =>{
    const _id = req.params.id
     req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getEmployeeCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getEmployeeCheck and associated rules.  Proceeding with retrieval operation")
    }
    next()
}



val.postEmployeeRules = () =>{
    return[
        body("firstName")
        .trim()
        .notEmpty()
        .isLength({ min: 1})
        .withMessage("Please provide a first name with at least 1 letter"),

    body("lastName")
    .trim()
    .notEmpty()
    .isLength({ min: 1})
    .withMessage("Please provide a last name with at least 1 letter"),
 
    body("birthday")
    .trim()
    .notEmpty()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
  
    .withMessage("Please provide a birthday in the following format yyyy-mm-dd"),

    body("phone")
    .trim()
    .isLength({min: 10})
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage("Please enter a phone number in the following format xxx-xxx-xxxx")
    ,

    body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .isLength({ min: 4})
    .withMessage("Please provide a valid email"),

    body("startDate")
        .trim()
        .notEmpty()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("Please provide a valid date yyyy-mm-dd"),

    body("username")
    .trim()
    .notEmpty()
    .isLength({min: 5})
    .withMessage("Please enter a user name with a length of 5")

  

    ]
}

val.postEmployeeCheck = async(req, res, next) => {
  
    const  {firstName, lastName, birthday, phone, email, startDate, username} = req.body
   let errors = []
   errors =  validationResult(req)

   if(!errors.isEmpty()){
       console.log("Rule violation in postEmployeeCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
   }
   else{
       console.log("It passed the postEmployeeCheck and associated rules.  Proceeding with creation operation")
   }
   next()
}

val.putEmployeeRules = () =>{
    return[
        body("firstName")
        .trim()
        .notEmpty()
        .isLength({ min: 1})
        .withMessage("Please provide a first name with at least 1 letter"),

    body("lastName")
    .trim()
    .notEmpty()
    .isLength({ min: 1})
    .withMessage("Please provide a last name with at least 1 letter"),
 
    body("birthday")
    .trim()
    .notEmpty()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
  
    .withMessage("Please provide a birthday in the following format yyyy-mm-dd"),

    body("phone")
    .trim()
    .isLength({min: 10})
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage("Please enter a phone number in the following format xxx-xxx-xxxx")
    ,

    body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .isLength({ min: 4})
    .withMessage("Please provide a valid email"),

    body("startDate")
        .trim()
        .notEmpty()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("Please provide a valid date yyyy-mm-dd"),

    body("username")
    .trim()
    .notEmpty()
    .isLength({min: 5})
    .withMessage("Please enter a user name with a length of 5")

  

    ]
}

val.putEmployeeCheck = async(req, res, next) => {
    const _id = req.params.id
    const {firstName, lastName, birthday, phone, email, startDate, username} = req.body
   let errors = []
   errors =  validationResult(req)

   if(!errors.isEmpty()){
       console.log("Rule violation in putEmployeeCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
   }
   else{
       console.log("It passed the putEmployeeCheck and associated rules.  Proceeding with update operation")
   }
   next()
}



val.deleteEmployeeRules = () => {
    return [

        body('_id')
        .trim()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid employee id")
        .custom(
             async (_id, {req}) => {
            _id = new mDID(req.params.id)
            const employee = await mongodb.getDB().db().collection('employees').findOne({_id: _id})
            if(!employee) {
                throw new Error("employee ID isn't Valid!!!" )
            }
        })
    ]

}


val.deleteEmployeeCheck = async(req, res, next) => {
    const _id = req.params.id
    req.body = {_id}
   let errors = []
   errors =  validationResult(req)

   if(!errors.isEmpty()){
       console.log("Rule violation in deleteEmployeeCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
   }
   else{
       console.log("It passed the deleteEmployeeCheck and associated rules.  Proceeding with deletion operation")
   }
   next()
}


module.exports = val