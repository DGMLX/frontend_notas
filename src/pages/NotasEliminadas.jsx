import { CiTrash } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";
import Swal from 'sweetalert2'


import Navbar from "../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { eliminarNotaDefinitivoRequest, obtenerNotasEliminadasRequest, restaurarNotaRequest } from "../axios/consultasAxios";
import { AppContext } from "../context/AppContext";

const NotasEliminadas = () =>{

    const {setOpenNav} = useContext(AppContext)

    const [notasEliminadas,setNotasEliminadas] = useState([]);

    const obtenerNotasEliminadas = async()=>{
        const {data} = await obtenerNotasEliminadasRequest();
        setNotasEliminadas(data);
    }

    useEffect(()=>{
        setOpenNav(false)
        obtenerNotasEliminadas()
    },[])

    const restaurarNota = (id) =>{

        Swal.fire({
            title: "¿Estas seguro de restaurar esta nota?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText:"No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await restaurarNotaRequest(id)
                await obtenerNotasEliminadas()            
            Swal.fire({
                title: "Restaurada",
                text: "Tu nota ha sido restaurada.",
                icon: "success"
            });
            }
        });
    }

    const eliminarNota = async(id) =>{
        Swal.fire({
            title: "¿Estas seguro de eliminar esta nota?",
            text: "Ten en cuenta eliminación será de forma definitiva",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText:"No"
        }).then(async (result) => {
            if (result.isConfirmed) {
             
            await eliminarNotaDefinitivoRequest(id)
            await obtenerNotasEliminadas()     
            Swal.fire({
                title: "Eliminada",
                text: "Tu nota ha sido eliminada de forma exitosa.",
                icon: "success"
            });
            }
        });      
    }


    return(
        <div className="flex">
       
            <Navbar/>
            <main className=" bg-[#a9d0b3] h-lvh px-5 sm:px-10 md:px-20 w-full lg:w-4/5">
                <h1 className="text-center text-3xl pt-5 mb-12">Notas Eliminadas</h1>

                {
                    notasEliminadas.length !== 0 ?
                    notasEliminadas.map(notaEliminada=>(
                        <div key={notaEliminada.id_notas} className="flex justify-between items-center shadow-xl bg-white p-2 rounded-md transition-all duration-300 mb-5">
                            <div>
                                <h2 className="font-medium">{notaEliminada.titulo}</h2>
                                <div className="flex justify-between">
                                    <p className="text-xs">{notaEliminada.nombre_categoria}</p>
                                    <p className="text-xs">{notaEliminada.fecha_creacion}</p>
                                </div>
                                <p className="text-sm">{notaEliminada.descripcion}</p>
                            </div>
                            <div className="sm:flex ml-5">
                                <button className="w-5/6 bg-blue-300 mb-1 py-2 px-5 rounded-md hover:bg-blue-400 mr-5 flex items-center cursor-pointer text-md" onClick={()=>restaurarNota(notaEliminada.id_notas)}><MdOutlineRestartAlt/>Restaurar</button>
                                <button className="w-5/6 bg-red-300 py-2 mt-1 px-5 text-md rounded-md hover:bg-red-400 flex items-center cursor-pointer" onClick={()=>eliminarNota(notaEliminada.id_notas)}><CiTrash/>Eliminar</button>
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