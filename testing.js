import ProductManager from "./src/dao/ProductManager.js"

const Product = new ProductManager()

let executeAsyncFunctions = async () => {
    await Product.getProducts()
    await Product.addProduct("Pantalon", "Dog Town", 3000, "./img1", "004", 1, "indumentaria", true)
    // await Product.updateProduct(2,"Notebook", "Hp", 3000, "./img1", "007", 10, "electronica", true)
    // await Product.deleteProduct(3)
    // await Product.deleteProduct(2)
    // await Product.getProductById(1)

}

// executeAsyncFunctions()


// export {Product};