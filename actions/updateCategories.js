"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"

export const updateCategorie = async (id, data) => {
    try {
        
        const updateCategorie = await prisma.categories.update({
            where: {
                id
            },
            data: {
                ...data
            },
        });

        revalidatePath("/")

        return updateCategorie;
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
      throw error;
    }
  };