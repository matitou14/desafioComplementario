import express from 'express'
import { Server} from 'socket.io';
import path from 'path';
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
import config from '../src/config/config.js';
import mockingRouter from './routes/mockingProd.routes.js'
import logger from './config/logger.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



const app = express()


const swaggerOptions = {
  swaggerDefinition: {
    // openapi: '3.0.1',
    swagger: "2.0",
    info: {
      title: 'Documentacion proyecto Eccomerce Don Pedro',
      description: 'Documentacion de la API del proyecto',
      version: '1.0.0',
    },
    servers: [
      {url: 'http://localhost:8080'},
      {url: 'http://mysuperappi.io'},
      {url: 'http://superapi.com'}
    ]
  },
  
  apis: [
    `${__dirname}/../docs/products/products.yaml`,
    `${__dirname}/../docs/cart/cart.yaml`,
  ]
}
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
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.get('/loggerTest', (req, res) => {
  
  logger.debug('This is a debug message');
  logger.http('This is a Http message');
  logger.info('Testing the logger');
  logger.warning('This is a warning message');
  logger.fatal('This is an fatal error message');
  logger.error('This is an error message');

  res.send('The logger is working properly');
});

app.use('/mockingproducts', mockingRouter);
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});
app.use('/realtimeproducts', routerViews);
app.use('/', sessionRouter);
app.use('/products',passportCall ('jwt'), productRouter );
app.use('/api/carts', cartRouter );
app.get('/', (req, res) => {
  res.render('index')
});
app.get('/mail',async (req, res) => {
});
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
let messages = []

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to database');
    
    const server = app.listen(config.PORT, ( () => logger.info(`Server running on ${config.PORT} port`)));
    server.on ('error', e => console.log(e));
    const io = new Server(server)
    io.on('connection', socket => {
        console.log('New client connected');
        socket.on('disconnect', () => logger.http('Client disconnected'));
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

  export default app;