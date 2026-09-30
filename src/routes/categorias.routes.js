import express from "express";

import {
    listarCategorias,
    buscarCategoriaPorId
} from "../controllers/categorias.controller.js";

const router = express.Router();

router.get("/", listarCategorias);

router.get("/:id", buscarCategoriaPorId);

export default router;