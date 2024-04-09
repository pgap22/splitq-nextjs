"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"


export async function deleteProfile(id) {
    try {
        
        const deleteProfile = await prisma.users.delete({
            where:{
                id
            }
        })

        revalidatePath("/")

        return true

    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
    }
}