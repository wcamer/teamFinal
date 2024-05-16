const mongoClient= require('mongodb').MongoClient
const env = require('dotenv').config()

let dbfuncts = {}
let db;

dbfuncts.init = (callback) => {
    if (db) {
        console.log("Database already has been initialized ")
        return callback(null,db)
    }

    mongoClient.connect((process.env.CONNECTION_STRING + "CarDealership")).then((client) => {
        db = client
        callback(null, db)
    })
    .catch((err) => {
        console.log("There is an error: ", err)
    })
}

dbfuncts.getDB = () => {
    if(!db){
        throw Error("Database hasn't been initialized")
    }
    return db
}

module.exports = dbfuncts;