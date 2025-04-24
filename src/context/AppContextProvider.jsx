
import { useState } from "react"
import { AppContext } from "./AppContext"


const AppContextProvider = ({children}) =>{

    const [openNav,setOpenNav] = useState(false);
    const [agregarNuevaCategoria,setAgregarNuevaCategoria] = useState(false)
    const [titulo,setTitulo] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [categoria,setCategoria] = useState("Selecciona una categoria")
    const [categorias,setCategorias] = useState([]);
    const [valorNuevaCategoria,setValorNuevaCategoria] = useState("");
    const [notas,setNotas] = useState([])
    const [editando,setEditando] = useState(false);
    const [idNota,setIdNota] = useState(0);

    

    return(
        <AppContext.Provider value={{openNav,setOpenNav,agregarNuevaCategoria,setAgregarNuevaCategoria,titulo,setTitulo,descripcion,setDescripcion,categoria,setCategoria,categorias,setCategorias,valorNuevaCategoria,setValorNuevaCategoria,notas,setNotas,editando,setEditando,idNota,setIdNota}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider