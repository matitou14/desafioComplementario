import {Router} from 'express'
import {createRegister, createUser, seeLogin ,loginUser, logoutUser, loginGithub, loginGithubCallback} from '../controllers/userControllers.js'

const router = Router()

//Vista para registrar users

router.get('/register', createRegister)

// API para crear usuarios

router.post('/register',createUser)
// Vista de login

router.get('/login', seeLogin)

// API para loguear usuarios

router.post('/login', loginUser)

// Vista logueo con github

router.get('/github', loginGithub)

// API logueo github

router.get('/github/callback', loginGithubCallback)

// Cerrar sesion

router.post('/logout', logoutUser)

export default router;
