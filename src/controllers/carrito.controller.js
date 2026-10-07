import {
    obtenerCarritoPorUsuario
} from "../services/carrito.service.js";

export async function obtenerCarrito(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const carrito = await obtenerCarritoPorUsuario(usuarioId);

        if (!carrito) {
            return res.status(404).json({
                error: "Carrito no encontrado"
            });
        }

        res.json(carrito);
    } catch (error) {
        console.error("Error al obtener carrito:", error);

        res.status(500).json({
            error: "Error al obtener el carrito"
        });
    }
}