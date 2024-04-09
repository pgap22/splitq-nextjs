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
            <section className="mt-6">
                <div className="bg-foreground border-border border rounded p-4">
                    <h1 className="font-bold text-2xl" >Tu saldo: <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">${+user.balance}</span></h1>
                    <p className="text-text-secundary text-md">Tu saldo actual para comprar productos dentro de <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">SplitQ</span></p>
                </div>
            </section>
            <div className="mt-4">
                <h1 className="text-2xl font-bold">Que deseas comprar Hoy ?</h1>
                <div>
                    
                </div>
            </div>
        </>
    )
}