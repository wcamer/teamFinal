const router = require('express').Router()
const vehicleCon = require('../controllers/vehicleController')
const val = require('../utilities/vehicleValidation')

router.get('/', vehicleCon.getAll)
router.get('/:id', val.getVehicleRules(), val.getVehicleCheck, vehicleCon.getOne)
router.post('/', vehicleCon.addVehicle)
router.put('/:id', vehicleCon.updateVehicle)
// router.delete('/:id', vehicleCon.deleteVehicle)



module.exports = router