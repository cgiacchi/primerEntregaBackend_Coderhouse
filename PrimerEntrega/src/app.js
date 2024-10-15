import express from 'express';
import config from './config.js';
import productsRouter from './routes/products.router.js';
import  viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars'
import {Server} from socket.io;


const socketServer = new Server(httpServer);
socketServer.on('connection', socket =>{
    console.log('connection correct');
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('api/products', productsRouter);
app.use('api/carts', cartsRouter);
app.use('/views', viewsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));     


const httpServer = app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});