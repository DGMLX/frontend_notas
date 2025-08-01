import { useContext, useEffect, useState } from "react";
import { eliminarNotaRequest, obtenerCategoriasRequest, obtenerIdCategoriaRequest, obtenerNotasFiltradasRequest, obtenerNotasRequest } from "../../axios/consultasAxios";
import Swal from 'sweetalert2'
import { AppContext } from "../../context/AppContext"
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import Paginacion from "../Paginacion";

import { Button } from "@/components/ui/button"

const Notas = () =>{

    const {notas,setNotas,setTitulo,setDescripcion,setCategoria,setEditando,setIdNota,setOpenNav,notasList,setNotasList,paginaActual,setPaginaActual} = useContext(AppContext)

    const [categorias,setCategorias] = useState([]);
    const [filtroCategoria,setFiltroCategoria] = useState("");
    const [notasFiltradas,setNotasFiltradas] = useState([]);

    const obtenerData =async () => {
        const {data} = await obtenerNotasRequest();
        setNotas(data)
        const ultimaNotaIndex = paginaActual * 3; 
        const primeraNotaIndex = ultimaNotaIndex - 3
        const notasActuales = data.slice(primeraNotaIndex,ultimaNotaIndex)
        setNotasList(notasActuales)
    }
 
    useEffect(()=>{
        setOpenNav(false)
        const obtenerCategorias = async()=>{
            const {data} = await obtenerCategoriasRequest()
            setCategorias(data)
        }
        obtenerCategorias()
        obtenerData()
    },[paginaActual])

    const eliminarNota = async(id)=>{
        Swal.fire({
            title: "¿Estás seguro de eliminar esta nota?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:"No",
            confirmButtonText: "Sí",
          }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarNotaRequest(id)
                await obtenerData()            
              Swal.fire({
                title: "Eliminado",
                icon: "success",
                timer:800
              });
            }
          });
    }

    const editarNota = async(nota) =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        setTitulo(nota.titulo)
        setDescripcion(nota.descripcion)
        const {data} = await obtenerIdCategoriaRequest(nota.nombre_categoria)
        setCategoria(data[0].id_categoria)  
        setEditando(true)
        setIdNota(nota.id_notas)
    }

    useEffect(()=>{
        const filtrarCategorias = async()=>{
            if(filtroCategoria === "todas"){
                const {data} = await obtenerNotasRequest()
              
                const ultimaNotaIndex = paginaActual * 3; 
                const primeraNotaIndex = ultimaNotaIndex - 3
                const notasActuales = data.slice(primeraNotaIndex,ultimaNotaIndex)
                setNotas(data)
                setNotasList(notasActuales)
                setNotasFiltradas([])
            }else{
                const {data} = await obtenerNotasFiltradasRequest(filtroCategoria)
            
                setNotasList(data)
                setNotasFiltradas(data)
            }
        }
        filtrarCategorias()
    },[filtroCategoria])

    return(
        <div className="bg-[#f7fbf2] p-5 rounded-2xl shadow-xl">
            <h2 className="text-center text-xl mb-3 flex justify-center items-center"><CgNotes className="mr-2"/> Tus notas</h2>
            <select name="" id="" className="w-full border border-slate-500 rounded-md mb-5 py-2"onChange={(e)=>setFiltroCategoria(e.target.value)}>
                <option value="" disabled>Selecciona una categoría</option>
                <option value="todas">Todas las categorías</option>
                {
                    categorias.map(cat=>(
                        <option key={cat.id_categoria} value={cat.nombre_categoria}>{cat.nombre_categoria}</option>
                    ))
                }
            </select>
            {
                notas.length != 0 ?
                notasList.map(nota=>(
                    <>
                        <div  className="flex items-center justify-between border border-slate-400 p-2 rounded-md mb-2 shadow-xl">
                            <div className="mr-5">
                                <h3 className="font-bold">{nota.titulo}</h3>
                                <div >
                                    <p className="text-xs">Categoría: {nota.nombre_categoria}</p>
                                </div>
                                <div className="flex ">
                                    <p className="text-xs mr-5"><span className="font-bold">Creada:</span> {new Date(nota.fecha_creacion).toISOString().split("T")[0]}</p>
                                    {
                                        nota.fecha_actualizacion &&   <p className="text-xs "><span className="font-bold">Actualizada: </span> {new Date(nota.fecha_actualizacion).toISOString().split("T")[0]}</p>
                                    }
                                </div>
                                <p className="text-sm">{nota.descripcion}</p>
                            </div>
                            <div>
                                <div className="flex justify-center mb-3">
                                    <Button className="px-2 rounded-lg cursor-pointer text-white flex items-center py-1 " variant="destructive" onClick={()=>eliminarNota(nota.id_notas)}><CiTrash className="mr-1"/>Eliminar</Button>
                                </div>
                                <div className="flex justify-center mt-3">
                                    <Button className="text-white w-full rounded-lg cursor-pointer flex items-center py-1 " variant="secondary" onClick={()=>editarNota(nota)}><FaRegEdit className="mr-1"/>Editar</Button>
                                </div>
                            </div>
                        </div>
                    </>
                ))
                :
                <h3 className="text-center">No hay notas disponibles por el momento</h3>
            }
            <Paginacion totalNotas={notas.length} notasFiltradas={notasFiltradas.length} setPaginaActual={setPaginaActual} paginaActual={paginaActual} notasList={notasList}/>
        </div>
    )
}

export default Notas