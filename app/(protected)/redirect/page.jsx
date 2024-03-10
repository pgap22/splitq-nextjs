import { authUser } from "@/lib/authUser"
import { redirect } from "next/navigation";
export default async function RedirectPage() {
    const user = await authUser();
    
    if(user.role == "user") return redirect("/home")
    if(user.role == "admin") return redirect("/admin")
    // if(user.role == "seller") return redirect("/seller")
    // if(user.role == "mod") return redirect("/mod")

    return(
        <p>
            Redirect...
        </p>
    )
}