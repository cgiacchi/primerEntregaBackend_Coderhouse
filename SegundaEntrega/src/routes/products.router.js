import { Router } from "express";
import productManager from "../managers/productManager.js";

const router = Router();

router.get('/', async (req,res) => {
    try{
        let limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        if (isNaN(limit)){
            return res.status(200).send({error: null, data: products});
        }
        const limitProducts = products.slice(0,limit);
        return res.status(200).send({error: null, data: limitProducts});
        }
        catch(err){
            res.status(500).send({error: "Error getting products"});
        }});
router.get('/:pid', async(req, res) =>{
    try{
        const productId = parseInt(req.params.pid);
        const products = await productManager.getProductbyId(productId);
        res.status(200).send({error:null, data: products});
    }
    catch(err){
        res.status(404).send({error: "Product not found"});
}
});


router.post('/', async (req, res) => {
    try{
        const product = req.body;
        const addProduct = await productManager.addProduct(product);
        res.status(200).send({error:null, data: addProduct});
    }
    catch(err){
        res.status(500).send({error: "Error adding the product"});
    }
});

router.put('/:pid', async(req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedData = req.body;
        const updatedProduct = await productManager.updateProduct(productId, updatedData);
        res.status(200).send({error:null, data: updatedProduct});
    }
    catch (err) {
        res.status(500).send({error:"Product update failed"});
    }
});


router.delete('/:pid', async(req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(productId);
        res.status(200).send({error:null, data: deletedProduct});
    }
    catch (err) {
        res.status(500).send({error:"Product deleted failed"});
    }
});

export default router;
