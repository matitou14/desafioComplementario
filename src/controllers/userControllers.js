
import UserModel from '../dao/models/user.models.js'



// Register
export const createRegister = (req, res) => {
    res.render('sessions/register');
  };
  
  export const createUser = async (req, res) => {
    const userNew = req.body;
    const user = new UserModel(userNew);
    await user.save();

    // Login
  
    res.redirect('/session/login');
  };
  export const seeLogin = (req, res) => {
    res.render('sessions/login');
  };
  
  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password }).lean().exec();
    
    if (!user) {
      return res.status(401).render('errors/db', {
        error: 'Usuario o contraseña incorrectos'
      });
    }
    
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123' ) {
      user.role = 'admin';
    }
  
    req.session.user = user;
  
    res.redirect('/products');
  };

  // Logout
  export const logoutUser = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).render('errors/db', {
          error: 'Error al cerrar sesion'
        })
      }
      res.redirect('/session/login')
    })
  }
  

