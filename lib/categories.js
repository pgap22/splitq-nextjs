import prisma from "@/db/prisma"

export async function getCategorieByName(name) {
    return (
        await prisma.categories.findFirst({ where: { name } })
    )
} 
