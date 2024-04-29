"use server"

import prisma from "@/db/prisma"
import { redirect } from "next/navigation"

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
 
    if(!seller) return redirect("/home")

   const data =  {
        products: seller.createdProducts,
        combos: seller.createdCombo
    }
    
    return data
}