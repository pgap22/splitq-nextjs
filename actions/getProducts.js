"use server"

import prisma from "@/db/prisma";

export async function getProducts() {
    return await prisma.products.findMany({         
        include: {
            seller: true,
            images: true
        }
    });
}