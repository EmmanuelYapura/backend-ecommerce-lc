import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";
import { crearPedido } from "../controllers/pedidos.controller.js";

const router = express.Router();

router.post("/", autenticarUsuario, crearPedido);

export default router;