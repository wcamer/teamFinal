const router = require('express').Router()
const passport = require('passport')

router.use("/", require("./swagger"));
router.use("/vehicles", require("./vehicleRoute"));
router.use("/dealerships", require("./dealershipRoute"));
router.use("/employees", require("./employeeRoute"));
router.use("/customers", require("./customerRoute"));

router.get('/', (req, res)=>{
    let user
    if(req.session.user === undefined){
        user = "Visitor"
    }else{
        user = req.session.user.username
    }
    res.send(`Welcome ${user} to the team 4 Car Dealership App.  Available routes are "/vehicles, /dealerships, /employees, /customers, and /api-docs"`)
})

// log in
router.use('/login', passport.authenticate('github'), (req, res) => { });

// log out
router.use('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    });
});

module.exports = router;