"use server"

import prisma from "@/db/prisma";

export async function getItemById(id) {
    try {
        const product = await prisma.products.findFirst({
            where: {
                id
            },
            include: {
                seller: true,
                images: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        if (product) return product

        const combo = await prisma.combo.findFirst({
            where: {
                id
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                seller: true
            }
        })

        return combo

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error "}
    }
}