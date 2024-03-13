import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import IconBox from "@/components/ui/IconBox";
import { MdOutlineSettings } from "react-icons/md";


export default async function Home() {

    return (
        <>
            <div className="flex justify-between p-2 items-center">
                <Logo />
                <IconBox Icon={MdOutlineSettings} />
            </div>
            Desde Menu Principal
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </>
    )
}