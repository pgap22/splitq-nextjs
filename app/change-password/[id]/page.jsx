import { getUserByPassToken } from "@/lib/user";
import { redirect } from "next/navigation";

export async function ChangePassword({ params }) {
    const verifyToken = await getUserByPassToken(params.token)
    if (!verifyToken) return redirect("/")
    return (
        <>
            <p>hola</p>
        </>
    )
}