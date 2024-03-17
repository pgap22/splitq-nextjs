"use server"
import prisma from "@/lib/db";
import { getCategorieByName } from "@/lib/categories";
// import prismaDev from "@/lib/dbDev";
export async function createCategorie(data) {
    if (!data.name) return { error: "Campos vacios" }
    
    const categorieNameExist = await getCategorieByName(data.name);
    
    if(categorieNameExist) return { error: "Ya existe una categoria con ese nombre" }

    
    const category = await prisma.categories.create({
        data
    })

}