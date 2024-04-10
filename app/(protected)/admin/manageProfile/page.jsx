import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward, MdOutlineBuild, MdOutlineStorefront } from "react-icons/md";
import Link from "next/link";
import { getProfile } from "@/actions/getProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default async function AdministrarPerfil(params) {

    const perfiles = await getProfile();

    const vendedores = perfiles.filter(perfil => perfil.role === 'seller');
    const moderadores = perfiles.filter(perfil => perfil.role === 'mod');
    
    console.log(moderadores)
    

    return(
        <div>
            <div className=" p-4">
                <Link href={"../admin"}>
                        <IconBox
                            Icon={MdArrowBack}
                        />
                </Link>
            </div>

            <div className=" px-4 pb-3">
                <h1 className="text-3xl font-bold mb-3">Mis perfiles</h1>
            </div>

        <Tabs defaultValue={"vendedores"} className="!w-full">
            <TabsList className="!w-full">
                <TabsTrigger value="vendedores">
                    <MdOutlineStorefront/>
                    Vendedores
                </TabsTrigger>
                <TabsTrigger value="moderadores">Moderadores</TabsTrigger>
            </TabsList>

                <TabsContent value="vendedores">
                    {
                        vendedores.map(perfil => (
                            <Link href={"manageProfile/" + perfil.id}>
                            <div className=" border-y border-[#414141] flex items-center gap-3">
                                    
                                <IconBox
                                    Icon={MdOutlineStorefront} variant={'square'} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                                />
        
                                <p className=" text-base font-semibold my-5"> {perfil.name} </p>
                            </div>
                            </Link>
                        ))
                    }
                </TabsContent>

                <TabsContent value="moderadores">
                {
                        moderadores.map(perfil2 => (
                            <Link href={"manageProfile/" + perfil2.id}>
                            <div className=" border-y border-[#414141] flex items-center gap-3">
                                    
                                <IconBox
                                    Icon={MdOutlineBuild} variant={"square"} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                                />
        
                                <p className=" text-base font-semibold my-5"> {perfil2.name} </p>
                            </div>
                            </Link>
                        ))
                    }
                </TabsContent>

                
        </Tabs>
            
            
        </div>
    )
}

