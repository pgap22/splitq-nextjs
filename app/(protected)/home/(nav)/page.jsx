import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/home/SettingButtonUser";
import { authUser } from "@/lib/authUser";



export default async function Home() {
    const user = await authUser();
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <Logo />
                <SettingButtonUser user={user}/>
            </div>
            Desde Menu Principal
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </div>
    )
}