
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import prisma from "../config/prisma.js";

const clienteMercadoPago = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const preferencia = new Preference(clienteMercadoPago);
const pagoMercadoPago = new Payment(clienteMercadoPago);


export async function consultarPagoMercadoPago(pagoId) {
    const resultado = await pagoMercadoPago.get({
        id: pagoId
    });

    return resultado;
}


export async function crearPreferenciaDePago(usuarioId, pedidoId) {
    const pedido = await prisma.pedidos.findFirst({
        where: {
            id: pedidoId,
            usuario_id: usuarioId
        },
        include: {
            detalle_pedidos: {
                include: {
                    productos: true
                }
            },
            pagos: true
        }
    });

    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }

    if (pedido.estado !== "PENDIENTE") {
        throw new Error("El pedido no está pendiente de pago");
    }

    if (pedido.detalle_pedidos.length === 0) {
        throw new Error("El pedido no tiene productos");
    }

    if (pedido.pagos) {
        throw new Error("El pedido ya tiene un registro de pago");
    }

    const items = pedido.detalle_pedidos.map((detalle) => ({
        id: detalle.producto_id,
        title: detalle.productos.nombre,
        quantity: detalle.cantidad,
        unit_price: Number(detalle.precio_unitario),
        currency_id: "ARS"
    }));

    const resultado = await preferencia.create({
        body: {
            items,
            external_reference: pedido.id,
            notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
            metadata: {
                pedido_id: pedido.id,
                usuario_id: usuarioId
            }
        }
    });

    await prisma.pagos.create({
        data: {
            pedido_id: pedido.id,
            mercadopago_id: resultado.id,
            estado: "PENDIENTE",
            monto: pedido.total
        }
    });

    return {
        pedido_id: pedido.id,
        preferencia_id: resultado.id,
        url_pago: resultado.init_point,
        url_pago_prueba: resultado.sandbox_init_point
    };
}
