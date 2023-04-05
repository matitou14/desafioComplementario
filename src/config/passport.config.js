import passport from 'passport'
import userModel from '../dao/models/user.models.js'
import GitHubStrategy from 'passport-github2';

const intializePassport = () =>{
passport.use ('github', new GitHubStrategy({
    clientID: ' Iv1.4f2c951299e269bc',
    clientSecret: 'f68339fba2981dc813df6ccc818e8f29db57fe76',
    callbackURL:'http://localhost:8080/api/sessions/githubcallback',


}, async (accessToken, refreshToken, profile, done) => {
   try {
    console.log(profile);
    let user = await  userService.findOne({email:profile._json.email})
    if (!user) {
        let newUser = {
            first_name: profile._json.name,
            last_name:'',
            age: 23,
            email:profile._json.email,
            password: ''
        }
        let result = await userService.create(newUser);
        done(null, result)
   } 
else{
    done(null, user)
}
} catch (error) {
    done(error, null)
}
}))}


passport.serializeUser((user, done) => {
    
    done(null, user._id)
})

passport.deserializeUser (async (id, done) =>{

    const user = await userModel.findById(id)
    done(null, user)
    })


export default intializePassport