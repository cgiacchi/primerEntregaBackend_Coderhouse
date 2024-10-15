import { Router } from "express";
import { products } from './products.router.js';


const router = Router();


router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts(); 
    res.status(200).render('realTimeProducts', { products });
});
router.get('/', (req, res) => {
    const data={
        firstName:'Carlos'
    }
    res.status(200).render('index', data)
}
)


export default router;