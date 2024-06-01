const router = require('express').Router()
const dealershipCon = require('../controllers/dealershipController')
const val = require('../utilities/dealershipValidation')
const checker = require('../utilities/auth')

//getAll Dealerships
router.get('/', dealershipCon.getAll)

//getSingle Dealership
router.get('/:id', val.getDealershipRules(), val.getDealershipCheck, dealershipCon.getOne)

//add Dealership
router.post('/', checker.userCheck, checker.authCheck, val.postDealershipRules(), val.postDealershipCheck, dealershipCon.addDealership)

//update Dealership
router.put('/:id', checker.userCheck, checker.authCheck, val.putDealershipRules(), val.putDealershipCheck, dealershipCon.updateDealership)

//delete Dealership
router.delete('/:id', checker.userCheck, checker.authCheck, val.deleteDealershipRules(), val.deleteDealershipCheck, dealershipCon.deleteDealership)

module.exports = router;