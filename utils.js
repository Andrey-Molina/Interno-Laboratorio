import {fileURLToPath} from "url"
import {dirname, join} from "path"
import multer from "multer"
import crypto from "crypto"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/assets/img')
    },
    filename: function (req, file, cb) {
    //Valido que solo se puedan subir imagenes
    let tipo = file.mimetype.split("/")[0]
    if(tipo !== "image") {
        return cb(new Error("only img"))
    }
    
      cb(null, Date.now() + '-' + file.originalname)
    }
  })  
const upload = multer({ storage: storage })

export const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPasword=(password, passwordHash)=>bcrypt.compareSync(password, passwordHash)
export {__dirname, upload};
