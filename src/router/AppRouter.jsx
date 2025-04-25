import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import NotasEliminadas from "../pages/NotasEliminadas"

const AppRouter = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/notasEliminadas" element={<NotasEliminadas/>}/>            
            <Route path="/*" element={<HomePage/>}/>
        </Routes>
    )
}

export default AppRouter