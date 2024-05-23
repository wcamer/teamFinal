const router = require('express').Router()
const customerCon = require('../controllers/customerController')
const val = require('../utilities/customerValidation')

router.get('/', customerCon.getAll)
router.get('/:id', val.getCustomerRules(), val.getCustomerCheck, customerCon.getOne)
router.post('/', customerCon.addCustomer)
router.put('/:id', customerCon.updateCustomer)
router.delete('/:id', customerCon.deleteCustomer)

module.exports = router;