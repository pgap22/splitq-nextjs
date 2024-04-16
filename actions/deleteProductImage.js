"use server"
import prisma from "@/db/prisma";
import { destroyApiImageProduct } from "@/lib/destroyApiImageProduct";
import { revalidatePath } from "next/cache";

export default async function deleteProductImage(public_id) {
    try {
        if(!public_id) return;

        const data = await destroyApiImageProduct(public_id);

        if(data.result !== 'ok') return {error: "No se pudo borrar la imagen"}

        await prisma.productImages.deleteMany({
            where: {
                public_id
            }
        })
        revalidatePath("/")
        return true;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}