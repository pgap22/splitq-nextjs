"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"


export async function deleteCategorie(id, categorieID) {
    try {
        
        if (categorieID) {
            
            await prisma.products.updateMany({
                where: {
                    categorieID: id
                }, data: {
                    categorieID: categorieID
                }
            })
        }

        const deleteCategorie = await prisma.categories.delete({
            where:{
                id
            }
        })
        
        revalidatePath("/")


        return true

    } catch (error) {
        console.error("Error al eliminar la categoria:", error);
        throw error;
    }
}