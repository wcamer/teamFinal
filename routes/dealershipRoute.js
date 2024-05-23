const router = require('express').Router()
const dealershipCon = require('../controllers/dealershipController')
const val = require('../utilities/dealershipValidation')

router.get('/', dealershipCon.getAll)
router.get('/:id', val.getDealershipRules(), val.getDealershipCheck, dealershipCon.getOne)
router.post('/', dealershipCon.addDealership)
router.put('/:id', dealershipCon.updateDealership)
router.delete('/:id', dealershipCon.deleteDealership)

module.exports = router;