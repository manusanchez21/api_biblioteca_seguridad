const express = require('express')
const { auth } = require("express-oauth2-jwt-bearer")
const app = express()
app.use(express.json())

const librosRouter = require('./routes/libros')
const errorHandler = require('./middlewares/errorHandler')

const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
});


const PORT = 3000

app.use("/libros", librosRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en le puerto ${PORT}`);
})