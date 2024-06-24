import express from "express"
import {Server} from "socket.io"
import {engine} from "express-handlebars"
import {router as productsRouter} from "./routes/productsRoutes.js"
import {router as cartsRouter} from "./routes/cartsRoutes.js"
import {router as viewsRouter} from "./routes/viewsRouter.js"
import {errorHandler} from "./middlewares/errorHandler.js"
import mongoose from "mongoose";
import {__dirname} from "../utils.js"
import path from "path"

const PORT = 8080
const app = express()

let serverSocket

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "./src/views"))

app.use(express.static(path.join(__dirname,'./src/public')));

// router
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

let usuarios=[]
let mensajes=[]

app.get("*", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.status(404).json({
        message: "Error 404 - page not found (no route matched)"
    })
})

// app.use(errorHandler)

const server=app.listen(PORT,()=>{   // server http
    console.log(`Server escuchando en puerto ${PORT}`);
    console.log(__dirname)
});

const io=new Server(server)   // server websocket

io.on("connection", socket=>{
    console.log(`Se ha conectado un cliente con id ${socket.id}`)

    socket.on("id", nombre=>{
        usuarios.push({id:socket.id, nombre})
        socket.emit("mensajesPrevios", mensajes)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    socket.on("mensaje", (nombre, mensaje)=>{
        mensajes.push({nombre, mensaje})
        io.emit("nuevoMensaje", nombre, mensaje)
    })

    socket.on("disconnect", ()=>{
        let usuario=usuarios.find(u=>u.id===socket.id)
        if(usuario){
            io.emit("saleUsuario", usuario.nombre)
        }
    })
})

export {io}

    const connDB= async()=>{
        try {
            await mongoose.connect(
                "mongodb+srv://cluster0.vdkwxow.mongodb.net/ --apiVersion 1 --username andreymolina1",
                {
                    dbName:"dbTest"
                }
            )
            console.log("db online")
        }catch (e) {
            console.log("error al conectar con db", e.message)
        }
    }
    
    connDB();
    

// atlas credentials
// user: andreymolina1
// pass: mYB93nefc43eSINq
