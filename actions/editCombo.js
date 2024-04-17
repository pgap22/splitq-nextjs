"use server"

import prisma from "@/db/prisma"
import prismaDev from "@/db/prismaDev"
import {revalidatePath} from "next/cache"

export async function editCombo(data, products,id) {
    try {

        const updatedCombo = await prismaDev.combo.update({
            where:{
                id
            },
            data
        })
        

        await prismaDev.comboProducts.deleteMany({
            where: {
                id_combo: id
            }
        })

        const comboProducts = products.map(product => ({
            id_product: product.id,
            quantity: product.quantity,
            id_combo: updatedCombo.id
        }))


        const combosProducts = await prisma.comboProducts.createMany({
            data: comboProducts
        })

        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return {error: "hubo un error en el servidor"}
    }

}