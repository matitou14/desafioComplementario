import express from 'express'
import { Server} from 'socket.io';
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
// import routerViews from './routes/views.routes.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import sessionRouter from './routes/session.routes.js'
import session from 'express-session';
import mongo from 'connect-mongo';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';




const app = express()
const uri = "mongodb+srv://matitouthe14:Alejo.2510@cluster0.rexogvr.mongodb.net/ecommerce?retryWrites=true&w=majority"

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(session({
  store: MongoStore.create({
    mongoUrl: uri,
    dbname: 'ecommerce'




}),
  secret:'c0d3r',
  resave:true,
  saveUninitialized:true
  })),



// app.use('/', routerViews);
// app.use('/realtimeproducts', routerViews);
app.use('/session', sessionRouter);
app.use('/products', productRouter );
app.use('/carts', cartRouter );
app.use('/api/carts', cartRouter );
app.get('/', (req, res) => {
    res.send('Bienvenidos a Don Pedro Carnes!')});

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





