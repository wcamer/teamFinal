const { ObjectId } = require('mongodb');
const mDB = require('../database/db')
const mDID = require('mongodb').ObjectId

// Get All Cars
const getAll = async (req, res) => {
  /*
  #swagger.tags["Cars"];
  */
    const result = await mDB.getDB().db().collection("vehicles").find();
    result.toArray().then((vehicles) => {
        res.setHeader("Content-Type", "application/json");
        res.json(vehicles);
    })
}

// Get Single Laptop by ID
const getOne = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        const carId = new mDID(req.params.id);
        const result = await mDB
            .getDB()
            .db()
            .collection("vehicles")
            .find({ _id: carId });
        try {
            result.toArray().then((vehicles) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(vehicles[0]);
            });
        } catch (err) {
            res.status(400).json({ message: err })
        }
    } else {
        res.status(400).json("Must use a valid laptop id to find the laptop.")
    }
};

// Create/POST New Vehicle
const addVehicle = async (req, res) => {
  /*
  #swagger.tags["Vehicles"];
  */
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    trim: req.body.trim,
    year: req.body.year,
    mileage: req.body.mileage,
    price: req.body.price,
  };
  const response = await mDB
    .getDB()
    .db()
    .collection("vehicles")
    .insertOne(vehicle);
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the vehicle.");
  }
};

// Update/PUT Existing Laptop by ID
const updateVehicle = async (req, res) => {
    if (!mDID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a vehicle.');
    }
    const vehicleId = new mDID(req.params.id);
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        trim: req.body.trim,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price
    };
    const response = await mDB.getDB().db().collection('vehicles').replaceOne({_id: vehicleId}, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the vehicle.')
    }
};

// Delete Vehicle by ID
const deleteVehicle = async (req, res) => {
    if (mDID.isValid(req.params.id)) {
        /*
        #swagger.tags["Vehicle"];
        */
        const vehicleID = new ObjectId(req.params.id);
        const response = await mDB
          .getDB()
          .db()
          .collection("vehicles")
          .deleteOne({ _id: vehicleId });
        
        if (response.deletedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json(
                response.error || "Some error occurred while removing the vehicle details."
            );
        }
    } else {
        res.status(400).json("Must use a valid vehicle id to delete the vehicle.")
    }
}

module.exports = {
    getAll,
    getOne,
    addVehicle,
    updateVehicle,
    deleteVehicle
}