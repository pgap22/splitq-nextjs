"use server"

import prismaDev from "@/db/prismaDev"

export async function getCombos() {
    return await prismaDev.combo.findMany({
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    })
}