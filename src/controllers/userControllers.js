
import UserModel from '../dao/models/user.models.js'
import {createHash} from '../utils.js'
import { IsValidPassword } from '../utils.js'
import passport from 'passport';
import { JWT_COOKIE_NAME } from '../config/credentials.js';
import { createUser, } from '../services/users.service.js'


const LOCAL_STRATEGY_NAME = 'local';

// Register
export const createRegister = (req, res) => {
    res.render('sessions/register');
  };
  
  export const createUserController = async (req, res) => {
    const user = await createUser(req.body);
    res.json({ user });
  };
  

    
    
    // Login
  
  // res.redirect('/session/login');
  
  export const seeLogin = (req, res) => {
    res.render('sessions/login');
  };
  

  export const loginUser = (req, res, next) => {
    passport.authenticate(LOCAL_STRATEGY_NAME, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).render('errors/db', {
          error: 'Usuario no encontrado'
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
      });
    })(req, res, next);
  };

  // login github

  export const loginGithub = passport.authenticate('github', {scope: ['user:email']});

  export const loginGithubCallback = passport.authenticate('github', { 
    failureRedirect: '/session/login' 
  }, (req, res) => {
    if (req.session) {
      req.session.user = req.user;
      console.log(req.session.user);
    }
    if (res) {
      res.redirect('/');
    }
  });

  // Current

  export const currentSession = (req, res) => {
    const { first_name, last_name, email } = req.user;
    const user = {
      first_name,
      last_name,
      email,
    };
    res.json({ user });
  };
  
  


  // Logout
  export const logoutUser = (req, res) => {
  
      res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login')
   
  }
  

