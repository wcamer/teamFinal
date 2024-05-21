const obj = {}
const db = require('../database/db')

obj. userCheck = async (req, res, next) =>{
    console.log("Checking for logged in user...")
    if(req.session.user === undefined){
        console.log("No users are logged in")
        res.redirect('../login')
        return
    }
    next()

}

obj.authCheck = async (req, res, next) =>{
    console.log("Checking Authorization...")
    const admins = db.getDB().db().collection('admins').find().toArray()

    if(!admins.includes(req.session.user.id)){
        res.status(400).json("You don't have access for this action")
        return
    }else{
        console.log("Authorization Confirmed!!!")
        next()
    }


}


module.exports = obj