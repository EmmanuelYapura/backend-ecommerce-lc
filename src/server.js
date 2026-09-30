import express from "express";
import prisma from "./config/prisma.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoints para productos

app.get("/api/productos", async (req, res) => {
    try {
        const productos = await prisma.productos.findMany({
            include: {
                categorias: true
            }
        });

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

app.get("/api/productos/:id", async (req, res) => {
    const { id } = req.params;

    const uuidValido = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!uuidValido) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    try {
        const producto = await prisma.productos.findUnique({
            where: {
                id: id
            },
            include: {
                categorias: true
            }
        });

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto:", error);

        res.status(500).json({
            error: "Error al obtener el producto"
        });
    }
});

// Endpoints para categorias
app.get("/api/categorias", async (req, res) => {
    try {
        const categorias = await prisma.categorias.findMany({
            orderBy: {
                nombre: "asc"
            }
        });

        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);

        res.status(500).json({
            error: "Error al obtener las categorías"
        });
    }
});

app.get("/api/categorias/:id", async (req, res) => {
    const { id } = req.params;

    const uuidValido =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!uuidValido) {
        return res.status(400).json({
            error: "El ID de la categoría debe ser un UUID válido"
        });
    }

    try {
        const categoria = await prisma.categorias.findUnique({
            where: {
                id: id
            },
            include: {
                productos: true
            }
        });

        if (!categoria) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        res.json(categoria);
    } catch (error) {
        console.error("Error al obtener categoría:", error);

        res.status(500).json({
            error: "Error al obtener la categoría"
        });
    }
});