import axios from "axios"

export const obtenerNotasRequest = async () => await axios.get("https://backendnotas-production-1944.up.railway.app/notas");
export const obtenerNotasEliminadasRequest = async () => await axios.get("https://backendnotas-production-1944.up.railway.app/notasEliminadas");
export const obtenerCategoriasRequest = async () => await axios.get("https://backendnotas-production-1944.up.railway.app/categorias");
export const obtenerIdCategoriaRequest = async (nombre) => await axios.get(`https://backendnotas-production-1944.up.railway.app/obtenerIdCategoria/${nombre}`);
export const obtenerNotasFiltradasRequest = async(categoria) => await axios.get(`https://backendnotas-production-1944.up.railway.app/obtenerNotasFiltradas/${categoria}`)


export const agregarNotaRequest = async(data) => await axios.post("https://backendnotas-production-1944.up.railway.app/agregarNota",data)


export const eliminarNotaRequest = async (id) => await axios.put(`https://backendnotas-production-1944.up.railway.app/eliminarNota/${id}`)
export const restaurarNotaRequest = async (id) => await axios.put(`https://backendnotas-production-1944.up.railway.app/restaurarNota/${id}`)
export const actualizarNotaRequest = async(data) => await axios.put("https://backendnotas-production-1944.up.railway.app/actualizarNota",data)


export const eliminarNotaDefinitivoRequest = async (id) => await axios.delete(`https://backendnotas-production-1944.up.railway.app/eliminarNotaDefinitiva/${id}`)