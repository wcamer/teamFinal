const router = require('express').Router()
const customerCon = require('../controllers/customerController')
const val = require('../utilities/customerValidation')
const checker = require('../utilities/auth')

router.get('/', customerCon.getAll)
router.get('/:id', val.getCustomerRules(), val.getCustomerCheck, customerCon.getOne)
router.post('/', checker.userCheck, checker.authCheck,  customerCon.addCustomer)
router.put('/:id', checker.userCheck, checker.authCheck, customerCon.updateCustomer)
router.delete('/:id', checker.userCheck, checker.authCheck,  customerCon.deleteCustomer)

module.exports = router;