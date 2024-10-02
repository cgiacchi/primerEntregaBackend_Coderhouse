    import fs from 'fs';

    class ProductManager{
        constructor(filePath){
            this.path = filePath;
        }
        async addProduct(product){
            try{
                const products = await this.getProduct();
                const maxId = products.length > 0 ? Math.max(...products.map(e => +e.id)) : 0;
                const { title, description, code, price, status, stock  } = product;
                const newProduct = {
                    id: maxId+1,
                    title: title,
                    description: description,
                    code: code,
                    price: price,
                    status: status,
                    stock: stock
            }
                const productRepeat = products.some(prod => prod.code === code);
                const incompleteValues = Object.values(newProduct).includes(undefined);
                if (incompleteValues) {
                    return console.log("Please fill every gap");
                }
                if (productRepeat) {
                    return console.log('This code already exists');
                }
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log("Product added.");
            }
            catch (error) {
                console.error("Error", error);
            }
        }

        
        async getProducts() {
            try {
                const productsData = await fs.promises.readFile(this.path, 'utf-8');
                if (!productsData.trim()) {
                    return [];
                }
                return JSON.parse(productsData);
            } catch (error) {
                console.error('Error at reading products json:', error);
                return [];
            }
        }

        async getProductById(productId) {
            try {
                const products = await this.getProducts();
                const filteredProduct = products.find(product => product.id === productId);
                console.log(productId);
                if(filteredProduct) {
                    return filteredProduct;
                };   
            } catch (error) {
                console.error("ID didn't match with products.");
            };
        };

        async updateProduct(id, prod) {
            try {
                const products = await this.getProducts();
                for(let key in products){
                    if(products[key].id == id){
                        products[key].title = prod.title ? prod.title : products[key].title;
                        products[key].description = prod.description ? prod.description : products[key].description;
                        products[key].code = prod.code ? prod.code : products[key].code;
                        products[key].price = prod.price ? prod.price : products[key].price;
                        products[key].status = prod.status ? prod.status : products[key].status;
                        products[key].stock = prod.stock ? prod.stock : products[key].stock;
                    }
                }
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            } catch (error) {   
                console.error("Error updating product", error);
            }
        };

    async deleteProduct(productId) {
        try {
            const products = await this.getProducts();
            const filteredProduct = products.find(product=> product.id === productId);
            if (filteredProduct) {
                products.splice(products.indexOf(filteredProduct), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log("Product deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
        }
    }

    const productManager = new ProductManager('./data/products.json');
    export default productManager;