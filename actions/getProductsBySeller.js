"use server"

import prisma from "@/db/prisma"

export async function getProductsBySellerId(id){
    const seller = await prisma.users.findFirst({
        where: {
            id
        },
        include: {
            createdCombo: {
                include: {
                    products: {
                        include: {
                            product: {
                                include: {
                                    images: true
                                }
                            }
                        }
                    }
                }
            },
            createdProducts: {
                include: {
                    images: true
                }
            }
        }
    })

   const data =  {
        products: seller.createdProducts,
        combos: seller.createdCombo
    }
    
    return data
}