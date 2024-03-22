import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/home/SettingButtonUser";
import ThemeToggle from "@/components/ui/theme-toggle";
import { authUser } from "@/lib/authUser";



export default async function Home() {
    const user = await authUser();
    return (
        <>
            <div className="flex justify-between items-center">
                <Logo />
                <div className="flex gap-2 items-center">
                    <ThemeToggle size={22} />
                    <SettingButtonUser logout={logout} user={user} />
                </div>
            </div>
            <section>
                <form action={logout}>
                    <button>Prueba</button>
                </form>
            </section>
        </>
    )
}