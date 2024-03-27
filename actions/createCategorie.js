"use server"
import prisma from "@/db/prisma";
import { getCategorieByName } from "@/lib/categories";
export async function createCategorie(data) {
    if (!data.name) return { error: "Campos vacios" }
    
    const categorieNameExist = await getCategorieByName(data.name);
    
    if(categorieNameExist) return { error: "Ya existe una categoria con ese nombre" }
    
    await prisma.categories.create({
        data
    })
    return true
}