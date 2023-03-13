import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
// import routerViews from './routes/views.routes.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import mongoose from 'mongoose'

const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
// app.use('/', routerViews);
// app.use('/realtimeproducts', routerViews);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter );
app.get('/', (req, res) => {
    res.send('Bienvenidos a Don Pedro Carnes!')});

const uri = "mongodb+srv://matitouthe14:Alejo.2510@cluster0.rexogvr.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database');
    const server = app.listen(8080, ( () => console.log('Server running on 8080 port')));
    server.on ('error', e => console.log(e));
  })
  .catch(error => {
    console.log('Error connecting to database', error);
    return
  });






