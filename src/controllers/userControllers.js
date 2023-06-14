import passport from 'passport';
import { JWT_COOKIE_NAME } from '../config/credentials.js';
import { success } from '../responses/user.response.js';
import { createHash } from '../utils.js';
import {createUser} from '../services/users.service.js';
import logger from '../config/logger.js'
import { generateResetToken } from '../utils.js';
import jwt from 'jsonwebtoken';
import { resetPassword as resetPasswordService } from '../services/users.service.js';
const LOCAL_STRATEGY_NAME = 'local';
const TOKEN_SECRET ='wowisbackend'

// Register
export const createRegister = (req, res) => {
  res.render('sessions/register');
};

export async function createUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await createHash(password);
    const user = await createUser({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
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
        error: 'Usuario no encontrado',
    });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
      const loginTime = new Date();
      logger.info(`User logged at ${loginTime}`);
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
    logger.info(req.session.user);
  }
  if (res) {
    res.redirect('/products');
  }
});

// Get Current User
export const currentSession = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const userDTO = new userDTO(user);
    res.json(userDTO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login');
  logger.info('User logged out');

};
export const sendResetEmail = async (email) => {
  const resetToken = generateResetToken(email);
  const resetUrl = `http://localhost:8080/reset-password?token=${resetToken}`;

  const mailOptions = {
    to: email,
    subject: 'Restablecer contraseña',
    html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetUrl}">Restablecer contraseña</a>`,
  };

  try {
    await sendEmail(mailOptions);
    console.log('Correo electrónico enviado');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Error al enviar el correo electrónico');
  }
};


export function renderResetPasswordPage(req, res) {
<<<<<<< HEAD
  const { token } = req.params;
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // El token es inválido o ha expirado, redirigir a una página para generar un nuevo correo de restablecimiento
      return res.redirect('/generar-nuevo-correo');
    }

    // El token es válido, renderizar la vista de restablecimiento de contraseña
    res.render('reset-password', { token });
  });
}

export function resetPassword(req, res) {
  const { token, password } = req.body;
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // El token es inválido o ha expirado, redirigir a una página para generar un nuevo correo de restablecimiento
      return res.redirect('/generar-nuevo-correo');
    }

    // El token es válido, procesar el restablecimiento de contraseña utilizando el servicio correspondiente
    resetPasswordService(decoded.email, password);

    // Redirigir al usuario a la página de inicio de sesión con un mensaje de éxito
    res.redirect('/login');
  });
=======
  const token = req.params.token;
  res.render('resPas', { token });
>>>>>>> 165cd5df685b135fb84c685143afa17d20ad09b4
}
