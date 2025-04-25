import { useContext, useEffect, useState } from "react"
import { actualizarNotaRequest, agregarNotaRequest, obtenerCategoriasRequest, obtenerIdCategoriaRequest, obtenerNotasRequest } from "../../axios/consultasAxios"
import Swal from 'sweetalert2'
import { AppContext } from "../../context/AppContext"
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const FormularioNotas = () =>{

    const {agregarNuevaCategoria,setAgregarNuevaCategoria,titulo,setTitulo,descripcion,setDescripcion,categoria,setCategoria,categorias,setCategorias,valorNuevaCategoria,setValorNuevaCategoria,setNotas,editando,setEditando,idNota,setIdNota,setOpenNav,notasList,setNotasList,paginaActual,setPaginaActual} = useContext(AppContext)

    useEffect(()=>{
        setOpenNav(false)
        obtenerCategorias()
    },[])

    const obtenerCategorias = async()=>{
        const {data} = await obtenerCategoriasRequest()
        setCategorias(data)
    }

    const capturarNuevaCategoria = (e) =>{
        if (e.target.value === "Nueva categoria"){
            setAgregarNuevaCategoria(true)
        }
        else{
            setAgregarNuevaCategoria(false)
            setCategoria(e.target.value)
        }
    }

    const agregarNota =async (e)=>{
        e.preventDefault()
        let nota;
        if(editando){
            if(titulo === "" || descripcion === "" || (categoria === "" && valorNuevaCategoria === "" )){
                return Swal.fire({
                    title: "Todos los campos son obligatorios",
                    icon: "error",
                    timer:1000
                });
            }
            if(agregarNuevaCategoria){
                nota = {
                    id:idNota,titulo,descripcion,categoria: valorNuevaCategoria,}
            }else{
                nota = {id:idNota,titulo,descripcion,categoria,}
            }
            await actualizarNotaRequest(nota)
            const {data} = await obtenerNotasRequest();
            setNotas(data)
            const ultimaNotaIndex = paginaActual * 3; 
            const primeraNotaIndex = ultimaNotaIndex - 3
            const notasActuales = data.slice(primeraNotaIndex,ultimaNotaIndex)
            setNotasList(notasActuales)
            Swal.fire({
                title: "Nota editada",
                icon: "success",
                timer:800
            });
            setEditando(false)
            setTitulo("")
            setDescripcion("")
            setCategoria("Selecciona una categoria")
            setValorNuevaCategoria("")
            setAgregarNuevaCategoria(false)
        }else{
            if(agregarNuevaCategoria){
                nota = {titulo,descripcion,categoria: valorNuevaCategoria}
            }else{
                nota = {titulo,descripcion,categoria}
            }
            if(titulo === "" || descripcion === "" || (categoria === "" && valorNuevaCategoria === "" )){
                return Swal.fire({
                    title: "Todos los campos son obligatorios",
                    icon: "error",
                    timer:800
                });
            }
            await agregarNotaRequest(nota)
            const {data} = await obtenerNotasRequest();
            setNotas(data)
            const ultimaNotaIndex = paginaActual * 3; 
            const primeraNotaIndex = ultimaNotaIndex - 3
            const notasActuales = data.slice(primeraNotaIndex,ultimaNotaIndex)
            setNotasList(notasActuales)
            await obtenerCategorias()
            Swal.fire({
                title: "Nota agregada",
                icon: "success",
                timer:800
            });
            setTitulo("")
            setDescripcion("")
            setCategoria("Selecciona una categoria")
            setValorNuevaCategoria("")
            setAgregarNuevaCategoria(false)
        }
    }

    const cancelarEdit = () =>{
        setEditando(false)
        setTitulo("")
        setDescripcion("")
        setCategoria("Selecciona una categoria")
        setValorNuevaCategoria("")
        setAgregarNuevaCategoria(false)
    }

    return( 
        <div className="bg-[#f7fbf2] p-5 rounded-2xl shadow-xl">
            {
                editando ?
                <h2 className="text-center text-xl mb-10 ">Edita tus notas</h2>
                :
                <h2 className="text-center text-xl mb-10 ">Agrega tus notas</h2>
            }
            <form onSubmit={(e)=>agregarNota(e)}>   
                <label htmlFor="" className="block font-medium mb-2">Título</label>
                
                <Input type="text" placeholder="Añade un título" className="w-full block border border-slate-500 py-1 px-2 rounded-md mb-2"  value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>
                <label htmlFor="" className="block font-medium mb-2">Descripción</label>
                
                <Textarea  type="text" placeholder="Agrega una descripción"  className="w-full block border border-slate-500 py-1 px-2 rounded-md mb-2" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                <label htmlFor="" className="block font-medium mb-2">Categoría</label>
                {
                    agregarNuevaCategoria ?

                     
                    <select name="" id="" className="w-full border border-slate-300 mb-4 py-2" value={"Nueva categoria"}  onChange={(e)=>capturarNuevaCategoria(e)}>  
                    <option value={"Selecciona una categoria"} disabled>Selecciona una categoría</option>
                    <option value="Nueva categoria" selected>Agregar nueva categoría</option>
                    {
                        categorias.map(cat=>(
                            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                        ))
                    }
                    </select>
                    :
              
                    <select name="" id="" className="w-full border border-slate-500 rounded-md mb-4 py-2 " value={categoria}  onChange={(e)=>capturarNuevaCategoria(e)}>
                          <option value={"Selecciona una categoria"} disabled>Selecciona una categoria</option>
                        <option value="Nueva categoria">Agregar nueva categoría</option>
                        {
                            categorias.map(cat=>(
                                <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                            ))
                        }
                    </select>
                }
                {
                    agregarNuevaCategoria ?
                        <>
                            <label htmlFor="" className="block font-medium mb-2">Nueva categoría</label>
                            <input type="text" placeholder="Añade una categoría" className="w-full block border border-slate-500 py-1 px-2 rounded-md mb-2" value={valorNuevaCategoria} onChange={(e)=>setValorNuevaCategoria(e.target.value)}/>
                        </>
                    :
                    ''
                }
                <div className="flex justify-center items-center mt-6 ">
                    {
                        editando ?
                            <div className="flex justify-center">

                                <Button className=" text-white px-7 md:px-10 mr-2 py-2 rounded-full w-3/5 cursor-pointer  flex justify-center items-center" variant="secondary" onClick={()=>agregarNota()}><FaRegEdit className="text-xl mr-3"/>Editar</Button>
                                
                                <Button className=" text-white px-4 md:px-7 py-2 ml-2 rounded-full w-3/5 cursor-pointer  flex justify-center items-center" variant="destructive"  onClick={()=>cancelarEdit()}><RiCloseLargeLine className="text-xl mr-3"/>Cancelar</Button>
                            </div>
                        :

                        <Button className=" text-white px-10  py-2 rounded-full w-full  cursor-pointer flex justify-center items-center" variant="secondary" onClick={()=>agregarNota()}><IoMdAddCircleOutline className="text-xl mr-3 "/>Agregar Nota</Button>    
                    }
                </div>
            </form>
        </div>
    )
}

export default FormularioNotas