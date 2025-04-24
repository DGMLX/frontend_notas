import { MdOutlineMenu } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Header = () => {

    const {openNav,setOpenNav} =useContext(AppContext)

    return(
        <header className="flex  items-center  text-white py-5 px-10  border-b " style={{backgroundColor: 'var(--md-sys-color-on-primary)'}}>
            <MdOutlineMenu onClick={()=>{setOpenNav(!openNav)}}  className="text-4xl text-white mr-20 cursor-pointer md:hidden"/>
            <p>Administrador de Notas</p>
            <nav>
                
            </nav>
        </header>
    )
}

export default Header