import express from "express";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/protegida", autenticarUsuario, (req, res) => {
    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });
});

export default router;