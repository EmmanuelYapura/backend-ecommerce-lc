import prisma from "./config/prisma.js";

async function testDatabase() {
    try {
        await prisma.$connect();

        const cantidadProductos = await prisma.productos.count();

        console.log("✅ Conexión a Supabase exitosa");
        console.log(`📦 Productos encontrados: ${cantidadProductos}`);
    } catch (error) {
        console.error("❌ Error al conectar con Supabase:");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();