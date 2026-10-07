import prisma from "../config/prisma.js";

export async function obtenerCarritoPorUsuario(usuarioId) {
    return await prisma.carritos.findUnique({
        where: {
            usuario_id: usuarioId
        },
        include: {
            carrito_items: {
                include: {
                    productos: true
                }
            }
        }
    });
}