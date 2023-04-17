import passport from 'passport'
import LocalStrategy from 'passport-local'
import passport_jwt from 'passport-jwt'
import UserModel from '../dao/models/user.models.js'
import GitHubStrategy from 'passport-github2';
import { createHash, IsValidPassword, createToken, extractCookie } from '../utils.js';
import { JWT_PRIVATE_KEY } from '../config/credentials.js';


const JWTStrategy = passport_jwt.Strategy
const ExtractJWT = passport_jwt.ExtractJwt

const intializePassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.4f2c951299e269bc',
        clientSecret: 'f68339fba2981dc813df6ccc818e8f29db57fe76',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await UserModel.findOne({ email: profile._json.email });
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 23,
                    email: profile._json.email,
                    password: '',
                };
                let result = await userService.create(newUser);
                done(null, result);
            } else {

                const isMatch = await user.verifyPassword('');
                if (!isMatch) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
                done(null, user);
            }
        } catch (error) {
            done(error, null);
        }
    }));
 
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {

        const {first_name, last_name, email, age } = req.body
        try {
            const user = await UserModel.findOne({email: username})
            if(user) {
                console.log("User already exits");
                return done(null, false)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const result = await UserModel.create(newUser)
            
            return done(null, result)
        } catch (error) {
            return done("[LOCAL] Error al obtener user " + error)
        }


    }))

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({email: username})
            if(!user) {
                console.log("User dont exist");
                return done(null, user)
            }

            if(!IsValidPassword(user, password)) return done(null, false)

            const token = createToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            
        }
    }))
 

}
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY,
    }, async (jwt_payload, done) => {
        done(null, jwt_payload)
  }))

   
  passport.serializeUser((user, done) => {

    done(null, user._id)
})

  passport.deserializeUser(async (id, done) => {

    const user = await UserModel.findById(id)
    done(null, user)
})




export default intializePassport