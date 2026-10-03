import bcrypt from "bcrypt";
import { crearUsuario, obtenerUsuarioPorEmail } from "../services/usuarios.service.js";

export async function registrarUsuario(req, res) {
    try {
        // req.body es lo que recibimos del usuario
        const { nombre, apellido, email, pw, telefono } = req.body;

        // hasheamos la contrase;a del usuario para que no quede visible en la base de datos
        const pwHash = await bcrypt.hash(pw, 10);

        // creamos un usuario, por ahora nosotros decidimos el rol
        const usuario = await crearUsuario({
            nombre,
            apellido,
            email,
            pw: pwHash,
            telefono,
            rol: "CLIENTE"
        });

        res.status(201).json({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            rol: usuario.rol
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);

        res.status(500).json({
            error: "Error al registrar el usuario"
        });
    }
}

export async function iniciarSesion(req, res) {
    try {
        const { email, pw } = req.body;

        const usuario = await obtenerUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                error: "Email o contraseña incorrectos"
            });
        }

        const pwCorrecta = await bcrypt.compare(pw, usuario.pw);

        if (!pwCorrecta) {
            return res.status(401).json({
                error: "Email o contraseña incorrectos"
            });
        }

        if (!usuario.activo) {
            return res.status(403).json({
                error: "El usuario está inactivo"
            });
        }

        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        res.status(500).json({
            error: "Error al iniciar sesión"
        });
    }
}