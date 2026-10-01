import {
    obtenerCategorias,
    obtenerCategoriaPorId
} from "../services/categorias.service.js";

// listar categorias contemplando errores 
export async function listarCategorias(req, res) {
    try {
        const categorias = await obtenerCategorias();

        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);

        res.status(500).json({
            error: "Error al obtener las categorías"
        });
    }
}

// busca una categoria contemplando errores 
export async function buscarCategoriaPorId(req, res) {
    const { id } = req.params;

    const uuidValido =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!uuidValido) {
        return res.status(400).json({
            error: "El ID de la categoría debe ser un UUID válido"
        });
    }

    try {
        const categoria = await obtenerCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        res.json(categoria);
    } catch (error) {
        console.error("Error al obtener categoría:", error);

        res.status(500).json({
            error: "Error al obtener la categoría"
        });
    }
}