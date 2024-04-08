"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import bcryptjs from "bcryptjs"

export async function updatePassword({oldpass,newpass}){
    const {id} = await authUser();
    
    const currentUser = await prisma.users.findFirst({
        where: {
            id
        }
    })

    const samePassword = await bcryptjs.compare(oldpass, currentUser.password)

    if(!samePassword) return  {error: "Contraseña incorrecta, trata de recordar la contraseña"}

    const newPassword = await bcryptjs.hash(newpass, 5);

    await prisma.users.update({
        where: {
            id
        },
        data: {
            password: newPassword
        }
    })

    return true;
}