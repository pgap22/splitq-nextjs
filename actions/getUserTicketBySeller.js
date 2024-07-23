"use server"

import prisma from "@/db/prisma"
import { authUser } from "@/lib/authUser"
import { revalidatePath } from "next/cache";

export async function getUserTicketBySeller(id) {
    try {
        if (!id) return null

        const seller = await authUser();

        console.log(seller.id)

        const usuario = await prisma.users.findFirst({
            where: {
                id
            },

            include: {
                cart: {
                    where: {
                        ticket_enabled: true,
                        ticket_redeem: false,
                    },
                    include: {
                        product: {
                            where: { seller_id: seller.id }
                        },
                        combo: {
                            where: { id_seller: seller.id }
                        },
                    }
                }
            }
        })


        if (!usuario) return null

        usuario.cart = usuario.cart.map(cartItem => {
            if (cartItem.combo) {
                cartItem.product = { ...cartItem.combo }
                return cartItem
            }
            return cartItem
        }).filter(cartItem => cartItem.product)

        revalidatePath("/")

        return usuario

    } catch (error) {
        console.log(error)
        return error;
    }
}