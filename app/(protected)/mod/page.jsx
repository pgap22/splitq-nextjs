import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import ModQRButton from "@/components/mod/ModQRButton";
import SettingButton from "@/components/ui/setting-button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { authUser } from "@/lib/authUser";

export default async function ModPage() {
    const user = await authUser();
    
    //Por veces no agarraba el logout asiq esto lo solucionaxd
    async function logout(){
        "use server"
        await signOut();
    }

    return (
        <>
            <div className="flex flex-row justify-between p-4">
                <Logo />
                <div className="flex gap-2 items-center">
                    <ThemeToggle />
                    <SettingButton logout={logout} user={user}>
                        pon aca lo q sea xd
                    </SettingButton>
                </div>
            </div>

            <div className="p-4 flex flex-col mb-2 gap-2">
                <h2 className="font-bold text-lg">Escanear Qr</h2>
                <ModQRButton />
            </div>

        </>
    )
}