const express = require('express')
const app = express()
const mongodb = require('./database/db')
const bodyParser = require('body-parser')


const port = process.env.PORT || 3000


app.use(bodyParser.json())




app.use('/' , require('./routes'))

mongodb.init((err) =>{
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Database is connected and listening on port: ", port)})
    }
})