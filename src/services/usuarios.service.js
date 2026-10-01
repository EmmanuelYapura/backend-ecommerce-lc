import prisma from "../config/prisma.js";

// crea un usuario en supabase
export async function crearUsuario(datosUsuario) {
    return await prisma.usuarios.create({
        data: datosUsuario
    });
}