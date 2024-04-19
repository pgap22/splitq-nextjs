"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";

export async function getUserCart() {

    const {id} = await authUser();

    return await prisma.cartUserProducts.findMany({
        where: {
            id_user: id
        },
        include: {
            product: true
        }
    });
}