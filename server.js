const express = require('express')
const app = express()
const mongodb = require('./database/db')
const bodyParser = require('body-parser')
const passport = require('./utilities/passport-setup')
const session = require('express-session')


const port = process.env.PORT || 3000 


app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: true,
}))

app.use(passport.initialize())
.use(passport.session())
.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow0Methods', 'GET, POST, PUT, DELETE')
next()
})



app.use('/' , require('./routes'))

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req,res)=>{
        req.session.user = req.user;
        res.redirect('/')

    })

mongodb.init((err) =>{
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Database is connected and listening on port: ", port)})
    }
})