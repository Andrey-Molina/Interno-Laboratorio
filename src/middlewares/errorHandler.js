
const errorHandler = (error, req, res, next) => {
    if (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json(
            {
                error: "Error inesperado en el Servidor - (Middleware)"
            }
        )
    }
    next()
}

export {errorHandler}

//Middleware for error managing