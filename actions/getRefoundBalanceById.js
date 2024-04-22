"use server"

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser"

export async function getRefoundBalaceById(id) {
    try {
        const {id: id_user} = await authUser();

        const refound = await prisma.userRefoundBalance.findFirst({
            where: {
                id,
                id_user
            }
        })

        return refound;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}