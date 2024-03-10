import { authUser } from "@/lib/authUser"
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
    const user = await authUser();
    
    if(user.role !== "user") return redirect("/redirect")

    return (
        <>
            {children}
        </>
    )
}