"use server"
import prisma from "@/db/prisma"
export default async function deleteProduct(id) {
    try {
        await prisma.combo.delete({
            where: {
                id
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}