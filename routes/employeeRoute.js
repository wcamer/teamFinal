const router = require('express').Router()
const employeeCon = require('../controllers/employeeController')
const val = require('../utilities/employeeValidation')
const checker = require('../utilities/auth')

router.get('/', employeeCon.getAll)
router.get('/:id', val.getEmployeeRules(), val.getEmployeeCheck, employeeCon.getOne)
router.post('/', checker.userCheck, checker.authCheck, employeeCon.addEmployee)
router.put('/:id',checker.userCheck, checker.authCheck, employeeCon.updateEmployee)
router.delete('/:id', checker.userCheck, checker.authCheck, employeeCon.deleteEmployee)



module.exports = router