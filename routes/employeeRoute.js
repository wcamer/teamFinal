const router = require('express').Router()
const employeeCon = require('../controllers/employeeController')
const val = require('../utilities/employeeValidation')
const checker = require('../utilities/auth')

router.get('/', employeeCon.getAll)
router.get('/:id', val.getEmployeeRules(), val.getEmployeeCheck, employeeCon.getOne)
router.post('/',checker.userCheck, checker.authCheck, val.postEmployeeRules(), val.postEmployeeCheck,  employeeCon.addEmployee)
router.put('/:id',checker.userCheck, checker.authCheck, val.putEmployeeRules(), val.putEmployeeCheck,  employeeCon.updateEmployee)
router.delete('/:id', checker.userCheck, checker.authCheck, val.deleteEmployeeRules(), val.deleteEmployeeCheck,  employeeCon.deleteEmployee)

module.exports = router;