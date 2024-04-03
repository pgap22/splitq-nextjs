import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/buttons/SettingButtonUser";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";



export default async function Home() {
    const user = await authUser();
    //Por veces no agarraba el logout asiq esto lo solucionaxd
    async function logout() {
        "use server"
        await signOut();
    }

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
                
            </section>
        </>
    )
}