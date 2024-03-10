import { authUser } from "@/lib/authUser"
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
    const user = await authUser();
    
    if(user.role !== "admin") return redirect("/redirect")

    return (
        <>
            {children}
        </>
    )
}