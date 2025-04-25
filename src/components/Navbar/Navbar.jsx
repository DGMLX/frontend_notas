import { CiStickyNote } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = ({pathname}) => {

    const {openNav} =useContext(AppContext)

    return(
        <div  className={`transition-all duration-300 ease-in-out transform ${openNav ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} min-h-screen md:translate-x-0 md:opacity-100 md:block w-3/6 lg:w-1/5 z-50 absolute md:static bg-slate-800`}>

            <div className="flex justify-center pt-7">
                <Avatar  className="h-30 w-30">
                    <AvatarImage   src="https://github.com/shadcn.png" />
                    <AvatarFallback >DA</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-center text-white mt-2">Diego Altamirano</p>
            <p className="text-center text-white text-sm mb-10">Desarrollador de software</p>
            <Link to="/" className="flex items-center px-5 mb-7 border-b border-slate-400 py-5 pb-5">
                <CiStickyNote className="text-white font-extralight text-2xl mr-5"/>
                <p className={`text-white font-extralight ${pathname === "/" && 'underline underline-offset-4'}`}>Notas</p>
            </Link>       
            <Link to="/notasEliminadas" className="flex items-center px-5 mb-7 border-b border-slate-400 pb-5">
                <AiOutlineDelete className="text-white font-extralight text-2xl mr-5"/>
                <p className={`text-white font-extralight ${pathname === "/notasEliminadas" && 'underline underline-offset-4'}`}>Notas Eliminadas</p>
            </Link>
        </div>
    )
}

export default Navbar