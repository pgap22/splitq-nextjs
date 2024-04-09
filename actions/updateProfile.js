"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"

export const updateProfile = async (id, data) => {
    try {
        
        if (data?.email) {

            const sameEmailUser = await prisma.users.findFirst({
                where: {
                    email: data.email,
                    NOT:{
                        id
                    }
                }
            })

            if(sameEmailUser) return {error: "Usuario con el mismo email"}

        }
        
        const updateProfile = await prisma.users.update({
            where: {
                id
            },
            data: {
                ...data
            },
        });

        revalidatePath("/")

        return updateProfile;
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      throw error;
    }
  };