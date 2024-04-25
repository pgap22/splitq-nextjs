"use server"

import prisma from "@/db/prisma";
import prismaDev from "@/db/prismaDev";

export async function getProductsQuery(query) {
   const products =  await prismaDev.products.findMany({
        where: query,         
        include: {
            seller: true,
            images: true
        }
    });

    const combos = await prismaDev.combo.findMany({
        where: query,
        include: {
            seller: true,
        }
    })

    const items = [...products, ...combos]

    return items
}