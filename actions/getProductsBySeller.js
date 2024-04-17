"use server"

import prisma from "@/db/prisma"

export async function getProductsBySellerId(id){
    return await prisma.products.findMany({
        where:{
            seller_id: id
        },
        include: {
            images: true
        }
    })
}