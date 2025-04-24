import { MdOutlineMenu } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Header = () => {

    const {openNav,setOpenNav} =useContext(AppContext)

    return(
        <header className="flex  items-center  bg-[#2c4e38] text-white py-5 px-10  border-b ">
            <MdOutlineMenu onClick={()=>{setOpenNav(!openNav)}}  className="text-4xl text-white mr-20 cursor-pointer md:hidden"/>
            <p>Administrador de Notas</p>
            <nav>
                
            </nav>
        </header>
    )
}

export default Header