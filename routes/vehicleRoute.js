const router = require('express').Router()
const vehicleCon = require('../controllers/vehicleController')
const val = require('../utilities/vehicleValidation')
const checker = require('../utilities/auth')

// getAll Vehicle
router.get('/', vehicleCon.getAll)

// getSingle vehicle
router.get('/:id', val.getVehicleRules(), val.getVehicleCheck, vehicleCon.getOne)

// post/add vehicle
router.post('/', checker.userCheck, checker.authCheck, val.postVehicleRules(), val.postVehicleCheck, vehicleCon.addVehicle)

// put/update vehicle
router.put('/:id', checker.userCheck, checker.authCheck, val.putVehicleRules(), val.putVehicleCheck, vehicleCon.updateVehicle)

// delete vehicle
router.delete('/:id', checker.userCheck, checker.authCheck, val.deleteVehicleRules(), val.deleteVehicleCheck, vehicleCon.deleteVehicle)



module.exports = router;