import { useContext, useEffect, useState } from "react";
import { eliminarNotaRequest, obtenerCategoriasRequest, obtenerIdCategoriaRequest, obtenerNotasRequest } from "../../axios/consultasAxios";
import Swal from 'sweetalert2'
import { AppContext } from "../../context/AppContext"

const Notas = () =>{


    const {notas,setNotas,setTitulo,setDescripcion,setCategoria,setEditando,setIdNota} = useContext(AppContext)

    const [categorias,setCategorias] = useState([]);
    const [filtroCategoria,setFiltroCategoria] = useState("");

    const obtenerData =async () => {
        const {data} = await obtenerNotasRequest();
        setNotas(data)
        
    }

    useEffect(()=>{
        

        const obtenerCategorias = async()=>{
            const {data} = await obtenerCategoriasRequest()
            setCategorias(data)
        }
        obtenerCategorias()
        obtenerData()
    },[])


    const eliminarNota = async(id)=>{
        Swal.fire({
            title: "¿Estas seguro de eliminar esta nota?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText:"No"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarNotaRequest(id)
                await obtenerData()            
              Swal.fire({
                title: "Eliminado",
                text: "Tu nota ha sido eliminada.",
                icon: "success"
              });
            }
          });
    }

    const editarNota = async(nota) =>{
        setTitulo(nota.titulo)
        setDescripcion(nota.descripcion)
        const {data} = await obtenerIdCategoriaRequest(nota.nombre_categoria)
        setCategoria(data[0].id_categoria)  
        setEditando(true)
        setIdNota(nota.id_notas)
        
    }

    return(
        <div className="bg-[#f7fbf2] p-5 rounded-2xl shadow-xl">
            <h2 className="text-center text-xl mb-3">Tus notas</h2>

            <select name="" id="" className="w-full border border-slate-300 mb-10 py-2">
                <option value="" disabled>Selecciona una categoria</option>
                <option value="todas">Todas las categorias</option>
                {
                    categorias.map(cat=>(
                        <option key={cat.id_categoria} value={cat.nombre_categoria}>{cat.nombre_categoria}</option>
                    ))
                }
             
            </select>

            {
                notas.length != 0 ?
                notas.map(nota=>(
                    <div  className="flex items-center justify-between border border-slate-400 p-2 rounded-md mb-5 shadow-xl">
                        <div className="mr-5">
                            <h3 className="font-medium">{nota.titulo}</h3>
                            <div className="flex justify-between">
                                <p className="text-xs">{nota.nombre_categoria}</p>
                                <p className="text-xs">{nota.fecha_creacion}</p>
                            </div>
                            <p className="text-sm">{nota.descripcion}</p>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3 ">
                                <button className="bg-red-400 px-2 rounded-lg hover:bg-red-500 cursor-pointer" onClick={()=>eliminarNota(nota.id_notas)}>Eliminar</button>
                            </div>
                            <div className="flex justify-center mt-3">
                                <button className="bg-amber-300 px-4 rounded-lg hover:bg-amber-400 cursor-pointer" onClick={()=>editarNota(nota)} >Editar</button>
                            </div>
                        </div>
                    </div>
                ))
                :
                <h3 className="text-center">No hay notas disponibles por el momento</h3>
            }

            

         
        </div>
    )
}

export default Notas