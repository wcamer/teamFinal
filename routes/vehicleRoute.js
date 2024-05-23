const router = require('express').Router()
const vehicleCon = require('../controllers/vehicleController')
const val = require('../utilities/vehicleValidation')

// getAll Vehicle
router.get('/', vehicleCon.getAll)

// getSingle vehicle
router.get('/:id', val.getVehicleRules(), val.getVehicleCheck, vehicleCon.getOne)

// post/add vehicle
router.post('/', vehicleCon.addVehicle)

// put/update vehicle
router.put('/:id', vehicleCon.updateVehicle)

// delete vehicle
router.delete('/:id', vehicleCon.deleteVehicle)

module.exports = router;