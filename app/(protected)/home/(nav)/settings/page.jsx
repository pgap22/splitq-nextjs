import FormUpdateProfile from "@/components/form/FormUpdateProfile";
import IconBox from "@/components/ui/IconBox"
import { authUser } from "@/lib/authUser";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md"
export default async function SettingsPage() {

    const user = await authUser();
    return (
        <>
            <Link href={"/home"}>
                <IconBox variant="square" Icon={MdOutlineArrowBack} />
            </Link>
            <section>
                <h1 className="mt-4 font-bold text-2xl">Configuracion de Perfil</h1>
                <p className="text-text-secundary">Aqui puedes cambiar la informacion de tu cuenta</p>
            </section>

            <section className="mt-4">
                <h2 className="text-text-secundary font-bold text-lg mb-2">Aspectos Generales</h2>
                <FormUpdateProfile user={user}/>
            </section>

        </>
    )
}