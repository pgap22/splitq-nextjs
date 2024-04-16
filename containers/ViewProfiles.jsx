"use client"
import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward, MdOutlineBuild, MdOutlineStorefront } from "react-icons/md";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Input from "@/components/ui/Input";
import { useState } from "react";

export default function ContainerManageProfile({perfiles}) {

    const [profileSearched, setProfileSearched] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setProfileSearched(searchTerm);

        // Filtrar los perfiles según el término de búsqueda
        const filteredProfiles = perfiles.filter(perfil =>
            perfil.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredProfiles);
    };

    



    const vendedores = perfiles.filter(perfil => perfil.role === 'seller');
    const moderadores = perfiles.filter(perfil => perfil.role === 'mod');
    

    return(

        
        <div>
            <div className=" flex p-4 gap-4">
                <Link href={"../admin"}>
                        <IconBox
                            Icon={MdArrowBack} variant={'square'} 
                        />
                </Link>

                <Input type="search" value={profileSearched} onChange={handleInputChange} placeholder="Buscar Perfil" className="w-full" />
            </div>

            <div className=" px-4 pb-3">
                <h1 className="text-3xl font-bold mb-3">Mis perfiles</h1>
            </div>
            
            <Tabs defaultValue={"vendedores"} className="!w-full">
                <TabsList className="!w-full">
                    <div className="w-full flex justify-center">
                    <TabsTrigger value="vendedores" className="!font-bold !capitalize">
                        <MdOutlineStorefront className=" w-full h-6"/>
                        <p className="text-lg">Vendedores</p>
                    
                    </TabsTrigger>
                    </div>

                    <div className="w-full flex justify-center">
                    <TabsTrigger value="moderadores" className="!font-bold !capitalize">
                        <MdOutlineBuild className="w-full h-6"/>
                        <p className=" text-lg">Moderadores</p>
                    </TabsTrigger>
                    </div>
                </TabsList>

                    <TabsContent value="vendedores">
                        {
                            vendedores.map(perfil => (
                                <Link href={"manageProfile/" + perfil.id}>
                                <div className=" border-b-2 border-secundary dark:border-[#414141] flex items-center gap-3 py-5">
                                        
                                    <IconBox
                                        Icon={MdOutlineStorefront} variant={'square'} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                                    />
            
                                    <p className=" text-base font-semibold "> {perfil.name} </p>
                                </div>
                                </Link>
                            ))
                        }
                    </TabsContent>

                    <TabsContent value="moderadores">
                    {
                            moderadores.map(perfil2 => (
                                <Link href={"manageProfile/" + perfil2.id}>
                                <div className=" border-b border-secundary dark:border-[#414141] flex items-center gap-3 py-5">
                                        
                                    <IconBox
                                        Icon={MdOutlineBuild} variant={"square"} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                                    />
            
                                    <p className=" text-base font-semibold"> {perfil2.name} </p>
                                </div>
                                </Link>
                            ))
                        }
                    </TabsContent>

                    
            </Tabs>
            <div>
                {
                    searchResults.map(usuario => (
                        <p key={usuario.id} className="flex flex-col text-9xl text-white">{usuario.name}</p>
                    ))
                }  
            </div>
            
        </div>
    )
}

