import { Router } from "express"
import ProductManager from "../dao/ProductManagerMongo.js"
import { auth } from '../middlewares/auth.js';



const Producto = new ProductManager()
export const router = Router()
// let productos = await Producto.getProducts()


router.get("/", async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/html")
        res.status(200).render("home",{
            usuario:req.session.usuario
        }) //Para la vista home, paso la variable products
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({ Error: "Error 500 - Error inesperado en el servidor ((vista / ))" })        
    }
})


router.get("/products", async (req, res) => {
    try {
        let productos = await Producto.getProducts()
        res.setHeader("Content-Type", "text/html")
        res.status(200).render("products",{productos})
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({ Error: "Error 500 - Error inesperado en el servidor" })        
    }
   
})

router.get("/chatws", async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/html")
        res.status(200).render("chat")
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({ Error: "Error 500 - Error inesperado en el servidor" })        
    }
    
   
})


router.get('/registro',(req,res)=>{
    try {
        res.setHeader("Content-Type", "text/html")
        res.status(200).render("registro")
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({ Error: "Error 500 - Error inesperado en el servidor" })        
    }
})



router.get('/login',(req,res)=>{

    let {error}=req.query

    res.status(200).render('login', {error})
})



router.get('/perfil', auth, (req,res)=>{

    res.status(200).render('perfil',{
        usuario:req.session.usuario}
    )
})

