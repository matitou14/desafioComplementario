import { Router } from 'express';
import { createRegister, createUserController, seeLogin, loginUser, logoutUser, loginGithub, loginGithubCallback, currentSession } from '../controllers/userControllers.js';

const router = Router();

router.get('/register', createRegister);
router.post('/session/register', createUserController);
router.get('/session/login', seeLogin);
router.post('/session/login', loginUser);
router.get('/api/session/github', loginGithub);
router.get('/api/session/githubcallback', loginGithubCallback);
router.get('/current', currentSession);
router.post('/session/logout', logoutUser);

export default router;
