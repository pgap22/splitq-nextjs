"use server"
import prisma from "@/db/prisma";
export async function getRefoundBalaceByIdAsMod(id) {
    try {
        const refound = await prisma.userRefoundBalance.findFirst({
            where: {
                id,
            },
            include: {
                user: true
            }
        })

        return refound;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}