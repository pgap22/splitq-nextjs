import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function RedirectPage() {
    const data = await auth();
    const user =  data.user
    
    if (user.role == "user") return redirect("/home")
    if (user.role == "admin") return redirect("/admin")
    if (user.role == "seller") return redirect("/seller")
    if (user.role == "mod") return redirect("/mod")

    return (
        <p>
            Redirect...
        </p>
    )
}