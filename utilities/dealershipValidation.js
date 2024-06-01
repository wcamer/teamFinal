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
            _id = new mDID(req.params.id)
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


val.postDealershipRules = () => {
    return [
      body("name")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a name with at least 1 letter"),
  
      body("address")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an address with at least 1 letter"),
  
      body("state")
        .trim()
        .notEmpty()
        .matches(/^AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|NE$/)
  
        .withMessage(
          "Please provide the U.S. state abbreviation in all caps (Ex: VA, AZ, UT)"
        ),
  
      body("zip")
        .trim()
        .isInt()
        .isLength({ min: 5, max: 5 })
        .withMessage(
          "Please enter a valid zip code with at least 5 digits"
        )
    ];
  };


val.postDealershipCheck = async(req, res, next) => {
  
    const  {name, address, state, zip} = req.body
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
       console.log("Rule violation in postDealershipCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
    }
    else{
       console.log("It passed the postDealershipCheck and associated rules.  Proceeding with creation operation")
    }
    next()
};
  

val.putDealershipRules = () => {
    return [
        body("name")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a name with at least 1 letter"),
  
      body("address")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an address with at least 1 letter"),
  
      body("state")
        .trim()
        .notEmpty()
        .matches(/^AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|NE$/)
  
        .withMessage(
          "Please provide the U.S. state abbreviation in all caps (Ex: VA, AZ, UT)"
        ),
  
      body("zip")
        .trim()
        .isInt()
        .isLength({ min: 5 })
        .withMessage(
          "Please enter a valid zip code with at least 5 digits"
        )
    ];
};
  

val.putDealershipCheck = async (req, res, next) => {
    const _id = req.params.id;
    const { name, address, state, zip } = req.body;
    let errors = [];
    errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      console.log("Rule violation in putDealershipCheck!!! Operation cancelled");
      res.status(400).json({ Message: errors });
      return;
    } else {
      console.log(
        "It passed the putDealershipCheck and associated rules. Proceeding with update operation."
      );
    }
    next();
};


val.deleteDealershipRules = () => {
    return [
      body("_id")
        .trim()
        .isLength({ min: 0, max: 24 })
        .withMessage("Please enter a valid dealership id")
        .custom(async (_id, { req }) => {
          _id = new mDID(req.params.id);
          const dealership = await mongodb
            .getDB()
            .db()
            .collection('dealerships')
            .findOne({ _id: _id });
          if (!dealership) {
            throw new Error("dealership ID isn't Valid!!!");
          }
        }),
    ];
};

val.deleteDealershipCheck = async(req, res, next) => {
    const _id = req.params.id
    req.body = {_id}
   let errors = []
   errors =  validationResult(req)

   if(!errors.isEmpty()){
       console.log("Rule violation in deleteDealershipCheck!!!  Operation canceled")
       res.status(400).json({Message: errors})
       return
   }
   else{
       console.log("It passed the deleteDealershipCheck and associated rules.  Proceeding with deletion operation")
   }
   next()
};


module.exports = val;