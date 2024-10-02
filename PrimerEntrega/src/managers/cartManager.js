import fs from 'fs';
import path from 'path';



class CartManager {
    constructor(filePath) {
        this.path = filePath;
    };

    async createCart() {
        try {
            const carts = await this.getCarts();
            const maxId = carts.length > 0 ? Math.max(...carts.map(e => +e.id)) : 0;
            const newCart = {
                id: maxId+1,
                products: []
            }
            carts.push(newCart); 
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            console.log('Cart created successfully.');
            }
            catch (error) {
                console.error("Error creating the cart:", error);
            }
        }
    
    async addToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cartFound = carts.find((cart) => cart.id === cartId);
            if(!cartFound) return console.log('Carrito inexistente.')
            const productExists = cartFound.products.find((product) => product.id === productId);
            if(productExists){
                productExists.quantity++
            }else{
                const product = {
                    productId : productId,
                    quantity : 1
                }
                cartFound.products.push(product);
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
                console.log("Product added to the cart.");
            }
        } catch (error) {
            console.error("Error adding product to the cart:", error);
        }
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            console.error("Error reading the carts:", error);
        }
    }

    async getCartById(cartId) {
        try {
            const carts = await this.getCarts();
            const cartFound = carts.find((cart) => cart.id === cartId);
            if(cartFound) {
                return cartFound.products;
            } else {
                console.log("Cart not found.");
            }
        } catch (error) {
            console.error("Error retrieving the cart by ID:", error);
        }   
    }
}

const cartManager = new CartManager('./data/carts.json');
export default cartManager;