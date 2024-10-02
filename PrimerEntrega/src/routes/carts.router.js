import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const router = Router();

router.get('/:cid', async(req, res) =>{
    try{
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCart(cartId);
        res.status(200).send({error:null, data: cart});
    }
    catch(err){
        res.status(500).send({error: "Cart not found"});
}
});

router.post('/', async (req, res) => {
    try{
        const createCart = await cartManager.createCart();
        res.status(200).send({error:null, data: createCart});
    }
    catch(err){
        res.status(500).send({error: "Error showing cart"});
    }
});

router.post('/:cid/product/:pid ', async(req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const addToCart = await cartManager.addToCart(cartId, productId);
        res.status(200).send({error:null, data: addToCart});
    }
    catch (err) {
        res.status(500).send({error:"Product add to cart ID failed"});
    }
});

export default router;
