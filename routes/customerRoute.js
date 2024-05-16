const router = require('express').Router()
const customerCon = require('../controllers/customerController')
const val = require('../utilities/customerValidation')

router.get('/', customerCon.getAll)
router.get('/:id', val.getCustomerRules(), val.getCustomerCheck, customerCon.getOne)
// router.post('/', customerCon.createcustomer)
// router.put('/:id', customerCon.updatecustomer)
// router.delete('/:id', customerCon.deletecustomer)



module.exports = router