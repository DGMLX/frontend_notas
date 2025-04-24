import { CiStickyNote } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";



const Navbar = () => {

    const {openNav} =useContext(AppContext)

    return(
        <div className={`${openNav ? 'block' : 'hidden'} min-h-screen md:block w-3/6 lg:w-1/5 z-50 absolute md:static` } style={{backgroundColor: 'var(--md-sys-color-on-primary)'}}>
            <div className="flex justify-center pt-7">
                <div className="bg-slate-400 h-30 w-30 rounded-full"></div>
            </div>
            <p className="text-center text-white mt-2">Diego Altamirano</p>
            <p className="text-center text-white text-sm mb-10">Desarrollador de software</p>
            
            <Link to="/" className="flex items-center px-5 mb-7 border-b border-slate-400 pb-5">
                <CiStickyNote className="text-white font-extralight text-2xl mr-5"/>
                <p className="text-white font-extralight">Notas</p>
            </Link>
            
            <Link to="/notasEliminadas" className="flex items-center px-5 mb-7 border-b border-slate-400 pb-5">
                <AiOutlineDelete className="text-white font-extralight text-2xl mr-5"/>
                <p className="text-white font-extralight">Notas Eliminadas</p>
            </Link>


     
            

        </div>
    )
}

export default Navbar