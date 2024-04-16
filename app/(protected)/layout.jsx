import { logout } from "@/actions/logout";
import { authUser } from "@/lib/authUser"
import { getUserById } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function AuthLayout({ children }) {
    //Check if the user exist in the DB
    const session = await auth();

    const existingUser = await getUserById(session.user?.id)

    if(existingUser?.error) return <p>{existingUser.error}</p>

    //If not in DB display an error and a button for logout
    if (!existingUser) return (
        <>
         <div className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-50">
            <form action={logout} className="border-border flex-col flex border p-4 bg-foreground rounded-md max-w-sm">
             <h1 className="text-2xl mb-2 font-bold">Hubo un error con tu cuenta</h1>
             <p className="text-text-secundary mb-4">Tu cuenta ha sido borrada de la base de datos, cierra la sesion y crea una nueva</p>
             <Button>Cerrar Sesion</Button>
            </form>
        </div> 
        </>
    )



    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}