import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserModel from './models/userModel.js'
import * as dotenv from 'dotenv'

// loading .env file
dotenv.config()

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}


const jwtVerify = async (payload, next) => {
    console.log(`payload`, payload)
    try {
        const user = await UserModel.findById(payload.id).populate('restaurants')
        console.log(user)
        if (!user) {
            return next(null, false)
        }
        return next(null, user)
    } catch (error) {
        next(error, false)
    }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)


