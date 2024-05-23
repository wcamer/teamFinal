const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

// Get All customers
const getAll = async (req, res) => {
    // #swagger.tags["CUSTOMERS"];
    const result = await mDB.getDB().db().collection('customers').find();
    result.toArray().then((customers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(customers);
    });
}

// Get Single Customer by ID
const getOne = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        // #swagger.tags["CUSTOMERS"];
        const customerId = new mDID(req.params.id);
        const result = await mDB
            .getDB()
            .db()
            .collection("customers")
            .find({ _id: customerId });
        try {
            result.toArray().then((customers) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(customers[0]);
            });
        } catch (err) {
            res.status(400).json({ message: err });
        }
    } else {
        res.status(400).json("Must use a valid customer id to find the customer's details.");
    }
};

// create/post new customer
const addCustomer = async (req, res) => {
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the customer.')
    }
};

// update/put existing customer's details by ID
const updateCustomer = async (req, res) => {
    // #swagger.tags["CUSTOMERS"];
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a customer.');
    }
    const customerId = new mDID(req.params.id);
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username
    };
    const response = await mDB.getDB().db().collection('customers').replaceOne({_id: customerId}, customer);
    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the customer.')
    }
};

// Delete Customer by ID
const deleteCustomer = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        /*
        #swagger.tags["CUSTOMERS"];
        */
        const customerId = new ObjectId(req.params.id);
        const response = await mDB
            .getDB()
            .db()
            .collection("customers")
            .deleteOne({ _id: customerId });
        
        if (response.deletedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json(
                response.error || "Some error occurred while removing the customer details."
            );
        }
    } else {
        res.status(400).json("Must use a valid customer id to delete the customer.")
    }
};

module.exports = {
    getAll,
    getOne,
    addCustomer,
    updateCustomer,
    deleteCustomer
}