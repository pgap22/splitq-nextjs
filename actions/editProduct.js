"use server"

import prisma from "@/db/prisma"

export default async function editProduct(data,id) {
    try {
        await prisma.products.update({
            where: {
                id
            },
            data
        })
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}