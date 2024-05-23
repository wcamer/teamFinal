const router = require('express').Router()
const vehicleCon = require('../controllers/vehicleController')
const val = require('../utilities/vehicleValidation')
const checker = require('../utilities/auth')

// getAll Vehicle
router.get('/', vehicleCon.getAll)

// getSingle vehicle
router.get('/:id', val.getVehicleRules(), val.getVehicleCheck, vehicleCon.getOne)

// post/add vehicle
router.post('/', checker.userCheck, checker.authCheck, vehicleCon.addVehicle)

// put/update vehicle
router.put('/:id', vehicleCon.updateVehicle)

// delete vehicle
router.delete('/:id', vehicleCon.deleteVehicle)

module.exports = router;