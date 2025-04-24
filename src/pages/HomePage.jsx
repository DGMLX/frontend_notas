
import { useLocation } from "react-router-dom"
import FormularioNotas from "../components/home/Formulario"
import Notas from "../components/home/Notas"
import Navbar from "../components/Navbar/Navbar"


const HomePage = () =>{

    const {pathname} = useLocation()

    return(
        <div className="flex">

            <Navbar pathname={pathname}/>
            <main className="min-h-screen px-5 sm:px-10  w-full md:w-4/5 relative md:static" style={{backgroundColor: 'var(--md-sys-color-secondary)'}}>
                

                <h1 className="text-center text-3xl pt-5 mb-7">Administra tus notas de una manera rápida y fácil</h1>


        
                <div className=" lg:flex justify-between ">
                    <div className="w-full lg:w-2/3">
                        <FormularioNotas/>

                    </div>
                    <div className="w-full mt-10  lg:w-2/3 lg:pl-10 lg:mt-0 pb-10">
                        <Notas />

                    </div>
                </div>
            </main>
        
        </div>
    )
}

export default HomePage