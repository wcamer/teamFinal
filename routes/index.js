const router = require('express').Router()
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../swagger-output.json')
const passport = require('passport')

router.use('/api-docs', swaggerUI.serve)
router.get('/api-docs', swaggerUI.setup(swaggerDoc))

router.get('/', (req, res)=>{
    let user
    if(req.session.user === undefined){
        user = "Visitor"
    }else{
        user = req.session.user.username
    }
    res.send(`Welcome ${user} to the team 4 Car Dealership App.  Available routes are "/vehicles, /dealerships, /employees, /customers, and /api-docs"`)
})

router.use('/vehicles', require('./vehicleRoute'))
router.use('/dealerships', require('./dealershipRoute'))
router.use('/employees', require('./employeeRoute'))
router.use('/customers', require('./customerRoute'))
router.use('/login', passport.authenticate('github', (req,res) =>{}))
router.use('/logout', (req,res,next) =>{
    req.logout((err) =>{
        if(err) {return next(err)}
        res.redirect('/')
    })
})

module.exports = router