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


val.getCustomerCheck = async (req, res, next) => {
    const _id = req.params.id
     req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getCustomerCheck!!! Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getCustomerCheck and associated rules. Proceeding with retrieval operation")
    }
    next()
}

val.postCustomerRules = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name with at least 1 letter"),

    body("lastName")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a last name with at least 1 letter"),

    body("birthday")
      .trim()
      .notEmpty()
      .matches(/^\d{4}-\d{2}-\d{2}$/)

      .withMessage(
        "Please provide a birthday in the following format yyyy-mm-dd"
      ),

    body("phone")
      .trim()
      .isLength({ min: 10 })
      .matches(/^\d{3}-\d{3}-\d{4}$/)
      .withMessage(
        "Please enter a phone number in the following format xxx-xxx-xxxx"
      ),
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .isLength({ min: 4 })
      .withMessage("Please provide a valid email"),

    body("username")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Please enter a user name with a length of 5"),
  ];
};

val.putCustomerRules = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name with at least 1 letter"),

    body("lastName")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a last name with at least 1 letter"),

    body("birthday")
      .trim()
      .notEmpty()
      .matches(/^\d{4}-\d{2}-\d{2}$/)

      .withMessage(
        "Please provide a birthday in the following format yyyy-mm-dd"
      ),

    body("phone")
      .trim()
      .isLength({ min: 10 })
      .matches(/^\d{3}-\d{3}-\d{4}$/)
      .withMessage(
        "Please enter a phone number in the following format xxx-xxx-xxxx"
      ),
    
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .isLength({ min: 4 })
      .withMessage("Please provide a valid email"),

    body("username")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Please enter a user name with a length of 5"),
  ];
};

val.putCustomerCheck = async (req, res, next) => {
  const _id = req.params.id;
  const { firstName, lastName, birthday, phone, email, username } = req.body;
  let errors = [];
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Rule violation in putCustomerCheck!!! Operation cancelled");
    res.status(400).json({ Message: errors });
    return;
  } else {
    console.log(
      "It passed the putCustomerCheck and associated rules. Proceeding with update operation."
    );
  }
  next();
};

val.deleteCustomerRules = () => {
  return [
    body("_id")
      .trim()
      .isLength({ min: 0, max: 24 })
      .withMessage("Please enter a valid customer id")
      .custom(async (_id, { req }) => {
        _id = new mDID(req.params.id);
        const employee = await mongodb
          .getDB()
          .db()
          .collection('customers')
          .findOne({ _id: _id });
        if (!employee) {
          throw new Error("customer ID isn't Valid!!!");
        }
      }),
  ];
};

module.exports = val