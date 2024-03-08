import { authUser } from "@/actions/authUser";

export default async function Home(){
    const user = await authUser();
    
    return (
         <p>{user.name}</p>
    )
}