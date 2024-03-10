import { logout } from "@/actions/logout";
import { authUser } from "@/lib/authUser";
import Link from "next/link";


export default async function Home() {
    const user = await authUser();

    return (
        <div>
            <p>{JSON.stringify(user)}</p>
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
            <Link href={"/home/test"}>HOME</Link>
        </div>
    )
}