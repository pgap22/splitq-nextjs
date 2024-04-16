"use server"
import prisma from "@/db/prisma";
import { uploadApiImageProduct } from "@/lib/uploadApiImageProduct"
import {revalidatePath} from "next/cache"
export async function uploadimg(formData, id_product){
    try {
        const data_img = await uploadApiImageProduct(formData.get("file"));

        if(id_product){
            await prisma.productImages.create({
                data:{
                    id_product: id_product,
                    public_id: data_img.public_id,
                    url: data_img.url
                }
            })
        }
        revalidatePath("/")
        return data_img;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error con el servidor"}
    }
}