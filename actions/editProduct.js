"use server"

import prisma from "@/db/prisma"
import {revalidatePath} from "next/cache"
export default async function editProduct(data,id) {
    try {
        const product = await prisma.products.update({
            where: {
                id
            },
            data
        })
        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}