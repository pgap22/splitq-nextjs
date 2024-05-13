"use server"

import prismaDev from "@/db/prismaDev"
import { authUser } from "@/lib/authUser"

export async function getUserTicketBySeller(id) {
    try {
        if (!id) return null

        const seller = await authUser();

        console.log(seller.id)

        const usuario = await prismaDev.users.findFirst({
            where: {
                id
            },

            include: {
                cart: {
                    where: {
                        ticket_enabled: true,
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

        return usuario

    } catch (error) {
        console.log(error)
        return error;
    }
}