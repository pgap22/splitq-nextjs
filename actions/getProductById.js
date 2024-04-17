"use server"

import prisma from "@/db/prisma";

export async function getProductById(id) {
    return await prisma.products.findFirst({
        where: {
            id
        },
        include: {
            seller: true,
            images: true
        }
    });
}