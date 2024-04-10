"use server"

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";

export async function getProductById(id) {
    const { id: seller_id } = await authUser();
    return await prisma.products.findMany({
        where: {
            id,
            seller_id
        },
        include: {
            seller: true
        }
    });
}