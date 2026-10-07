import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";

import {
    obtenerCarrito
} from "../controllers/carrito.controller.js";

const router = express.Router();

router.get("/", autenticarUsuario, obtenerCarrito);

export default router;