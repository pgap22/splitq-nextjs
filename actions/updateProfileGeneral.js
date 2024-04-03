"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

export async function updateProfileGeneral(data) {
    try {

        if (data?.email) {

            const sameEmailUser = await prisma.users.findFirst({
                where: {
                    email: data.email
                }
            })

            if(sameEmailUser) return {error: "Usuario con el mismo email"}

        }

        const user = await authUser();


       const updatedUser =  await prisma.users.update({
            where: {
                id: user.id
            },
            data
        })

        revalidatePath("/")
        return updatedUser
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}