"use server"

import prismaDev from "@/db/prismaDev"
import { revalidatePath } from "next/cache"

export async function refoundModAction(action, id) {
    try {

        if (action == "accepted") {
            const refoundUpdated = await prismaDev.userRefoundBalance.update({
                where: {
                    id
                },
                data: {
                    status: "accepted"
                }
            })

            await prismaDev.users.update({
                where: {
                    id: refoundUpdated.id_user
                },
                data: {
                    freezebalance: {
                        decrement: refoundUpdated.refoundBalance
                    }
                }
            })
        }

        if (action == "denied") {
            const refoundUpdated = await prismaDev.userRefoundBalance.update({
                where: {
                    id
                },
                data: {
                    status: "denied"
                }
            })

            await prismaDev.users.update({
                where: {
                    id: refoundUpdated.id_user
                },
                data: {
                    freezebalance: {
                        decrement: refoundUpdated.refoundBalance
                    },
                    balance: {
                        increment: refoundUpdated.refoundBalance
                    }
                }
            })
        }

        revalidatePath("/")
        return true

    } catch (error) {
        console.log(error)
        return { error: "Hubo un error en el servidor" }
    }
}