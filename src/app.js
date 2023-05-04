import express from 'express'
import { Server} from 'socket.io';
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import routerViews from './routes/views.routes.js'
import handlebars from 'express-handlebars'
import __dirname, { isUser, passportCall } from './utils.js'
import mongoose from 'mongoose'
import session from 'express-session';
import sessionRouter from './routes/session.routes.js'
import morgan from 'morgan';
import intializePassport from './config/passport.config.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';

  


const app = express()
const uri = "mongodb+srv://matitouthe14:Alejo.2510@cluster0.rexogvr.mongodb.net/ecommerce?retryWrites=true&w=majority"

app.use(session({
  secret:'c0d3r',
  resave:true,
  saveUninitialized:true,
}));

intializePassport ();
app.use(passport.initialize());
app.use(passport.session())

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));






app.use('/realtimeproducts', routerViews);
app.use('/', sessionRouter);
app.use('/products',passportCall ('jwt'), productRouter );
app.use('/api/carts', cartRouter );
app.get('/', (req, res) => {
  res.render('index')
});


let messages = []



mongoose.set('strictQuery', false)
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database');
    
    const server = app.listen(8080, ( () => console.log('Server running on 8080 port')));
    server.on ('error', e => console.log(e));
    const io = new Server(server)
    io.on('connection', socket => {
        console.log('New client connected');
        socket.on('disconnect', () => console.log('Client disconnected'));
        socket.on('message', data => {
            messages.push(data)
            io.emit('logs', messages)
    
        });
    })

   
  })
  .catch(error => {
    console.log('Error connecting to database', error);
    return
  });





