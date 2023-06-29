import passport from "passport"
import { Strategy } from 'passport-local'
import GHStrategy from 'passport-github2'
import jwt from "passport-jwt"
import User from "../models/User.js"
const { GH_CLIENT,GH_SECRET } = process.env
const githubCb = 'http://localhost:8080/api/auth/github/callback'

export default function inicializePassport() {
    passport.use(
        'github',
        new GHStrategy(
            { clientID:GH_CLIENT,clientSecret:GH_SECRET,callbackURL:githubCb },
            async (accessToken,refreshToken,profile,done) => {
                try {
                    //console.log(profile)
                    let one = await User.findOne({ email:profile._json.login })
                    if (!one) {
                        let user = await User.create({
                            name:profile._json.name,
                            email:profile._json.login,
                            age:18,
                            photo:profile._json.avatar_url,
                            password:profile._json.id
                        })
                        return done(null,user)
                    }
                    return done(null,one)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
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
    passport.use(
        'jwt',
        new jwt.Strategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token']]),
            secretOrKey: process.env.SECRET
        },
        async (jwt_payload,done) => {
            try {
                //console.log(jwt_payload)
                let user = await User.findOne({ email:jwt_payload.email })
                console.log(user)
                if (user) {
                    delete user.password
                    return done(null, user)
                } else {
                    return done(null, false, {messages: 'user not found'})
                }
            } catch (error) {
                return done(error,false)
            }
        })
    )
    passport.serializeUser((user,done) => done(null,user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        //console.log(id)
        return done(null,user)
    })
}