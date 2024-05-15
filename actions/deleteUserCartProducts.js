"use server"
import prismaDev from "@/db/prismaDev"
import { revalidatePath } from "next/cache"
export default async function deleteUserCartProducts(id) {
    try {
        await prismaDev.cartUserProducts.delete({
            where: {
                id
            }
        })
        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}