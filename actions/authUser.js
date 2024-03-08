import { auth } from "@/auth"

export async function authUser(){
    const data = await auth();
    return data.user
}