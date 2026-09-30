import prisma from "../config/prisma.js";


// Funcion para obtener todos los productos, incluyendo la categoria 
export async function obtenerProductos() {
    return await prisma.productos.findMany({
        include: {
            categorias: true
        }
    });
}

// Busqueda de producto por uuid
export async function obtenerProductoPorId(id) {
    return await prisma.productos.findUnique({
        where: {
            id: id
        },
        include: {
            categorias: true
        }
    });
}