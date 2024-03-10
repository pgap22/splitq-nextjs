import { logout } from "@/actions/logout";
import { authUser } from "@/lib/authUser";
import Link from "next/link";


export default async function Home() {
    const user = await authUser();

    return (
        <div>
            <p>Home Usuario ! {user.name}</p>
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </div>
    )
}