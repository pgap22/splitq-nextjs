"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import bcryptjs from "bcryptjs"
import { signOut } from "@/auth";

export default async function deleteAccount(password) {
    const {id} = await authUser();
    
    const currentUser = await prisma.users.findFirst({
        where: {
            id
        }
    })
    const samePassword = await bcryptjs.compare(password, currentUser.password);

    if(!samePassword) return {error: "La contraseña no es correcta"}

    await prisma.users.delete({
        where: {
            id
        }
    })

    await signOut();

    return true;
}