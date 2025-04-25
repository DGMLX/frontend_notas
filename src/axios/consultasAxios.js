import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL_PROD,
});

export const obtenerNotasRequest = async () => await api.get("/notas");
export const obtenerNotasEliminadasRequest = async () => await api.get("/notasEliminadas");
export const obtenerCategoriasRequest = async () => await api.get("/categorias");
export const obtenerIdCategoriaRequest = async (nombre) => await api.get(`/obtenerIdCategoria/${nombre}`);
export const obtenerNotasFiltradasRequest = async (categoria) => await api.get(`/obtenerNotasFiltradas/${categoria}`);
export const agregarNotaRequest = async (data) => await api.post("/agregarNota", data);
export const eliminarNotaRequest = async (id) => await api.put(`/eliminarNota/${id}`);
export const restaurarNotaRequest = async (id) => await api.put(`/restaurarNota/${id}`);
export const actualizarNotaRequest = async (data) => await api.put("/actualizarNota", data);
export const eliminarNotaDefinitivoRequest = async (id) => await api.delete(`/eliminarNotaDefinitiva/${id}`);