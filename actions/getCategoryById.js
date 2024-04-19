"use server"

import prisma from "@/db/prisma"

export async function getCategorieById({id}){
try {
    const categorie = await prisma.categories.findFirst({
        where:{
            id
        }
})
    return(categorie)
    
} catch (error) {
    console.log(error)
    return {error: "Hubo un error con el servidor. Recarga la pagina"}   
}}