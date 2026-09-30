import prisma from "../config/prisma.js";

// obtiene las categorias de la base de datos con prisma
export async function obtenerCategorias() {
    return await prisma.categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });
}

// obtiene categoria por id de la base de datos
export async function obtenerCategoriaPorId(id) {
    return await prisma.categorias.findUnique({
        where: {
            id: id
        },
        include: {
            productos: true
        }   
    });
}