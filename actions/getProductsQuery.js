"use server"

import prisma from "@/db/prisma";

export async function getProductsQuery(query) {
    return await prisma.products.findMany({
        where: query,         
        include: {
            seller: true,
            images: true
        }
    });
}