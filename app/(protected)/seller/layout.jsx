import { authUser } from "@/lib/authUser"
import { redirect } from "next/navigation";

export default async function SellerLayout({ children }) {
    const user = await authUser();
    
    if(user.role !== "seller") return redirect("/redirect")

    return (
        <>
            {children}
        </>
    )
}