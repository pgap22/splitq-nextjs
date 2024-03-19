import { getUserById } from "@/lib/user"
import { redirect } from "next/navigation";

export default async function ModUserDetailsPage({params}){
    const userDetails = await getUserById(params.id);

    if(!userDetails) return redirect("/mod")
    
    return (
        <>
         <p>{userDetails.name} {userDetails.lastname}</p>
        </>
    )
}