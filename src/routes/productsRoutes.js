import {Router} from "express"
import ProductManager from "../dao/ProductManager.js"
import { upload } from "../../utils.js"
import { io } from "../app.js"
const router = Router()

const producto = new ProductManager()


router.get("/", async (req, res) => {

    try {
        let resultado = await producto.getProducts()

        //              QUERY PARAMS
        let limit = parseInt(req.query.limit)
        if (limit) {
            let productosLimitados = resultado.slice(0, limit)
            res.setHeader("Content-Type", "application/json")
            return res.json(productosLimitados)
        }
        //            FIN QUERY PARAMS
        res.setHeader("Content-Type", "application/json")
        res.json(resultado)

    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).res.json({ Error: "Error 500 - Error inesperado en el servidor (productsRoute" })
    }
})


router.get("/:pid", async (req, res) => {

    try {
        await producto.getProducts()

        //          P A R A M S
        let id = parseInt(req.params.pid)
        let resultado = await Producto.getProductById(id)
        res.setHeader("Content-Type", "application/json")
        return res.json(resultado)

    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({
            message: "Error 500 - Error inesperado en el Servidor"
        })
    }
})


router.post("/", upload.single("thumbnail"), async (req, res) => {
    
    try {
        await producto.getProducts() //Llamo a getProducts() para poder validar el código del producto

        let thumbnail = req.file.filename

        let { title, description, price, code, stock, category, status } = req.body

    
        if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({
                message: "Error 400 - No se enviaron todos los datos necesarios para crear un nuevo producto"
            })
        } 

        let codigoRepetido = producto.products.some(elem => elem.code === code)
        if (codigoRepetido) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({
                message: "Error 400 - El código del producto que se quiere agregar ya está repetido en otro producto"
            })
        }

        let nuevoProducto = await producto.addProduct({ title, description, price, thumbnail, code, stock, category, status })
        
        io.emit("listadoActualizado", nuevoProducto)//Emit para la vista handlebars/realtimeproducts

        res.setHeader("Content-Type", "application/json")
        return res.status(200).json(nuevoProducto)
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({
            message: "Error 500 - Error inesperado en el Servidor"
        })
    }
})


router.put("/:pid", async (req, res) => {

    try {
        
        await producto.getProducts()

        let id = parseInt(req.params.pid) //El id viene por params
        let { title, description, price, thumbnail, code, stock, category, status } = req.body //En el body viene el objeto

//                                          VALIDACIONES
        if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({
                message: "Error 400 - No se enviaron todos los datos necesarios para editar un producto"
            })
        }

        let codigoRepetido = producto.products.some(elem => elem.code === code)
        if (codigoRepetido) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({
                message: "Error 400 - El código del producto que se quiere agregar ya está repetido en otro producto"
            })
        }

        let nuevoProducto = await producto.updateProduct(id, {title, description, price, thumbnail, code, stock, category, status})
        res.setHeader("Content-Type", "application/json")
        return res.status(200).json(nuevoProducto)

    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({ error: "Error en el Servidor al devolver el producto a editar" })
    }
})


router.delete("/:pid", async (req, res) => {
    try {
        await producto.getProducts()
        let id = parseInt(req.params.pid)
        let producto = await producto.deleteProduct(id)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(producto)
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({ error: "Error en el Servidor al querer eliminar el producto" })        
    }
})

export {router};