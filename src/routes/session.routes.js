import {Router} from 'express'
import userModel from '../dao/models/user.models.js'

const router = Router()

//Vista para registrar users

router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios

router.post('/register', async (req, res) => {
    const userNew = req.body
    const user = new userModel(userNew)
    await user.save()

    res.redirect('/session/login')

})

// Vista de login

router.get('/login', (req, res) => {
    res.render('sessions/login')
});

// API para loguear usuarios

router.post('/login', async (req,res) =>{
    const {email, password} = req.body
    const user = await userModel.findOne({email, password}).lean().exec()
    if (!user) {
        return res.status(401).render('errors/db', {
            error: 'Usuario o contraseña incorrectos'
        })
    }
    req.session.user = user
    res.redirect('/products')
})

// Cerrar sesion

router.get ('/logout', (req, res) => {
    req.session.destroy()
    if (err) {
        console.log(err);
        res.status(500).render('errors/db', {})
    } else {
        res.redirect('/sessions/login')
    }
})

export default router;
