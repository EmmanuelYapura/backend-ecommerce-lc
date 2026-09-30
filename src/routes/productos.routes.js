import express from "express";

import {
    listarProductos,
    buscarProductoPorId
} from "../controllers/productos.controller.js";

const router = express.Router();

router.get("/", listarProductos);

router.get("/:id", buscarProductoPorId);

export default router;