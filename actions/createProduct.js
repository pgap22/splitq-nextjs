"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { getProductByName } from "@/lib/products";
export async function createProduct(data) {
    if (!data.name) return { error: "Campos vacios" }
    
    const {id} = await authUser();
    const productNameExist = await getProductByName(data.name);
    
    if(productNameExist) return { error: "Ya existe un producto con ese nombre" }
    
    data.seller_id = id;

    await prisma.products.create({
        data
    })
    return true
}