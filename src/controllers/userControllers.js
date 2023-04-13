
import UserModel from '../dao/models/user.models.js'
import {createHash} from '../utils.js/'
import { IsValidPassword } from '../utils.js'
import passport from 'passport';

// Register
export const createRegister = (req, res) => {
    res.render('sessions/register');
  };
  
  export const createUser = async (req, res) => {
    const userNew ={
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: createHash(req.body.password)
    }
    const user = new UserModel(userNew);
    await user.save();

    // Login
  
    res.redirect('/session/login');
  };
  export const seeLogin = (req, res) => {
    res.render('sessions/login');
  };
  
  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email}).lean().exec();
    
  if (!user) {
      return res.status(401).render('errors/db', {
        error: 'Usuario no encontrado'
    });
  }
  if (!IsValidPassword (user, password))  
    return res.status(403).send({ status:"error", error:"Contraseña incorrecta"})

      req.session.user = user;
  
    res.redirect('/products',);
  };

  // login github

  export const loginGithub = passport.authenticate('github', {scope: ['user:email']});

  export const loginGithubCallback = passport.authenticate('github', { 
    failureRedirect: '/session/login' 
  }, (req, res) => {
    if (req.session) {
      req.session.user = req.user;
    }
    if (res) {
      res.redirect('/');
    }
  });
  // Logout
  export const logoutUser = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).render('errors/db', {
          error: 'Error al cerrar sesion'
        })
      }
      res.redirect('/session/login')
    })
  }
  

