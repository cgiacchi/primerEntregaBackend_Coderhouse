import express from 'express';
import config from './config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('api/products', productsRouter);
app.use('api/carts', cartsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));     


app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});