import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import IconBox from "@/components/ui/IconBox";
import ThemeToggle from "@/components/ui/theme-toggle";
import { MdOutlineSettings } from "react-icons/md";


export default async function Home() {

    return (
        <div className="p-4">
            <ThemeToggle />
            Desde Menu Principal
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </div>
    )
}