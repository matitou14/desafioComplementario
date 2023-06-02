import passport from 'passport';
import { JWT_COOKIE_NAME } from '../config/credentials.js';
import { success } from '../responses/user.response.js';
import { createHash } from '../utils.js';
import {createUser} from '../services/users.service.js';
import logger from '../config/logger.js'
import { generateResetToken } from '../utils.js';
import transporter  from '../helpers/nodemailerConfig.js';
const LOCAL_STRATEGY_NAME = 'local';

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

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = generateResetToken(email);
    const resetUrl = `http://localhost:8080/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: 'mat.rodri@gmail.com',
      to:'879779b1c1f9b9@inbox.mailtrap.io',
      subject: 'Don Pedro restablecer contraseña',
    html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetUrl}">Restablecer contraseña</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo electrónico enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico' });
  }
};
export function renderResetPasswordPage(req, res) {
  const token = req.params.token;
  res.render('resPas', { token });
}
