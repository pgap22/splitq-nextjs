"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache"

export async function createUserCart(data) {

    try {

        const { id } = await authUser();

        const isCartCreated = await prisma.cartUserProducts.findFirst({
            where: {
                AND: [
                    {
                        id_user: id
                    },
                    {
                        id_product: data.id_product
                    }
                ]
            }
        })

        if (isCartCreated) {
            const updateCart = await prisma.cartUserProducts.update({
                where: {
                    id: isCartCreated.id
                },
                data: {
                    quantity: isCartCreated.quantity+data.quantity
                }
            })
            return true
        }

        data.id_user = id;
        const cartCreated = await prisma.cartUserProducts.create({
            data
        })

        revalidatePath("/");
        console.log(cartCreated)
        return true
    } catch (error) {
        console.log(error)
        return { error: "Hubo un error en el servidor" }
    }
}