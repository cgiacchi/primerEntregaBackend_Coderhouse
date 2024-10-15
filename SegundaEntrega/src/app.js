import express from 'express';
import config from './config.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars'
import {Server} from socket.io;



const httpServer = app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});


const socketServer = new Server(httpServer);
socketServer.on('connection', socket => {
    console.log('Connection established');

    socket.emit("products", await manager.getProducts());

    socket.on("productoNuevo", async (product) => {
        console.log("Nuevo producto recibido:", product);
        await manager.addProduct(product);
        socketServer.emit("products", await manager.getProducts());
    });

    socket.on("eliminarProducto", async (idProducto) => {
        await manager.deleteProduct(idProducto);
        socketServer.emit("products", await manager.getProducts());
    });
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


router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const addProduct = await productManager.addProduct(product);
        
        socketServer.emit('products', await productManager.getProducts());
        res.status(200).send({error: null, data: addProduct});
    } catch (err) {
        res.status(500).send({error: "Error adding the product"});
    }
});