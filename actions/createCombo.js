"use server"

import prisma from "@/db/prisma"
import { authUser } from "@/lib/authUser"

export async function createCombo(data, products) {
    try {
        const existComboName = await prisma.combo.findFirst({
            where: {
                name: data.name
            }
        })

        if (existComboName) return { error: "Ya hiciste un combo con ese nombre" }

        const { id } = await authUser();

        data.id_seller = id;

        const createdCombo = await prisma.combo.create({
            data
        })

        const comboProducts = products.map(product => ({
            id_product: product.id,
            quantity: product.quantity,
            id_combo: createdCombo.id
        }))


        await prisma.comboProducts.createMany({
            data: comboProducts
        })

        return true
    } catch (error) {
        console.log(error)
        return {error: "hubo un error en el servidor"}
    }

}