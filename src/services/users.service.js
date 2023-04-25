import UserModel from '../dao/models/user.models.js'
import {createHash} from '../utils.js'

export const createUser = async (userData) => {
  const userNew = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    age: userData.age,
    email: userData.email,
    password: createHash(userData.password)
  }
  const user = new UserModel(userNew);
  await user.save();
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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

export const logoutUser = (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login');
};

export const getCurrentUser = (req) => {
  const { first_name, last_name, email } = req.user;
  const user = {
    first_name,
    last_name,
    email,
  };
  return user;
};
