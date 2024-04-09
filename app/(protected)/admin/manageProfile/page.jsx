import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward, MdOutlineStorefront } from "react-icons/md";
import Link from "next/link";
import { getProfile } from "@/actions/getProfile";
import { Square } from "lucide-react";



export default async function AdministrarPerfil(params) {

    const perfiles = await getProfile();

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

            { 
                perfiles.map(perfil => (
                    <Link href={"manageProfile/" + perfil.id}>
                    <div className=" border-y border-[#414141] flex items-center gap-3">
                            
                        <IconBox
                            Icon={MdOutlineStorefront} variant={Square} className={" bg-[#262626] border-[#414141] rounded ml-4"}
                        />

                        <p className=" text-base font-semibold my-5"> {perfil.name} </p>
                    </div>
                    </Link>
                ))
            }
            
        </div>
    )
}

