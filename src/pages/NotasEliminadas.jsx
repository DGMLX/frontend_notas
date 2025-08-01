import { CiTrash } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";
import Swal from 'sweetalert2'
import Navbar from "../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { eliminarNotaDefinitivoRequest, obtenerNotasEliminadasRequest, restaurarNotaRequest } from "../axios/consultasAxios";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button"

const NotasEliminadas = () =>{

    const {pathname} = useLocation()
    const {setOpenNav} = useContext(AppContext)
    const [notasEliminadas,setNotasEliminadas] = useState([]);
    const [loading,setLoading] = useState(false);

    const obtenerNotasEliminadas = async()=>{
        setLoading(true)
        const {data} = await obtenerNotasEliminadasRequest();
        setNotasEliminadas(data);
        setLoading(false)
    }

    useEffect(()=>{
        setOpenNav(false)
        obtenerNotasEliminadas()
    },[])

    const restaurarNota = async(id) =>{
            await restaurarNotaRequest(id)
            await obtenerNotasEliminadas()            
            Swal.fire({
                title: "Restaurada",
                icon: "success",
                timer:800
            });
            ;
    }

    const eliminarNota = async(id) =>{
        Swal.fire({
            title: "¿Estás seguro de eliminar esta nota?",
            text: "Ten en cuenta que la eliminación será de forma definitiva",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText:"No"
        }).then(async (result) => {
            if (result.isConfirmed) {
            await eliminarNotaDefinitivoRequest(id)
            await obtenerNotasEliminadas()     
            Swal.fire({
                title: "Eliminada",
                icon: "success",
                timer:800
            });
            }
        });      
    }

    return(
        <div className="flex">       
            <Navbar pathname={pathname}/>
            <main className="min-h-screen px-5 sm:px-10 w-full lg:w-4/5  bg-slate-300" >
                <h1 className="text-center text-3xl pt-5 mb-12">Notas Eliminadas</h1>
                {
                    loading ?
                    <div className="flex justify-center">
                        <div className="loader"></div>
                    </div>
                    :
                    notasEliminadas.length !== 0 ?
                    notasEliminadas.map(notaEliminada=>(
                        <div key={notaEliminada.id_notas} className="flex justify-between items-center shadow-xl bg-white p-2 rounded-md transition-all duration-300 mb-5">
                            <div>
                                <h2 className="font-bold">{notaEliminada.titulo}</h2>
                                <div className="flex justify-between">
                                    <p className="text-xs">Categoría: {notaEliminada.nombre_categoria}</p>
                                </div>
                                <div className="flex"> 
                                    <p className="text-xs mr-5"><span className="font-bold">Creada:</span> {new Date(notaEliminada.fecha_creacion).toISOString().split("T")[0]}</p>
                                    {
                                        notaEliminada.fecha_actualizacion &&   <p className="text-xs "><span className="font-bold">Actualizada: </span> {new Date(notaEliminada.fecha_actualizacion).toISOString().split("T")[0]}</p>
                                    }
                                </div>
                                <p className="text-sm">{notaEliminada.descripcion}</p>
                            </div>
                            <div className="lg:flex  ml-5">
                    
                                <Button className=" text-white w-full lg:w-auto mr-4 py-2 mt-1 lg:mt-0 px-5 text-md rounded-md  flex items-center cursor-pointer" onClick={()=>restaurarNota(notaEliminada.id_notas)}variant="secondary"><MdOutlineRestartAlt className="mr-1" />Restaurar</Button>
                                <Button className="w-full lg:w-auto py-2 mt-1 lg:mt-0 px-5 text-md rounded-md text-white flex items-center cursor-pointer" onClick={()=>eliminarNota(notaEliminada.id_notas)} variant="destructive"><CiTrash className="mr-1"/>Eliminar</Button>

                            </div>
                        </div>
                    ))
                    :
                    <h2>No hay notas eliminadas</h2>
                }                
            </main>
        </div>
    )
}


export default NotasEliminadas;

