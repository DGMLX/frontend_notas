const Paginacion = ({totalNotas,setPaginaActual,paginaActual,notasFiltradas,notasList}) =>{
    let pages = [];
    let pagesNotasFiltradas = [];

    for(let i=1; i<= Math.ceil(totalNotas/3);i++){
        pages.push(i)
    }

    for(let i=1; i<= Math.ceil(notasFiltradas/3);i++){
        pagesNotasFiltradas.push(i)
    }

    return(
        <div className="flex justify-center gap-5">
            {
                notasFiltradas > 0 && notasList.length > 0 ?
                    pagesNotasFiltradas.map((page,index)=>{
                        return <button key={index} className={`${paginaActual == page && 'bg-slate-800 text-white'} border-slate-500 border px-2 rounded-md cursor-pointer hover:bg-slate-600 hover:text-white`} onClick={()=>setPaginaActual(page)}>{page}</button>
                    })
                : notasList.length > 0 ?
                    pages.map((page,index)=>{
                        return <button key={index} className={`${paginaActual == page && 'bg-slate-800 text-white'} border-slate-500 border px-2 rounded-md cursor-pointer hover:bg-slate-600 hover:text-white`} onClick={()=>setPaginaActual(page)}>{page}</button>
                    })
                : 'No hay tareas disponibles'
            } 
        </div>
    )
}

export default Paginacion