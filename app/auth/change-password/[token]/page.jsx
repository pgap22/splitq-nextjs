import FormNewPassword from "@/components/form/FormNewPassword";
import { getUserByPassToken } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function ChangePassword({ params }) {
    const verifyToken = await getUserByPassToken(params.token)
    if (!verifyToken) return redirect("/")
    return (
       <FormNewPassword id_user={verifyToken.id} />
    )
}