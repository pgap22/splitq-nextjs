'use server'

import prisma from "@/db/prisma"
import { authUser } from "@/lib/authUser"

export default async function getAllMyItemsSeller() {
    const {id} = await authUser()

    const [products,combos] = await Promise.all([
        prisma.products.findMany({
            where: {
                seller_id: id
            },
            include:{
                seller: true
            }
        }),
        prisma.combo.findMany({
            where: {
                id_seller: id
            },
            include:{
                seller: true
            }
        })
    ])

    return {
        products,
        combos,
    }
    
}