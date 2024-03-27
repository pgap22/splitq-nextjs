import getRecharges from "@/actions/getRecharges";
import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import ModQRButton from "@/components/buttons/ModQRButton";
import SettingButton from "@/components/buttons/setting-button";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";

export default async function ModPage() {
    const user = await authUser();

    //Por veces no agarraba el logout asiq esto lo solucionaxd
    async function logout() {
        "use server"
        await signOut();
    }

    const recharges = await getRecharges();

    console.log(recharges)

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

            <div className="p-4">
                <h2 className="font-bold text-lg">Historial de Recargas</h2>
            </div>

            {
                recharges.reverse().map(recharge => (
                    <div className="border-b border-border p-4" key={recharge.id}>
                        <h3 className="font-bold text-sm">{recharge.user.name} {recharge.user.lastname}</h3>
                        <p className="text-gradient bg-gradient-principal font-bold">${recharge.balance}</p>
                    </div>
                ))
            }
        </>
    )
}