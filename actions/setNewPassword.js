"use server"
import bcryptjs from "bcryptjs"
import prisma from "@/db/prisma";
export async function setNewPassword(newPassword, id){
    try {
        const password = await bcryptjs.hash(newPassword, 5)

        await prisma.users.update({
            where: {
                id
            },
            data: {
                password,
                passToken: ''
            }
        })
        
        return true;

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}
