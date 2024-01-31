const express = require("express")
const router = express.Router()

const Libro = require("../models/libro")

const { requiredScopes } = require("express-oauth2-jwt-bearer")

router.get("/", requiredScopes("read:libros"), async (req, res, next) => {
    try {
        const libros = await Libro.find()
        res.json(libros)
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los libros" })
    }
})

router.post("/", requiredScopes("write:libros"), async (req, res, next) => {
    try {
        const nuevoLibro = new Libro(req.body)
        await nuevoLibro.save()
        res.json(nuevoLibro)
    } catch (err) {
        res.status(400).json({ error: "Error al crear el libro" })
    }
})

router.put("/:id", requiredScopes("write:libros"), async (req, res, next) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(libro)
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar el libro" })
    }
})

router.delete("/:id", requiredScopes("write:libros"), async (req, res, next) => {
    try {
        await Libro.findByIdAndDelete(req.params.id)
        res.json({ message: "Libro eliminado" })
    } catch (err) {
        res.status(400).json({ error: "Error al eliminar el libro" })
    }
})

module.exports = router