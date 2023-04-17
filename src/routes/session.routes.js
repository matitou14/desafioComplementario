import {Router} from 'express'
import {createRegister, createUser, seeLogin ,loginUser, logoutUser, loginGithub, loginGithubCallback, currentSession} from '../controllers/userControllers.js'

const router = Router()

//Vista para registrar users

router.get('/register', createRegister)

// API para crear usuarios

router.post('/session/register',createUser)
// Vista de login

router.get('/session/login', seeLogin)

// API para loguear usuarios

router.post('/session/login', loginUser)

// Vista logueo con github

router.get('/api/session/github', loginGithub)

// API logueo github

router.get('/api/session/githubcallback', loginGithubCallback)

// Current

router.get('/current', currentSession)

// Cerrar sesion

router.post('/session/logout', logoutUser)

export default router;
