import mongoose from "mongoose";
// 

export const productsModel=mongoose.model(
    "products",    // "producto"   "product"   "pet"   "car"
    new mongoose.Schema(
        {
            descripcion: String, 
            codigo: {type: String, unique: true, required: true},
            precio: Number, 
            stock: {
                type: Number, default: 0
            }
        },
        {
            timestamps: true, collection: "products"
        }
    )
)