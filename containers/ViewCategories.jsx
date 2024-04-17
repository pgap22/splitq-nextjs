"use client"
import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward, MdOutlineBuild, MdOutlineStorefront } from "react-icons/md";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Input from "@/components/ui/Input";
import { useState } from "react";

export default function ContainerManageCategories({categorias}) {

    const [categorieSearched, setCategorieSearched] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [handleView, setView] = useState(true)


    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setCategorieSearched(searchTerm);

        // Filtrar los perfiles según el término de búsqueda
        const filteredCategories = categorias.filter(categ =>
            categ.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredCategories);
        setView(!searchTerm);
    };

    return(

        
        <div>
            <div className=" flex p-4 gap-4">
                <Link href={"../admin"}>
                        <IconBox
                            Icon={MdArrowBack} variant={'square'} 
                        />
                </Link>

                <Input type="search" value={categorieSearched} onChange={handleInputChange} placeholder="Buscar Categorias" className="w-full" />
            </div>

            <div className=" px-4 pb-3">
                <h1 className="text-3xl font-bold mb-3">Mis Categorias</h1>
            </div>

            { handleView && (
                
                    categorias.map(categoria => (
                        <Link key={categoria.id} href={"manageCategories/" + categoria.id}>
                        <div className=" border-b-2 border-secundary dark:border-[#414141] flex items-center gap-3 py-5">
                                
                            <IconBox
                                Icon={MdOutlineStorefront} variant={'square'} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                            />
    
                            <p className=" text-base font-semibold "> {categoria.name} </p>
                        </div>
                        </Link>
                    ))
                
            )}

            <div>
                {categorieSearched && searchResults.length > 0 &&(
                        searchResults.map(categ => (
                            <Link href={"manageCategories/" + categ.id}>
                            <div className=" border-b border-secundary dark:border-[#414141] flex items-center gap-3 py-5">
                                    
                                <IconBox
                                    Icon={MdOutlineStorefront} variant={"square"} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                                />
        
                                <p className=" text-base font-semibold"> {categ.name} </p>
                            </div>
                            </Link>                        ))
                        )}  

                {categorieSearched && searchResults.length === 0 && (
                    <p>No se encontraron resultados para la búsqueda.</p>
                )}
            </div>
        </div>
    )


}