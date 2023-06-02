import { Router } from 'express';
import { createRegister, createUserController, seeLogin, loginUser, logoutUser, loginGithub, loginGithubCallback, currentSession, resetPassword,renderResetPasswordPage } from '../controllers/userControllers.js';

const router = Router();

router.get('/register', createRegister);
router.post('/session/register', createUserController);
router.get('/session/login', seeLogin);
router.post('/session/login', loginUser);
router.get('/api/session/github', loginGithub);
router.get('/api/session/githubcallback', loginGithubCallback);
router.get('/current', currentSession);
router.post('/session/logout', logoutUser);
router.get('/reset-password',renderResetPasswordPage);
router.post('/reset-password', resetPassword);
router.get('/reset-password/:token',renderResetPasswordPage);

export default router;
