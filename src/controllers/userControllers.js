import passport from 'passport';
import { JWT_COOKIE_NAME } from '../config/credentials.js';
import { success } from '../responses/user.response.js';
import { createHash } from '../utils.js';
import  UserService  from '../services/users.service.js'

const LOCAL_STRATEGY_NAME = 'local';
const userService = new UserService();
// Register
export const createRegister = (req, res) => {
  res.render('sessions/register');
};

export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await createHash(password);
    const user = await createUser({ name, email, password: hashedPassword }); // fix typo
    success(res, "User created successfully", user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
}

// Login
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

// Login with GitHub
export const loginGithub = passport.authenticate('github', { scope: ['user:email'] });

export const loginGithubCallback = passport.authenticate('github', { 
  failureRedirect: '/session/login' 
}, (req, res) => {
  if (req.session) {
    req.session.user = req.user;
    console.log(req.session.user);
  }
  if (res) {
    res.redirect('/products');
  }
});

// Get Current User
export const currentSession = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const userDTO = new UserDtoDb(user);
    res.json(userDTO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login');
};
