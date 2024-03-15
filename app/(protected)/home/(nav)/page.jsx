import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/home/SettingButtonUser";
import { authUser } from "@/lib/authUser";



export default async function Home() {
    const user = await authUser();
    return (
        <>
            <div className="flex justify-between items-center">
                <Logo />
                <SettingButtonUser user={user}/>
            </div>
            <section>
                
            </section>
        </>
    )
}