import {fileURLToPath} from 'url';
import {dirname} from 'path';
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY, JWT_COOKIE_NAME } from './config/credentials.js';
import passport from 'passport'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bcrypt from 'bcrypt'



export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const IsValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// JWT

export const createToken = (user) => {
    const token = jwt.sign ({user}, JWT_PRIVATE_KEY, {expiresIn:'24h'} )
    return token
}
export const extractCookie = req =>{
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}

export const passportCall = (Strategy) => {
    return (req, res, next) => {
        passport.authenticate(Strategy, (err, user, info) => {
            if (err) return next (err)
            if (!user)  return res.status(401).render('errors/db', {error: info.messages ? info.messages : info.toString()}) 
            req.user = user
            next()
        })(req, res, next)
    }
}

export default __dirname;



