"use server"
import prisma from "@/db/prisma"
import {revalidatePath} from "next/cache"

export default async function deleteCombo(id) {
    try {
        await prisma.combo.delete({
            where: {
                id
            }
        })
        revalidatePath("/")        
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}