"use server"

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

export async function cancelRefoundById(id) {
    try {
        const {id: id_user} = await authUser();

        const refound = await prisma.userRefoundBalance.update({
            where: {
                id,
                id_user,
                status: "pending"
            },
            data: {
                status: 'canceled',
                
            }
        })

        await prisma.users.update({
            where: {
                id: id_user
            },
            data: {
                freezebalance: {
                    decrement: refound.refoundBalance
                },
                balance: {
                    increment: refound.refoundBalance
                }
            }
        })
        revalidatePath("/")
        return refound;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}