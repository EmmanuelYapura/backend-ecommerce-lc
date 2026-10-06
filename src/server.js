import "dotenv/config";
import express from "express";

import productosRoutes from "./routes/productos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});