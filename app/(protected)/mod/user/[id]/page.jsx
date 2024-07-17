
import UserDetailsUI from "@/containers/UserDetailsUI";
import { getUserById } from "@/lib/user"
import { redirect } from "next/navigation";

export default async function ModUserDetailsPage({ params }) {
    const userDetails = await getUserById(params.id);
    // if (!userDetails) return 
    return (
       <UserDetailsUI userDetails={userDetails}/>
    )
}