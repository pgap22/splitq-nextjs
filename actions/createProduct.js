"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { getProductByName } from "@/lib/products";
import { revalidatePath } from "next/cache"
// import { uploadApiImageProduct } from "@/lib/uploadApiImageProduct";
export async function createProduct(data, formData) {
    try {
        const { id } = await authUser();
        const productNameExist = await getProductByName(data.name);
        if (productNameExist) return { error: "Ya existe un producto con ese nombre" }

        //Images first
        // let promises = []

        // formData.forEach(async img => {
        //     if (!img.type.startsWith("image")) return;
        //     promises.push(uploadApiImageProduct(img))
        // })

        // const images = await Promise.all(promises);
        
               

        data.seller_id = id;
        
        const productCreated = await prisma.products.create({
            data
        })

        // images.forEach(async(data)=>{
        //     const productImage = await prisma.productImages.create({
        //         data: {
        //             id_product: productCreated.id,
        //             url: data.url,
        //             public_id: data.public_id
        //         }
        //     })
        //     console.log(productImage);
        // })


        revalidatePath("/");
        return true
    } catch (error) {
        console.log(error)
        return { error: "Hubo un error en el servidor" }
    }
}