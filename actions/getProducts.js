"use server"

import prisma from "@/db/prisma"
import { authUser } from "@/lib/authUser";

export async function getProducts() {
    const { id } = await authUser();
    return await prisma.products.findMany({
        where: {
            seller_id: id
        }
    });
}