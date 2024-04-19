"use server"

import prismaDev from "@/db/prismaDev"
import { authUser } from "@/lib/authUser"

export async function createRefoundBalance(data) {
    try {
        const { id } = await authUser();
        data.id_user = id;
         
        await Promise.all([prismaDev.userRefoundBalance.create({
            data
        }),
        prismaDev.users.update({
            where: {
                id
            },
            data: {
                freezebalance: {
                    increment: data.refound
                },
                balance: {
                    decrement: data.refound
                }
            }
        })])

        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error con el servidor"}
    }
}