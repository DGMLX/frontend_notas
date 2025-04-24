
import FormularioNotas from "../components/home/Formulario"
import Notas from "../components/home/Notas"
import Navbar from "../components/Navbar/Navbar"


const HomePage = () =>{

    

    
    return(
        <div className="flex ">

            <Navbar/>
            <main className="bg-[#a9d0b3] px-5 sm:px-10 md:px-20 w-full md:w-4/5 relative md:static">
                

                <h1 className="text-center text-3xl pt-5 mb-12">Administra tus notas de una manera rápida y fácil</h1>


        
                <div className=" lg:flex justify-between ">
                    <div className="w-full lg:w-1/3">
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