const obj = {}
const db = require('../database/db')

obj. userCheck = async (req, res, next) =>{
    console.log("Checking for logged in user...")
    if(req.session.user === undefined){
        console.log("No users are logged in")
        // res.redirect('../login')
        res.status(400).json("You are not logged in")
        return
    }
    next()

}

obj.authCheck = async (req, res, next) =>{
    console.log("Checking Authorization...")
    const admins = await db.getDB().db().collection('admins').find().toArray()
    
    let adminList = []
    for(let i = 0; i < admins.length; i++){
        adminList.push(admins[i].githubID)
    }

    // console.log("admins: ", admins,"\n user id: ",req.session.user.id ,"\n adminlist: ", adminList)
    if(adminList.includes(req.session.user.id)){
        console.log("Authorization Confirmed!!!")
        next()
    }else{
        
        res.status(400).json("You don't have access for this action")
        console.log("Access Denied!!!")
        return
    }


}


module.exports = obj