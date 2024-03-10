import { signOut } from "@/auth";
import { NOAUTH_REDIRECT } from "@/auth.routes";
import { authUser } from "@/lib/authUser"
import { getUserById } from "@/lib/user";

export default async function AuthLayout({ children }) {
    //Check if the user exist in the DB
    const user = await authUser();

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
        await signOut({
            redirectTo: NOAUTH_REDIRECT
        });
    }

    return (
        <>{children}</>
    )
}