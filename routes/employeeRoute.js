const router = require('express').Router()
const employeeCon = require('../controllers/employeeController')
const val = require('../utilities/employeeValidation')

router.get('/', employeeCon.getAll)
router.get('/:id', val.getEmployeeRules(), val.getEmployeeCheck, employeeCon.getOne)
// router.post('/', employeeCon.createEmployee)
// router.put('/:id', employeeCon.updateEmployee)
// router.delete('/:id', employeeCon.deleteEmployee)



module.exports = router