"use server"

import prismaDev from "@/db/prismaDev"

export async function getHistoryByCartId(id_user) {
    console.log(id_user)
    const tickets = await prismaDev.cartUserProducts.findMany({
        include: {
            product: {
                where: {
                    seller_id: id_user
                }
            },
            combo: {
                where: {
                    id_seller: id_user
                }
            }
        },
        where: {
            ticket_redeem: true,
            OR: [
                {
                    product: {
                        isNot: null
                    },
                },
                {

                    combo: {
                        isNot: null
                    }
                }
            ]
        }
    })

    console.log(tickets)
}