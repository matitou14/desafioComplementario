import {Router} from 'express'
import {createRegister, createUser, seeLogin ,loginUser, logoutUser} from '../controllers/userControllers.js'

const router = Router()

//Vista para registrar users

router.get('/register', createRegister)

// API para crear usuarios

router.post('/register',createUser)
// Vista de login

router.get('/login', seeLogin)

// API para loguear usuarios

router.post('/login', loginUser)

// Cerrar sesion

router.get('/logout', logoutUser)

export default router;
