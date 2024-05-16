const router = require('express').Router()
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../swagger-output.json')

router.use('/api-docs', swaggerUI.serve)
router.get('/api-docs', swaggerUI.setup(swaggerDoc))

router.get('/', (req, res)=>{
    res.send('Welcome to the team 4 Car Dealership App.  Available routes are "/vehicles, /dealerships, /employees, /customers, and /api-docs"')
})

router.use('/vehicles', require('./vehicleRoute'))
router.use('/dealerships', require('./dealershipRoute'))
router.use('/employees', require('./employeeRoute'))
router.use('/customers', require('./customerRoute'))

module.exports = router