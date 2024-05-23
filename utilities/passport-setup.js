const passport = require('passport')
const dotenv = require('dotenv').config()
const ghStrat = require('passport-github2').Strategy

passport.use(new ghStrat({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
(accessToken, refreshToken, profile, done)=>{
    return done(null, profile)
    })

)


passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

module.exports = passport