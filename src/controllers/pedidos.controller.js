import { crearPedidoDesdeCarrito } from "../services/pedidos.service.js";

export async function crearPedido(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const pedido = await crearPedidoDesdeCarrito(usuarioId);

        res.status(201).json(pedido);
    } catch (error) {
        console.error("Error al crear pedido:", error);

        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({
                error: error.message
            });
        }

        if (error.message === "El carrito está vacío") {
            return res.status(400).json({
                error: error.message
            });
        }

        if (
            error.message.startsWith("El producto") ||
            error.message.startsWith("Stock insuficiente")
        ) {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Error al crear el pedido"
        });
    }
}