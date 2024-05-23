const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

// Get All Dealerships
const getAll = async (req, res) => {
    // #swagger.tags["DEALERS"];
    const result = await mDB.getDB().db().collection('dealerships').find();
    result.toArray().then((dealerships) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(dealerships);
    });
};

// Get One dealership's details by ID
const getOne = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        // #swagger.tags["DEALERS"];
        const dealershipId = new mDID(req.params.id);
        const result = await mDB
            .getDB()
            .db()
            .collection('dealerships')
            .find({ _id: customerId });
        try {
            result.toArray().then((dealerships) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(dealerships[0]);
            });
        } catch (err) {
            res.status(400).json({ message: err });
        }
    } else {
        res
            .status(400)
            .json("Must use a valid dealership id to find the dealer's details.");
    };
};

// Add/POST new delear details
const addDealership = async (req, res) => {
    const dealership = {
        name: req.body.name,
        address: req.body.address,
        state: req.body.state,
        zip: req.body.zip
    };
    const response = await mDB.getDB().db().collection('dealerships').insertOne(dealership);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the dealership.')
    }
};

// Update/Put existing dealer details by ID
const updateDealership = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a dealership.');
    }
    const dealershipId = new mDID(req.params.id);
    const dealership = {
        name: req.body.name,
        address: req.body.address,
        state: req.body.state,
        zip: req.body.zip
    };
    const response = await mDB.getDB().db().collection('dealerships').replaceOne({_id: dealershipId}, dealership);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the dealership.')
    }
};

// Delete Dealership by ID
const deleteDealership = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        /*
        #swagger.tags["DEALER"];
        */
        const dealershipId = new ObjectId(req.params.id);
        const response = await mDB
            .getDB()
            .db()
            .collection('dealerships')
            .deleteOne({ _id: dealershipId });
        
        if (response.deletedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json(
                response.error || "Some error occurred while removing the dealer's details."
            );
        }
    } else {
        res.status(400).json("Must use a valid dealership id to delete the dealer.")
    }
};

module.exports = {
    getAll,
    getOne,
    addDealership,
    updateDealership,
    deleteDealership
}