"use server"
import prisma from "@/db/prisma";
import { getProductByName } from "@/lib/products";
export async function createProduct(data) {
    if (!data.name) return { error: "Campos vacios" }
    
    const productNameExist = await getProductByName(data.name);
    
    if(productNameExist) return { error: "Ya existe un producto con ese nombre" }
    
    await prisma.products.create({
        data
    })
    return true
}