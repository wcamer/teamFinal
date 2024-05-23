const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

// Get All Employees
const getAll = async (req, res) =>{
  // #swagger.tags["CUSTOMERS"];
  const result = await mDB.getDB().db().collection('employees').find();
  result.toArray().then((employees) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(employees);
  });
}

// Get single employee by ID
const getOne = async (req, res) =>{
    if (mDID.isValid(req.params.id)) {
      // #swagger.tags["EMPLOYEE"];
      const employeeId = new mDID(req.params.id);
      const result = await mDB
        .getDB()
        .db()
        .collection('employees')
        .find({ _id: employeeId });
      try {
        result.toArray().then((employees) => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(employees[0]);
        });
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } else {
      res
        .status(400)
        .json("Must use a valid employee id to find the employee's details.");
    }
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

// Delete Single Employee by ID
const deleteEmployee = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        /*
        #swagger.tags["EMPLOYEE"];
        */
        const employeeId = new mDID(req.params.id);
        const response = await mDB
            .getDB()
            .db()
            .collection('employees')
            .deleteOne({ _id: employeeId });
        
        if (response.deletedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json(
                response.error || "Some error occurred while removing the employee details."
            );
        }
    } else {
        res.status(400).json("Must use a valid employee id to delete the employee.")
    };
};

module.exports = {
    getAll,
    getOne,
    addEmployee,
    updateEmployee,
    deleteEmployee
}