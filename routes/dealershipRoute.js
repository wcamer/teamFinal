const router = require('express').Router()
const dealershipCon = require('../controllers/dealershipController')
const val = require('../utilities/dealershipValidation')

router.get('/', dealershipCon.getAll)
router.get('/:id', val.getDealershipRules(), val.getDealershipCheck, dealershipCon.getOne)
// router.post('/', dealershipCon.createdealership)
// router.put('/:id', dealershipCon.updatedealership)
// router.delete('/:id', dealershipCon.deletedealership)



module.exports = router