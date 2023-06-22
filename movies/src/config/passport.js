import passport from "passport"
import { Strategy } from 'passport-local'
import User from "../models/User.js"

export default function inicializePassport() {
	passport.use(
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'email' },
            async (req,userName,password,done) => {
                try {
                    let one = await User.findOne({ email:userName })
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null,user)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (userName,password,done) => {
                try {
                    let one = await User.findOne({ email:userName })
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.serializeUser((user,done) => done(null,user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        //console.log(id)
        return done(null,user)
    })
}