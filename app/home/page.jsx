import { logout } from "@/actions/logout";
import { authUser } from "@/lib/authUser";


export default async function Home() {
    const user = await authUser();

    return (
        <div>
            <p>{user.name}</p>
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </div>
    )
}