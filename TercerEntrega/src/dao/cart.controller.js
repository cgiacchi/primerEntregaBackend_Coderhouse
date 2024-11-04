import CartModel from './models/cart.model.js';
import config from '../config.js';

class CartController {
    constructor() {}

    get = async () => {
        try {
            return await CartModel.find().lean();
        } catch (err) {
            return err.message;
        }
        };

        getOne = async (data) => {
            try {
                console.log("data:", data);
                return await CartModel.findOne(data).lean();
            } catch (err) {
                console.error("Error al buscar el carrito:", err);
                return null;
            }
            };

    add = async (data) => {
        try {
            return await CartModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options = { new: true }) => {
        try {
            return await CartModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter) => {
        try {
            return await CartModel.findOneAndDelete(filter);
        } catch (err) {
            return err.message;
        }
    }

    addProduct = async (cartId, productId, quantity) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) return null;
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity || 1;
            } else {
                cart.products.push({ product: productId, quantity:  quantity || 1 });
            }
            await cart.save();
            return cart.populate('products.product');
        } catch (err) {
            return err.message;
        }
    }

    deleteProduct = async (cartId, productId) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) return null;
            cart.products = cart.products.filter(item => item.product.toString() !== productId);
            await cart.save();
            return cart.populate('products.product');
        } catch (err) {
            return err.message;
        }
    }  

    deleteAllProducts = async (cartId) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) return null;
            cart.products = [];
            await cart.save();
            return cart.populate('products.product');
        } catch (err) {
            return err.message;
        }
    }
        

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart){
                console.log("no existe el carrito");
                return null;
            } 
            console.log(cart);
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId.toString());
            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                return cart.populate('products.product');
            }else{
                console.log("producto no encontrado");
                return null;
            }
        } catch (err) {
            return err.message;
        }
    }
};
export default CartController;