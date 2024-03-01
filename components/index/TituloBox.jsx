
function TituloBox({imagen, texto }) {
    return(
        <div className="flex items-center gap-2">
            <div className="border border-gradient rounded-full w-8 h-8 flex justify-center content-center items-center">
                {imagen}
            </div>            
            <p className=" font-black text-xl">{texto}</p>
        </div>
    )    
}

export default TituloBox