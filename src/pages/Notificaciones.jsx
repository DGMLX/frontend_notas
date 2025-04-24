import Navbar from "../components/Navbar/Navbar"

const Notificaciones = () =>{
    return(
        <div className="flex">
            <Navbar/>
            <main className="h-screen bg-[#a9d0b3] px-20 w-4/5">
                <h1 className="text-center text-3xl pt-5 mb-12">Notificaciones</h1>
            </main>
        </div>
    )
}

export default Notificaciones