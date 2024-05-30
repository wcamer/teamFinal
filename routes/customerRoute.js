const router = require('express').Router()
const customerCon = require('../controllers/customerController')
const val = require('../utilities/customerValidation')
const checker = require('../utilities/auth')

router.get('/', customerCon.getAll)
router.get('/:id', val.getCustomerRules(), val.getCustomerCheck, customerCon.getOne)
router.post(
    '/',
    checker.userCheck,
    checker.authCheck, 
    val.postCustomerRules(),
    val.postCustomerCheck, customerCon.addCustomer)
router.put(
  "/:id",
  checker.userCheck,
  checker.authCheck,
  val.putCustomerRules(),
  val.putCustomerCheck,
  customerCon.updateCustomer
);
router.delete(
  "/:id",
  checker.userCheck,
  val.deleteCustomerRules(),
  val.deleteCustomerCheck,
  checker.authCheck,
  customerCon.deleteCustomer
);

module.exports = router;