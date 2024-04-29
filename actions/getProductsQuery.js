"use server"

import prisma from "@/db/prisma";

export async function getProductsQuery(query) {
   const products =  await prisma.products.findMany({
        where: query,         
        include: {
            seller: true,
            images: true
        }
    });

    const combos = await prisma.combo.findMany({
        where: query,
        include: {
            seller: true,
        }
    })

    const items = [...products, ...combos]

    return items
}