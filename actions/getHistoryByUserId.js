"use server"

import prismaDev from "@/db/prismaDev"

export async function getHistoryByUserId(id_user){
    const [refounds, recharges, cart] = await Promise.all([
        prismaDev.userRefoundBalance.findMany({
            where: {
                id_user
            },
            orderBy: {
                
            }
        }),
        prismaDev.recharges.findMany({
            where: {
                userID: id_user
            }
        }),
        prismaDev.cartUserProducts.findMany({
            where: {
                id_user
            }
        })
    ])

    console.log({
        refounds,
        recharges,
        cart
    })
    
}