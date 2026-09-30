import {
    obtenerProductos,
    obtenerProductoPorId
} from "../services/productos.service.js";


// funcion para listar productos con control de errores
export async function listarProductos(req, res) {
    try {
        const productos = await obtenerProductos();

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);

        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
}

// funcion para buscar un producto con errores
export async function buscarProductoPorId(req, res) {
    const { id } = req.params;

    const uuidValido =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!uuidValido) {
        return res.status(400).json({
            error: "El ID del producto debe ser un UUID válido"
        });
    }

    try {
        const producto = await obtenerProductoPorId(id);

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
}