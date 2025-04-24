import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import NotasEliminadas from "../pages/NotasEliminadas"
import Notificaciones from "../pages/Notificaciones"
import Analisis from "../pages/Analisis"


const AppRouter = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/notasEliminadas" element={<NotasEliminadas/>}/>
            <Route path="/notificaciones" element={<Notificaciones/>}/>
            <Route path="/analisis" element={<Analisis/>}/>
            <Route path="/*" element={<HomePage/>}/>
            
        </Routes>
    )
}

export default AppRouter